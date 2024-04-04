import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import CustomInput from "../customInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { Paths } from "../../paths";
import { AuthError } from "@supabase/supabase-js";
import { useAppDispatch } from "../../hooks/redux";
import { newSessionInfo } from "../../store/reducers/userSlice";
import { sessionApi } from "../../services/SessionService";
import Loader from "../loader";

interface Ilogin {
  email: string;
  password: string;
}

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<AuthError | string | number | null>(null);
  const {
    register,
    handleSubmit,
    watch, // для отслеживания введенных данных
    reset,
    formState: { errors, isValid },
    getValues, //не обязательно
    getFieldState, //не обязательноб
    setValue,
  } = useForm<Ilogin>({
    mode: "onChange",
  });

  const { data: emails } = sessionApi.useGetUserEmailsQuery();

  const [signIn, { isLoading }] = sessionApi.useSignInMutation();
  const onSubmit: SubmitHandler<Ilogin> = async (dataForm) => {
    if (isValid) {
      try {
        signIn(dataForm);
        navigate(Paths.home);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      {isLoading ? <Loader /> : null}
      <div className={styles.registerCard}>
        <div className={styles.header}>Войдите в систему</div>
        <form className={styles.block} onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            className={styles.customInput}
            type="email"
            placeholder="email"
            {...register("email", {
              required: "Поле Email обязательно!",
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: "Пожалуйста введите корректный Email",
              },
              validate: (value) =>
                emails?.includes(value) ||
                "Пользователь с таким email не зарегистрирован",
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
            })}
          />
          {errors ? (
            <p className={styles.error}>{errors.password?.message}</p>
          ) : null}

          <div className={styles.btnSaveBlock}>
            <input type="submit" className={styles.btnSave} value={"Войти"} />
          </div>
          <p
            className={styles.warning}
            onClick={() => {
              navigate(Paths.register);
            }}
          >
            нет учетной записи
          </p>
          {error ? <p className={styles.error}>{String(error)}</p> : null}
        </form>
      </div>
    </div>
  );
};

export default Login;
