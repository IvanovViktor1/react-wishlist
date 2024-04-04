import React, { FC, useState, forwardRef } from "react";
// import styles from "./settingsList.module.scss";
import styles from "./popup.module.scss";
import CustomInput from "../customInput";
import CustomButton from "../customButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Loader from "../loader";
import { TList, wishlistApi } from "../../services/ListService";

type ISettingsListProps = {
  data: TList;
  handleClose: () => void;
};

export const SettingsList = forwardRef<HTMLDivElement, ISettingsListProps>(
  ({ data, handleClose }, ref) => {
    const {
      register,
      handleSubmit,
      watch, // для отслеживания введенных данных
      reset,
      formState: { errors, isValid },
      getValues, //не обязательно
      getFieldState, //не обязательноб
      setValue,
    } = useForm<TList>({
      mode: "onChange",
      values: data,
    });

    const [loading, setLoading] = useState(false);

    const [editList, { isError, error: addListError, isSuccess, isLoading }] =
      wishlistApi.useEditListMutation();

    const onSubmit: SubmitHandler<TList> = async (dataForm) => {
      if (isValid) {
        try {
          await editList(dataForm);

          while (isLoading) {
            setLoading(true);
          }
          if (!isError && !isLoading) {
            console.log("Success");
            handleClose();
          }
        } catch (err) {
          console.log(err);
          if (isError) {
            console.log(addListError);
          }
        }
      }
    };

    return (
      <div
        className={styles.settingsContainer}
        ref={ref}
        style={{ visibility: "hidden" }}
      >
        {loading ? <Loader /> : null}
        <form
          className={styles.settingsBlock}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.inputRows}>
            <CustomInput
              type="text"
              placeholder="Наименование"
              className={styles.input}
              {...register("name", { required: "Поле Имя обязательно!" })}
            />
            {errors ? (
              <p className={styles.error}>{errors.name?.message}</p>
            ) : null}

            <CustomInput
              type="text"
              placeholder="Опинсание"
              className={styles.input}
              {...register("description")}
            />

            <CustomInput
              className={styles.input}
              type="checkbox"
              {...register("hidden")}
            />
          </div>
          <div className={styles.btnRow}>
            <input
              type="button"
              className={styles.btnCancel}
              value={"Отмена"}
              onClick={handleClose}
            />
            <input
              type="submit"
              className={styles.btnSave}
              value={"Сохранить"}
            />
          </div>
        </form>
      </div>
    );
  }
);
