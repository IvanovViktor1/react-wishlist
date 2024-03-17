import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../auth.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { TNewUser, userApi } from "../../../services/UserService";
import { Paths } from "../../../paths";
import Loader from "../../loader";
import CustomInput from "../../customInput";
import { supabase } from "../../..";

interface IFragmentTwo {
  previous: () => void;
}

type IShippingFields = {
  phone: number;
  name: string;
};

const FragmentTwo: FC<IFragmentTwo> = ({ previous }) => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");

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

  const [addNewUserData, { data, isError, isLoading, error }] =
    userApi.useAddNewUsersMutation();

  const handleError = (error: FetchBaseQueryError | SerializedError) => {
    setRegisterError(JSON.stringify(error));
  };

  const onSubmit: SubmitHandler<IShippingFields> = (dataForm) => {
    if (isValid) {
      const addNewUserWithSessionInfo = async () => {
        const { data } = await supabase.auth.getSession();

        if (data.session) {
          try {
            addNewUserData({
              name: dataForm.name,
              phone: dataForm.phone,
              user_uuid: data.session.user.id,
            });
            navigate(Paths.home);
          } catch (error) {
            console.log(error);
          }
        }
      };
      addNewUserWithSessionInfo();
    }
  };

  const skipStep = () => {
    navigate(Paths.home);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.registerCard}>
        <div className={styles.header}>
          <p>о себе..</p>
        </div>
        {isLoading ? <Loader /> : null}

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

          <p className={styles.warning} onClick={skipStep}>
            пропустить шаг
          </p>

          <div className={styles.btnSaveBlock}>
            <input
              type="submit"
              className={styles.btnSave}
              value={"Отправить данные"}
            />
          </div>
          {registerError ? (
            <p className={styles.error}>{registerError}</p>
          ) : null}
          <p
            className={styles.warning}
            onClick={() => {
              previous();
            }}
          >
            назад
          </p>
        </form>
      </div>
    </div>
  );
};

export default FragmentTwo;
