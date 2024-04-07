import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../auth.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { sessionApi } from "../../../services/SessionService";
import { Paths } from "../../../paths";
import Loader from "../../loader";
import CustomInput from "../../customInput";
import { supabase } from "../../..";
import { authApi } from "../../../services/authApi";

type IShippingFields = {
  phone: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const CustomRegister: FC = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState<string>("");

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

  const [customRegister, { data, isLoading, isSuccess }] =
    authApi.useLoginMutation();

  const { data: phoneNumbers } = sessionApi.useGetUserPhonNumbersQuery();

  const onSubmit: SubmitHandler<IShippingFields> = (dataForm) => {
    if (isValid) {
      try {
        customRegister(dataForm);
        reset();
        navigate(Paths.home);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const vals = getValues();

  useEffect(() => {
    console.log(phoneNumbers);
    console.log(vals.phone);
    console.log(
      phoneNumbers?.map((n) => n.toString).includes(vals.phone.toString, 0)
    );
  }, [vals.phone]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.registerCard}>
        <div className={styles.header}>
          Регистрация <p>шаг - 1</p>
        </div>
        {/* {isLoading ? <Loader /> : null} */}

        <form className={styles.block} onSubmit={handleSubmit(onSubmit)}>
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
              validate: (value) =>
                !phoneNumbers?.includes(value) || "Номер уже зарегистрирован",
            })}
          />

          {errors ? (
            <p className={styles.error}>{errors.phone?.message}</p>
          ) : null}
          <div className={styles.btnSaveBlock}>
            <input
              type="submit"
              className={styles.btnSave}
              value={"Зарегистрироваться"}
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

export default CustomRegister;
