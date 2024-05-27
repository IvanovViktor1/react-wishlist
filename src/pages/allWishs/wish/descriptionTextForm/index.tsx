import React, { FC, useState } from "react";
import styles from "./descTextForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { TWish, wishApi } from "../../../../services/WishService";
import { TList } from "../../../../services/ListService";
import CustomLoader from "../../../../components/loader/CustomLoader";
import CustomInput from "../../../../components/customInput";
import SelectCategory from "../../../../components/customInputPopup";
import SelectList from "../../../../components/selectList";
import ImageInput from "../../../../components/customInputImage";
import { allCategories } from "../../../../utils/allCategories";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  SaveOutlined,
  StopOutlined,
} from "@ant-design/icons";
import BtnCopy from "../../../../components/btnCopyAndMessage";

interface IDescTextForm {
  wish: TWish;
  lists: TList[];
}

const DescriptionTextForm: FC<IDescTextForm> = ({ wish, lists }) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
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

  const [removeWish] = wishApi.useRemoveWishMutation();

  const handleRemove = () => {
    removeWish(wish.id).then(() => {
      // reloadWishs();
    });
  };

  const [editWish, { isLoading: loadingEdit }] = wishApi.useEditWishMutation();

  const onSubmit: SubmitHandler<TWish> = async (dataForm) => {
    try {
      if (!_.isEqual(subscribe, wish)) {
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
        });
      } else {
        console.log("-");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <div className={styles.mainBlock}>
      <div className={styles.titleBlock}>
        <div className={styles.titleText} onClick={() => setOpen(!open)}>
          <span>{wish.title}</span>
        </div>
        <div className={styles.buttons}>
          {wish.hidden ? (
            <EyeOutlined className={styles.btnEye} />
          ) : (
            <EyeInvisibleOutlined className={styles.btnEye} />
          )}
          <DeleteOutlined className={styles.btnDelete} onClick={handleRemove} />
          <div>
            {!_.isEqual(subscribe, wish) && (
              <>
                <SaveOutlined
                  className={styles.btnSave}
                  onClick={handleSubmit(onSubmit)}
                />
                <StopOutlined
                  className={styles.btnReset}
                  onClick={() => reset()}
                />
                {/* <input
                type="submit"
                className={styles.btnSave}
                value={"Сохранить"}
                onClick={handleSubmit(onSubmit)}
              />
              <input
                type="reset"
                className={styles.btnReset}
                value={"Сбросить"}
                onClick={() => reset()}
              /> */}
              </>
            )}
          </div>
          {_.isEqual(subscribe, wish) && (
            <EditOutlined
              className={styles.btnEdit}
              onClick={() => setDisabled(!disabled)}
            />
          )}
        </div>
      </div>

      <form
        className={open ? styles.descContainer : styles.descContainerUnvisible}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.firstRow}>
          <div className={styles.imgBlock}>
            <div className={styles.image}>
              {wish.image_url ? (
                <img
                  className={styles.imgIcon}
                  loading="lazy"
                  src={wish.image_url}
                  alt="Предварительный просмотр"
                />
              ) : allCategories ? (
                <img
                  className={styles.imgIconDefault}
                  loading="lazy"
                  src={
                    allCategories.find(
                      (category) => category.id === wish.category_id
                    )?.icon
                  }
                  alt="Предварительный просмотр"
                />
              ) : (
                <CustomLoader />
              )}
            </div>
          </div>
          <div className={styles.inputRows}>
            {/* <div className={styles.btnEditBlock}>
              <div>
                {!_.isEqual(subscribe, wish) && (
                  <>
                    <input
                      type="submit"
                      className={styles.btnSave}
                      value={"Сохранить"}
                      onClick={handleSubmit(onSubmit)}
                    />
                    <input
                      type="reset"
                      className={styles.btnReset}
                      value={"Сбросить"}
                      onClick={() => reset()}
                    />
                  </>
                )}
              </div>

              <EditOutlined
                className={disabled ? styles.btnEditIsDisabled : styles.btnEdit}
                onClick={() => setDisabled(!disabled)}
              />
            </div> */}
            {loadingEdit ? <CustomLoader text="изменение..." /> : null}
            <div className={styles.placeholder}>
              <p>Желание: </p>
              <BtnCopy
                className={styles.btnCopy}
                onClick={() => copyToClipboard(wish.title)}
              />
            </div>

            <CustomInput
              disabled={disabled}
              type="text"
              placeholder="Желание"
              className={styles.input}
              {...register("title", { required: "Поле не может быть пустым" })}
            />
            {errors ? (
              <p className={styles.error}>{errors.title?.message}</p>
            ) : null}

            <div className={styles.placeholder}>
              <p>Описание: </p>
              {wish.description && (
                <BtnCopy
                  className={styles.btnCopy}
                  onClick={() =>
                    copyToClipboard(wish.description ? wish.description : "")
                  }
                />
              )}
            </div>
            <CustomInput
              disabled={disabled}
              type="text"
              placeholder="Описание"
              className={styles.input}
              {...register("description")}
            />
          </div>
        </div>
        <div className={styles.secondRow}>
          {errors ? (
            <p className={styles.error}>{errors.category_id?.message}</p>
          ) : null}
          <div className={styles.placeholder}>
            <p>Категория: </p>
          </div>
          <SelectCategory
            disabled={disabled}
            type="text"
            placeholder="Категория"
            className={styles.input}
            {...register("category_id")}
          />
          <div className={styles.placeholder}>
            <p>Лист</p>
          </div>
          <SelectList
            lists={lists}
            type="text"
            placeholder="Лист"
            className={styles.input}
            {...register("id_list")}
          />
          <div className={styles.placeholder}>
            <p>Cсылка на товар: </p>
            {wish.link && (
              <BtnCopy
                className={styles.btnCopy}
                onClick={() => copyToClipboard(wish.link ? wish.link : "")}
              />
            )}
          </div>

          <CustomInput
            disabled={disabled}
            type="text"
            placeholder="Cсылка на товар"
            className={styles.input}
            {...register("link")}
          />
          <div className={styles.placeholder}>
            <p>Примерная стоимость в рублях :</p>
          </div>
          <CustomInput
            disabled={disabled}
            type="number"
            placeholder="Примерная стоимость"
            className={styles.input}
            {...register("price")}
          />
          <div className={styles.placeholder}>
            <p>Ссылка на изображение: </p>
            {wish.image_url && (
              <BtnCopy
                className={styles.btnCopy}
                onClick={() =>
                  copyToClipboard(wish.image_url ? wish.image_url : "")
                }
              />
            )}
          </div>

          <ImageInput
            disabled={disabled}
            value={imageUrl}
            onChange={(e) => setValue("image_url", e.target.value)}
            register={register}
            name="image_url"
            className={styles.input}
            placeholder="Enter image URL"
          />
        </div>
      </form>
    </div>
  );
};

export default DescriptionTextForm;
