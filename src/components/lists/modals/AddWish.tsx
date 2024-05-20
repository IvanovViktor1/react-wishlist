import React, { FC, useState, forwardRef, useEffect } from "react";
// import styles from "./settingsList.module.scss";
import styles from "./modalStyles.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { TWish, wishApi } from "../../../services/WishService";
import CustomInput from "../../customInput";
import CustomLoader from "../../loader/CustomLoader";
import SelectCategory from "../../customInputPopup";
import CustomModal from "../../modal";

type ISettingsListProps = {
  idList: number;
  open: boolean;
  handleClose: () => void;
};

export const AddingWishForm = forwardRef<HTMLDivElement, ISettingsListProps>(
  ({ handleClose, idList, open }, ref) => {
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
            image_url: dataForm.image_url,
            category_id: dataForm.category_id,
          }).then(() => {
            handleClose();
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
      <CustomModal isOpen={open} title="Новое желание" onClose={handleClose}>
        {loading ? <CustomLoader /> : null}
        <form
          className={styles.settingsBlock}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.inputRows}>
            {/* <p>Желание</p> */}
            <CustomInput
              type="text"
              placeholder="Желание"
              className={styles.input}
              {...register("title", {
                required: "Поле не может быть пустым",
              })}
            />
            {errors ? (
              <p className={styles.error}>{errors.title?.message}</p>
            ) : null}
            {/* <p>Описание</p> */}
            <CustomInput
              type="text"
              placeholder="Описание"
              className={styles.input}
              {...register("description")}
            />
            {errors ? (
              <p className={styles.error}>{errors.category_id?.message}</p>
            ) : null}
            {/* <p>Категория</p> */}
            <SelectCategory
              type="text"
              placeholder="Категория"
              className={styles.input}
              {...register("category_id")}
            />
            {/* <p>Cсылка на товар</p> */}
            <CustomInput
              type="text"
              placeholder="Cсылка на товар"
              className={styles.input}
              {...register("link")}
            />
            {/* <p>Примерная стоимость в рублях</p>{" "} */}
            <CustomInput
              type="number"
              placeholder="Примерная стоимость"
              className={styles.input}
              {...register("price")}
            />
            {/* <p>Ссылка на изображение</p>{" "} */}
            <CustomInput
              className={styles.input}
              placeholder="ссылка на товар"
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
            />
          </div>
        </form>
      </CustomModal>
    );
  }
);
