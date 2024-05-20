import React, { FC, useState, forwardRef } from "react";
import styles from "./modalEditWish.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { TWish, wishApi } from "../../../../services/WishService";
import { useAppSelector } from "../../../../hooks/redux";
import CustomModal from "../../../../components/modal";
import CustomLoader from "../../../../components/loader/CustomLoader";
import CustomInput from "../../../../components/customInput";
import SelectCategory from "../../../../components/customInputPopup";
import SelectList from "../../../../components/selectList";
import { TList } from "../../../../services/ListService";
import CustomInputImg from "../../../../components/customInputImage";
import ImageInput from "../../../../components/customInputImage";

type ISettingsListProps = {
  wish: TWish;
  lists: TList[];
  handleClose: () => void;
  open: boolean;
};

export const ModalEditWish = forwardRef<HTMLDivElement, ISettingsListProps>(
  ({ handleClose, wish, lists, open }, ref) => {
    const {
      register,
      handleSubmit,
      watch, // для отслеживания введенных данных
      reset,
      setValue,
      formState: { errors, isValid },
    } = useForm<TWish>({
      mode: "onChange",
      values: wish,
      defaultValues: {
        image_url: "",
      },
    });
    const subscribe = watch();
    const imageUrl = watch("image_url") || "";
    const _ = require("lodash");

    const [editWish, { isLoading: loadingEdit }] =
      wishApi.useEditWishMutation();

    const onSubmit: SubmitHandler<TWish> = async (dataForm) => {
      // console.log({
      //   description: dataForm.description,
      //   hidden: dataForm.hidden,
      //   id: dataForm.id,
      //   id_list: dataForm.id_list,
      //   link: dataForm.link,
      //   price: dataForm.price,
      //   title: dataForm.title,
      //   image_url: dataForm.image_url,
      //   category_id: dataForm.category_id,
      //   date_of_creation: dataForm.date_of_creation,
      // });
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
            reset();
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
            <p>Желание: </p>
            <CustomInput
              type="text"
              placeholder="Желание"
              className={styles.input}
              {...register("title", { required: "Поле не может быть пустым" })}
            />
            {errors ? (
              <p className={styles.error}>{errors.title?.message}</p>
            ) : null}
            <p>Описание: </p>
            <CustomInput
              type="text"
              placeholder="Описание"
              className={styles.input}
              {...register("description")}
            />
            {errors ? (
              <p className={styles.error}>{errors.category_id?.message}</p>
            ) : null}
            <p>Категория: </p>
            <SelectCategory
              type="text"
              placeholder="Категория"
              className={styles.input}
              {...register("category_id")}
            />
            <p>Лист</p>
            <SelectList
              lists={lists}
              type="text"
              placeholder="Лист"
              className={styles.input}
              {...register("id_list")}
            />
            <p>Cсылка на товар: </p>
            <CustomInput
              type="text"
              placeholder="Cсылка на товар"
              className={styles.input}
              {...register("link")}
            />
            <p>Примерная стоимость в рублях :</p>
            <CustomInput
              type="number"
              placeholder="Примерная стоимость"
              className={styles.input}
              {...register("price")}
            />
            <p>Ссылка на изображение: </p>
            <ImageInput
              value={imageUrl}
              onChange={(e) => setValue("image_url", e.target.value)}
              register={register}
              name="image_url"
              className={styles.input}
              placeholder="Enter image URL"
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
