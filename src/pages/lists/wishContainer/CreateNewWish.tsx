// import React, { FC, memo, useEffect } from "react";
// import { TWish, wishApi } from "../../../services/WishService";
// import styles from "./wishContainer.module.scss";
// import { allCategories } from "../../../utils/allCategories";
// import { formatDate } from "../../../utils/formatDate";
// import { SubmitHandler, useForm } from "react-hook-form";
// import CustomInput from "../../../components/customInput";
// import ImageInput from "../../../components/customInputImage";
// import SelectList from "../../../components/selectList";
// import { TList } from "../../../services/ListService";
// import { useAppSelector } from "../../../hooks/redux";
// import { useRefetchWishs } from "../../../utils/refetchs";
// import SelectCategory from "../../../components/customInputPopup";
// import { CloseOutlined } from "@ant-design/icons";
// interface ICreateNewWish {
//   id_list: number;
//   onSave: () => void;
//   onClose: () => void;
// }

// const CreateNewWish: FC<ICreateNewWish> = memo(
//   ({ id_list, onSave, onClose }) => {
//     const {
//       register,
//       handleSubmit,
//       watch, // для отслеживания введенных данных
//       reset,
//       setValue,
//       formState: { errors, isValid },
//     } = useForm<TWish>({
//       mode: "onChange",
//     });

//     const subscribe = watch();
//     const imageUrl = watch("image_url") || "";
//     const _ = require("lodash");
//     const [addWish] = wishApi.useAddNewWishMutation();
//     const onSubmit: SubmitHandler<TWish> = async (dataForm) => {
//       if (isValid) {
//         try {
//           // console.log({
//           //   description: dataForm.description,
//           //   hidden: false,
//           //   id_list: id_list,
//           //   link: dataForm.link,
//           //   price: dataForm.price,
//           //   title: dataForm.title,
//           //   image_url: dataForm.image_url,
//           //   category_id: dataForm.category_id,
//           // });
//           addWish({
//             description: dataForm.description,
//             hidden: false,
//             id_list: id_list,
//             link: dataForm.link,
//             price: dataForm.price,
//             title: dataForm.title,
//             image_url: dataForm.image_url,
//             category_id: dataForm.category_id,
//           }).then(() => {
//             reset();
//             onSave();
//           });
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     };

//     const handleClose = () => {
//       reset();
//       onClose();
//     };

//     return (
//       <form className={styles.cardWishInfo} onSubmit={handleSubmit(onSubmit)}>
//         <CloseOutlined className={styles.btnClose} onClick={handleClose} />
//         <div className={styles.textColumn}>
//           <p>
//             <span>Наименование:</span>{" "}
//             <CustomInput
//               type="text"
//               placeholder="Желание"
//               className={styles.input}
//               {...register("title", {
//                 required: "Поле не может быть пустым",
//               })}
//             />
//           </p>
//           <p>
//             <span>Описание:</span>

//             <CustomInput
//               type="text"
//               placeholder="Описание"
//               className={styles.input}
//               {...register("description")}
//             />
//           </p>
//           <p>
//             <span>Категория: </span>
//             <SelectCategory
//               type="text"
//               placeholder="Категория"
//               className={styles.input}
//               {...register("category_id")}
//             />
//           </p>
//           <p>
//             <span>Цена: </span>

//             <CustomInput
//               type="number"
//               placeholder="Примерная стоимость"
//               className={styles.input}
//               {...register("price"),{validate: (value) => !isNaN(Number(value)) || "Please enter a valid number"} }
//             />
//           </p>
//           <p>
//             <span> Ссылка на товар: </span>

//             <CustomInput
//               type="text"
//               placeholder="Cсылка на товар"
//               className={styles.input}
//               {...register("link")}
//             />
//           </p>
//         </div>
//         <div className={styles.imageColumn}>
//           <p>
//             <span> Изображение: </span>

//             <ImageInput
//               value={imageUrl}
//               onChange={(e) => setValue("image_url", e.target.value)}
//               register={register}
//               name="image_url"
//               className={styles.input}
//               placeholder="Enter image URL"
//             />

//             <button className={styles.btnSave} type="submit">
//               Сохранить
//             </button>
//           </p>
//         </div>
//       </form>
//     );
//   }
// );

// export default CreateNewWish;

import React, { FC, memo } from "react";
import { TWish, wishApi } from "../../../services/WishService";
import styles from "./wishContainer.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../../../components/customInput";
import ImageInput from "../../../components/customInputImage";
import SelectCategory from "../../../components/customInputPopup";
import { CloseOutlined } from "@ant-design/icons";

interface ICreateNewWish {
  id_list: number;
  onSave: () => void;
  onClose: () => void;
}

const CreateNewWish: FC<ICreateNewWish> = memo(
  ({ id_list, onSave, onClose }) => {
    const {
      register,
      handleSubmit,
      watch,
      reset,
      setValue,
      formState: { errors, isValid },
    } = useForm<TWish>({
      mode: "onChange",
    });

    const imageUrl = watch("image_url") || "";
    const [addWish] = wishApi.useAddNewWishMutation();

    const onSubmit: SubmitHandler<TWish> = async (dataForm) => {
      if (isValid) {
        try {
          await addWish({
            description: dataForm.description,
            hidden: false,
            id_list: id_list,
            link: dataForm.link,
            price: dataForm.price,
            title: dataForm.title,
            image_url: dataForm.image_url,
            category_id: dataForm.category_id,
          });
          reset();
          onSave();
        } catch (error) {
          console.log(error);
        }
      }
    };

    const handleClose = () => {
      reset();
      onClose();
    };

    return (
      <form className={styles.cardWishInfo} onSubmit={handleSubmit(onSubmit)}>
        <CloseOutlined className={styles.btnClose} onClick={handleClose} />
        <div className={styles.textColumn}>
          <p>
            <span>Наименование:</span>
            <CustomInput
              type="text"
              placeholder="Желание"
              className={styles.input}
              {...register("title", {
                required: "Поле не может быть пустым",
              })}
            />
          </p>
          {errors.title && <p>{errors.title.message}</p>}
          <p>
            <span>Описание:</span>
            <CustomInput
              type="text"
              placeholder="Описание"
              className={styles.input}
              {...register("description")}
            />
          </p>
          <p>
            <span>Категория: </span>
            <SelectCategory
              type="text"
              placeholder="Категория"
              className={styles.input}
              {...register("category_id")}
            />
          </p>
          <p>
            <span>Цена: </span>
            <CustomInput
              type="number"
              placeholder="Примерная стоимость"
              className={styles.input}
              {...register("price", {
                validate: (value) =>
                  !isNaN(Number(value)) || "Необходимо ввести только число",
              })}
            />
          </p>
          {errors.price && <p>{errors.price.message}</p>}
          <p>
            <span> Ссылка на товар: </span>
            <CustomInput
              type="text"
              placeholder="Cсылка на товар"
              className={styles.input}
              // {...register("link")}
              {...register("link", {
                validate: (value) => {
                  const urlPattern = new RegExp(
                    "^(https?:\\/\\/)?" + // protocol
                      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
                      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
                      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                      "(\\#[-a-z\\d_]*)?$", // fragment locator
                    "i"
                  );
                  if (value) {
                    return urlPattern.test(value) || "Не корректный URL";
                  } else return true;
                },
              })}
            />
          </p>
          {errors.link && <p>{errors.link.message}</p>}
        </div>
        <div className={styles.imageColumn}>
          <p>
            <span> Изображение: </span>
            <ImageInput
              value={imageUrl}
              onChange={(e) => setValue("image_url", e.target.value)}
              register={register}
              name="image_url"
              className={styles.input}
              placeholder="Enter image URL"
            />
            <button className={styles.btnSave} type="submit">
              Сохранить
            </button>
          </p>
        </div>
      </form>
    );
  }
);

export default CreateNewWish;
