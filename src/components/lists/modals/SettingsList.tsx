import React, { FC, useState, forwardRef } from "react";
import styles from "./modalStyles.module.scss";
import CustomInput from "../../customInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { TList, wishlistApi } from "../../../services/ListService";
import CustomLoader from "../../loader/CustomLoader";
import CustomModal from "../../modal";

type ISettingsListProps = {
  open: boolean;
  data: TList;
  handleClose: () => void;
};

export const SettingsList = forwardRef<HTMLDivElement, ISettingsListProps>(
  ({ data, handleClose, open }, ref) => {
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

    const [editList, { isError, error: addListError, isLoading }] =
      wishlistApi.useEditListMutation();

    const onSubmit: SubmitHandler<TList> = async (dataForm) => {
      if (isValid) {
        try {
          await editList(dataForm);

          if (!isError && !isLoading) {
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
      // <div
      //   className={styles.settingsContainer}
      //   ref={ref}
      //   style={{ visibility: "hidden" }}
      // >
      <CustomModal isOpen={open} title={data.name} onClose={handleClose}>
        <form
          className={styles.settingsBlock}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.inputRows}>
            {isLoading ? <CustomLoader text="изменение..." /> : null}
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
      </CustomModal>
      // </div>
    );
  }
);
