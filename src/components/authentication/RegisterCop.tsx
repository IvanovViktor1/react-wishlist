import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import CustomInput from "../customInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { Paths } from "../../paths";
import { sessionApi } from "../../services/SessionService";
import { TNewUser, userApi } from "../../services/UserService";
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import Loader from "../loader";

type IShippingFields = {
  email: string;
  phone: number;
  name: string;
  password: string;
  confirmPassword: string;
};

const RegisterCop: FC = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch, // для отслеживания введенных данных
    reset,
    formState: { errors, isValid },
    getValues, //не обязательно
    getFieldState, //не обязательноб
    setValue,
  } = useForm<IShippingFields>({
    mode: "onChange",
  });

  const watchPassword = watch("password");

  const [registerUserFromAuth, queryFromAuth] =
    sessionApi.useRegisterUserFomAuthMutation();

  const [addNewUserData, queryFromDB] = userApi.useAddNewUsersMutation();

  const handleError = (error: FetchBaseQueryError | SerializedError) => {
    setRegisterError(JSON.stringify(error));
  };

  const onSubmit: SubmitHandler<IShippingFields> = (dataForm) => {
    if (isValid) {
      try {
        registerUserFromAuth(dataForm);

        if (queryFromAuth.status === QueryStatus.pending) {
          setLoading(true);
        }

        if (queryFromAuth.status === QueryStatus.fulfilled) {
          setLoading(false);
          console.log("Проверка пройдена");
          console.log(queryFromAuth.data.user?.id);
          const newUser = {
            name: dataForm.name,
            phone: dataForm.phone,
            user_uuid: queryFromAuth.data.user?.id,
          };
          addNewUserData(newUser as TNewUser);
          console.log("После добавления в БД на клиенте");

          if (queryFromDB.status === QueryStatus.pending) {
            setLoading(true);
          }

          if (queryFromDB.status === QueryStatus.fulfilled) {
            setLoading(false);
            console.log("success");
            reset();
            navigate(Paths.home);
          }
          if (queryFromDB.status === QueryStatus.rejected) {
            setLoading(false);
            console.log("error2");
            console.log(queryFromDB.error);
            return handleError(queryFromDB.error);
          }
        }
        if (queryFromAuth.status === QueryStatus.rejected) {
          setLoading(false);
          console.log("error1");
          console.log(queryFromAuth.error);
          return handleError(queryFromAuth.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.registerCard}>
        <div className={styles.header}>Регистрация</div>
        {loading ? <Loader /> : null}
        {/* <Loader /> */}
        <form className={styles.block} onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            className={styles.customInput}
            placeholder="имя"
            {...register("name", { required: "Поле Имя обязательно!" })}
          />

          {errors ? (
            <p className={styles.error}>{errors.name?.message}</p>
          ) : null}

          <CustomInput
            className={styles.customInput}
            type="tel"
            placeholder="телефон"
            {...register("phone", {
              required: "Поле Телефон обязательно!",
              pattern: {
                value: /\b\w{11}\b/g,
                message: "Пожалуйста введите корректный номер телефона!",
              },
            })}
          />
          {errors ? (
            <p className={styles.error}>{errors.phone?.message}</p>
          ) : null}

          <CustomInput
            className={styles.customInput}
            placeholder="email"
            {...register("email", {
              required: "Поле Email обязательно!",
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: "Пожалуйста введите корректный Email",
              },
            })}
          />
          {errors ? (
            <p className={styles.error}>{errors.email?.message}</p>
          ) : null}

          <CustomInput
            className={styles.customInput}
            type="password"
            placeholder="пароль"
            {...register("password", {
              required: "Поле Пароль обязательно!",
              pattern: {
                value: /\b\w{6,}\b/g,
                message: "Пароль должен быть не менее 6 символов",
              },
            })}
          />
          {errors ? (
            <p className={styles.error}>{errors.password?.message}</p>
          ) : null}

          <CustomInput
            className={styles.customInput}
            type="password"
            placeholder="повторите пароль"
            {...register("confirmPassword", {
              required: "Повторите пароль!",
              validate: (value) =>
                value === watchPassword || "Пароли должны совпадать",
            })}
          />
          {errors ? (
            <p className={styles.error}>{errors.confirmPassword?.message}</p>
          ) : null}

          <div className={styles.btnSaveBlock}>
            <input
              type="submit"
              className={styles.btnSave}
              value={"Сохранить"}
            />
          </div>
          {registerError ? (
            <p className={styles.error}>{registerError}</p>
          ) : null}
          <p
            className={styles.warning}
            onClick={() => {
              navigate(Paths.login);
            }}
          >
            есть учетная запись
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterCop;
