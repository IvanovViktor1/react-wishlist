import React, { FC, useState, forwardRef } from "react";
import styles from "./settingsList.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { TWish, wishApi } from "../../../../services/WishService";
import Loader from "../../../loader";
import CustomInput from "../../../customInput";
import CustomCheckbox from "../../../customCheckbox";

type ISettingsListProps = {
  idList: number;
  handleClose: () => void;
};

export const AddingWishForm = forwardRef<HTMLDivElement, ISettingsListProps>(
  ({ handleClose, idList }, ref) => {
    const {
      register,
      handleSubmit,
      watch, // для отслеживания введенных данных
      reset,
      formState: { errors, isValid },
      getValues, //не обязательно
      getFieldState, //не обязательноб
      setValue,
    } = useForm<TWish>({
      mode: "onChange",
    });

    const [loading, setLoading] = useState(false);

    const [addWish] = wishApi.useAddNewWishMutation();

    const onSubmit: SubmitHandler<TWish> = async (dataForm) => {
      if (isValid) {
        try {
          addWish({
            description: dataForm.description,
            hidden: false,
            id_list: idList,
            link: dataForm.link,
            price: dataForm.price,
            title: dataForm.title,
          }).then(() => {
            handleClose();
          });
        } catch (error) {
          console.log(error);
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
              placeholder="Желание"
              className={styles.input}
              {...register("title", { required: "Поле не может быть пустым" })}
            />
            {errors ? (
              <p className={styles.error}>{errors.title?.message}</p>
            ) : null}

            <CustomInput
              type="text"
              placeholder="Опинсание"
              className={styles.input}
              {...register("description")}
            />
            <CustomInput
              type="text"
              placeholder="Cсылка на товар"
              className={styles.input}
              {...register("link")}
            />
            <CustomInput
              type="number"
              placeholder="Примерная стоимость"
              className={styles.input}
              {...register("price")}
            />

            <CustomInput
              className={styles.input}
              type="checkbox"
              {...register("hidden")}
            />
            <CustomCheckbox type="checkbox" />
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
