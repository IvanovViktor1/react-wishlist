import React, { FC, useState, forwardRef } from "react";
// import styles from "./settingsList.module.scss";
import styles from "../popup.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { TWish, wishApi } from "../../../services/WishService";
import Loader from "../../loader";
import CustomInput from "../../customInput";

type ISettingsListProps = {
  wish: TWish;
  handleClose: () => void;
};

export const EditWishForm = forwardRef<HTMLDivElement, ISettingsListProps>(
  ({ handleClose, wish }, ref) => {
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
      values: wish,
    });
    const subscribe = watch();
    const [loading, setLoading] = useState(false);
    const _ = require("lodash");
    const { refetch: refetchList } = wishApi.useGetWishsByListIdQuery(
      wish.id_list
    );
    const [editWish, { isLoading: loadingEdit }] =
      wishApi.useEditWishMutation();

    const onSubmit: SubmitHandler<TWish> = async (dataForm) => {
      try {
        if (!_.isEqual(subscribe, wish)) {
          await editWish({
            description: dataForm.description,
            hidden: dataForm.hidden,
            id: dataForm.id,
            id_list: dataForm.id_list,
            link: dataForm.link,
            price: dataForm.price,
            title: dataForm.title,
            image_url: dataForm.image_url,
          }).then(() => {
            refetchList();
            handleClose();
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div
        className={styles.settingsContainer}
        ref={ref}
        style={{ visibility: "hidden" }}
      >
        {loading || loadingEdit ? <Loader /> : null}
        <form
          className={styles.settingsBlock}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.inputRows}>
            <p>Желание</p>
            <CustomInput
              type="text"
              placeholder="Желание"
              className={styles.input}
              {...register("title", { required: "Поле не может быть пустым" })}
            />
            {errors ? (
              <p className={styles.error}>{errors.title?.message}</p>
            ) : null}
            <p>Описание</p>
            <CustomInput
              type="text"
              placeholder="Описание"
              className={styles.input}
              {...register("description")}
            />
            <p>Cсылка на товар</p>
            <CustomInput
              type="text"
              placeholder="Cсылка на товар"
              className={styles.input}
              {...register("link")}
            />
            <p>Примерная стоимость в рублях</p>
            <CustomInput
              type="number"
              placeholder="Примерная стоимость"
              className={styles.input}
              {...register("price")}
            />
            <p>Ссылка на изображение</p>
            <CustomInput
              className={styles.input}
              type="text"
              {...register("image_url")}
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
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </div>
    );
  }
);
