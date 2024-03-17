import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../auth.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";

import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { sessionApi } from "../../../services/SessionService";
import { TNewUser, userApi } from "../../../services/UserService";
import { Paths } from "../../../paths";
import Loader from "../../loader";
import CustomInput from "../../customInput";
import { supabase } from "../../..";
import { User } from "@supabase/supabase-js";

interface IFragmentOne {
  next: () => void;
}

type IShippingFields = {
  email: string;
  password: string;
  confirmPassword: string;
};

const FragmentOne: FC<IFragmentOne> = ({ next }) => {
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

  const [registerUserFromAuth, { data, isError, isLoading, error }] =
    sessionApi.useRegisterUserFomAuthMutation();

  const handleError = (
    error: FetchBaseQueryError | SerializedError | undefined
  ) => {
    setRegisterError(JSON.stringify(error));
  };

  const signInUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
    }
    return data;
  };

  const onSubmit: SubmitHandler<IShippingFields> = (dataForm) => {
    if (isValid) {
      try {
        registerUserFromAuth(dataForm);

        // if (data) {
        signInUser(dataForm.email, dataForm.confirmPassword);
        next();
        // }
        // reset();
        // next();
      } catch (err) {
        handleError(error);
        console.error(err);
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.registerCard}>
        <div className={styles.header}>
          Регистрация <p>шаг - 1</p>
        </div>
        {isLoading ? <Loader /> : null}

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

          <div className={styles.btnSaveBlock}>
            <input type="submit" className={styles.btnSave} value={"Далее"} />
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

export default FragmentOne;
