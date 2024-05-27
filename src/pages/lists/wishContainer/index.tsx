import React, { FC, memo, useEffect } from "react";
import { TWish, wishApi } from "../../../services/WishService";
import styles from "./wishContainer.module.scss";
import { allCategories } from "../../../utils/allCategories";
import { formatDate } from "../../../utils/formatDate";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../../../components/customInput";
import ImageInput from "../../../components/customInputImage";
import SelectList from "../../../components/selectList";
import { TList } from "../../../services/ListService";
import { useAppSelector } from "../../../hooks/redux";
import { useRefetchWishs } from "../../../utils/refetchs";
import { CloseOutlined } from "@ant-design/icons";
interface IWishContainer {
  wish: TWish;
  lists: TList[];
  isEditable: boolean;
  onSave: () => void;
  onClose: () => void;
}

const WishContainer: FC<IWishContainer> = memo(
  ({ wish, isEditable, lists, onSave, onClose }) => {
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

    const handleClose = () => {
      reset();
      onClose();
    };

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

            // handleClose();
            onSave();
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <form className={styles.cardWishInfo} onSubmit={handleSubmit(onSubmit)}>
        <CloseOutlined className={styles.btnClose} onClick={handleClose} />
        <div className={styles.textColumn}>
          <p>
            <span>Наименование:</span>{" "}
            {isEditable ? (
              <CustomInput
                type="text"
                placeholder="Желание"
                className={styles.input}
                {...register("title", {
                  required: "Поле не может быть пустым",
                })}
              />
            ) : (
              <div>{wish.title}</div>
            )}
          </p>
          <p>
            <span>Описание:</span>
            {isEditable ? (
              <CustomInput
                type="text"
                placeholder="Описание"
                className={styles.input}
                {...register("description")}
              />
            ) : (
              <div> {wish.description}</div>
            )}
          </p>
          <p>
            <span>Цена: </span>
            {isEditable ? (
              <CustomInput
                type="number"
                placeholder="Примерная стоимость"
                className={styles.input}
                {...register("price")}
              />
            ) : (
              <div>{wish.price}</div>
            )}
          </p>
          <p>
            <span> Ссылка на товар: </span>
            {isEditable ? (
              <CustomInput
                type="text"
                placeholder="Cсылка на товар"
                className={styles.input}
                {...register("link")}
              />
            ) : (
              <div>
                {wish.link ? (
                  <a href={wish.link} target="_blank">
                    открыть
                  </a>
                ) : (
                  "нету"
                )}
              </div>
            )}
          </p>
          <p>
            <span>Категория: </span>
            {isEditable ? (
              <SelectList
                lists={lists}
                type="text"
                placeholder="Лист"
                className={styles.input}
                {...register("id_list")}
              />
            ) : (
              <div>
                {allCategories.find((c) => c.id === wish.category_id)?.name}
              </div>
            )}
          </p>
          <p>
            <span>Дата создания:</span>
            {formatDate(wish.date_of_creation)}
          </p>
        </div>
        <div className={styles.imageColumn}>
          <p>
            <span> Изображение: </span>

            {isEditable ? (
              <ImageInput
                value={imageUrl}
                onChange={(e) => setValue("image_url", e.target.value)}
                register={register}
                name="image_url"
                className={styles.input}
                placeholder="Enter image URL"
              />
            ) : (
              <div className={styles.image}>
                {wish.image_url ? (
                  <img
                    className={styles.uploadedImage}
                    src={wish.image_url}
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      window.open(imageUrl, "_blank");
                    }}
                  />
                ) : (
                  "нету"
                )}
              </div>
            )}
            {isEditable && (
              <button className={styles.btnSave} type="submit">
                Сохранить
              </button>
            )}
          </p>
        </div>
      </form>
    );
  }
);

export default WishContainer;
