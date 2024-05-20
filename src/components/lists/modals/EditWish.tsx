import React, { FC, useState, forwardRef } from "react";
// import styles from "./settingsList.module.scss";
import styles from "./modalStyles.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { TWish, wishApi } from "../../../services/WishService";
import CustomInput from "../../customInput";
import CustomLoader from "../../loader/CustomLoader";
import { useAppSelector } from "../../../hooks/redux";
import SelectCategory from "../../customInputPopup";
import CustomModal from "../../modal";

type ISettingsListProps = {
  wish: TWish;
  handleClose: () => void;
  open: boolean;
};

export const EditWishForm = forwardRef<HTMLDivElement, ISettingsListProps>(
  ({ handleClose, wish, open }, ref) => {
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
    const _ = require("lodash");
    const sortWishs = useAppSelector(
      (state) => state.sortAndFilterReducer
    ).sortWishs;
    const { refetch: refetchList } = wishApi.useGetWishsByListIdQuery({
      id: wish.id_list,
      sortByDate: sortWishs.sortByDate,
      sortByHidden: sortWishs.sortByHidden,
      sortValue: sortWishs.ascending,
      categories: sortWishs.categories.map((c) => c.id),
    });
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
            category_id: dataForm.category_id,
            date_of_creation: dataForm.date_of_creation,
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
      <CustomModal isOpen={open} title="Новые изменения" onClose={handleClose}>
        <form
          className={styles.settingsBlock}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.inputRows}>
            {loadingEdit ? <CustomLoader text="изменение..." /> : null}
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
            {errors ? (
              <p className={styles.error}>{errors.category_id?.message}</p>
            ) : null}
            <p>Категория</p>
            <SelectCategory
              type="text"
              placeholder="Категория"
              className={styles.input}
              {...register("category_id")}
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
      </CustomModal>
    );
  }
);
