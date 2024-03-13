import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import styles from "./auth.module.scss";
import CustomInput from "../customInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInUser } from "../../redux/users/asyncActions";
import { Paths } from "../../paths";
import { TSignIn } from "../../redux/users/types";
import { useSelector } from "react-redux";
import { getAuthStatus } from "../../redux/users/selectors";

import { AuthError } from "@supabase/supabase-js";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<AuthError | string | number | null>(null);
  const authStatus = useSelector(getAuthStatus);
  const {
    register,
    handleSubmit,
    watch, // для отслеживания введенных данных
    reset,
    formState: { errors, isValid },
    getValues, //не обязательно
    getFieldState, //не обязательноб
    setValue,
  } = useForm<TSignIn>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<TSignIn> = async (dataForm) => {
    if (isValid) {
      try {
        await dispatch(signInUser(dataForm));
        navigate(Paths.home);
      } catch (error) {
        const maybeError = isErrorWithMessage(error);
        if (maybeError) {
          setError(error.data.message);
        } else {
          setError(
            "Неизвестная ошибка, возможно учетная запись не подтверждена. Зайдите в свой почтовый ящик, который Вы указали при регистрации.."
          );
        }
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
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
