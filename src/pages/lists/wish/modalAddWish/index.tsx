import React, { FC, useState, forwardRef, useEffect, memo } from "react";
// import styles from "./settingsList.module.scss";
import styles from "./modalAddWish.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { TWish, wishApi } from "../../../../services/WishService";
import CustomModal from "../../../../components/modal";
import CustomLoader from "../../../../components/loader/CustomLoader";
import CustomInput from "../../../../components/customInput";
import SelectCategory from "../../../../components/customInputPopup";
import SelectList from "../../../../components/selectList";
import { TList } from "../../../../services/ListService";

type ISettingsListProps = {
  lists: TList[];
  open: boolean;
  handleClose: () => void;
};

export const ModalAddWish: FC<ISettingsListProps> = ({
  handleClose,
  lists,
  open,
}) => {
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
      // console.log({
      //   description: dataForm.description,
      //   hidden: false,
      //   id_list: dataForm.id_list,
      //   link: dataForm.link,
      //   price: dataForm.price,
      //   title: dataForm.title,
      //   image_url: dataForm.image_url,
      //   category_id: dataForm.category_id,
      // });
      try {
        addWish({
          description: dataForm.description,
          hidden: false,
          id_list: dataForm.id_list,
          link: dataForm.link,
          price: dataForm.price,
          title: dataForm.title,
          image_url: dataForm.image_url,
          category_id: dataForm.category_id,
        }).then(() => {
          reset();
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
      <form className={styles.settingsBlock} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputRows}>
          <p>Желание</p>
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
          <p>Лист</p>
          <SelectList
            lists={lists}
            type="text"
            placeholder="Лист"
            className={styles.input}
            {...register("id_list")}
          />
          <p>Cсылка на товар</p>
          <CustomInput
            type="text"
            placeholder="Cсылка на товар"
            className={styles.input}
            {...register("link")}
          />
          <p>Примерная стоимость в рублях</p>{" "}
          <CustomInput
            type="number"
            placeholder="Примерная стоимость"
            className={styles.input}
            {...register("price")}
          />
          <p>Ссылка на изображение</p>{" "}
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
          <input type="submit" className={styles.btnSave} value={"Сохранить"} />
        </div>
      </form>
    </CustomModal>
  );
};

// import React, { FC, useState, forwardRef, useEffect } from "react";
// // import styles from "./settingsList.module.scss";
// import styles from "./modalAddWish.module.scss";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { TWish, wishApi } from "../../../../services/WishService";
// import CustomModal from "../../../../components/modal";
// import CustomLoader from "../../../../components/loader/CustomLoader";
// import CustomInput from "../../../../components/customInput";
// import SelectCategory from "../../../../components/customInputPopup";
// import SelectList from "../../../../components/selectList";
// import { TList } from "../../../../services/ListService";

// type ISettingsListProps = {
//   lists: TList[];
//   open: boolean;
//   handleClose: () => void;
// };

// export const ModalAddWish = forwardRef<HTMLDivElement, ISettingsListProps>(
//   ({ handleClose, lists, open }, ref) => {
//     const {
//       register,
//       handleSubmit,
//       watch, // для отслеживания введенных данных
//       reset,
//       formState: { errors, isValid },
//       getValues, //не обязательно
//       getFieldState, //не обязательноб
//       setValue,
//     } = useForm<TWish>({
//       mode: "onChange",
//     });

//     const [loading, setLoading] = useState(false);

//     const [addWish] = wishApi.useAddNewWishMutation();

//     useEffect(() => {
//       console.log(watch());
//     }, [watch]);

//     const onSubmit: SubmitHandler<TWish> = async (dataForm) => {
//       if (isValid) {
//         console.log({
//           description: dataForm.description,
//           hidden: false,
//           id_list: dataForm.id_list,
//           link: dataForm.link,
//           price: dataForm.price,
//           title: dataForm.title,
//           image_url: dataForm.image_url,
//           category_id: dataForm.category_id,
//         });
//         // try {
//         //   addWish({
//         //     description: dataForm.description,
//         //     hidden: false,
//         //     id_list: lists[0].id,
//         //     link: dataForm.link,
//         //     price: dataForm.price,
//         //     title: dataForm.title,
//         //     image_url: dataForm.image_url,
//         //     category_id: dataForm.category_id,
//         //   }).then(() => {
//         //     handleClose();
//         //   });
//         // } catch (error) {
//         //   console.log(error);
//         // }
//       }
//     };

//     return (
//       <CustomModal isOpen={open} title="Новое желание" onClose={handleClose}>
//         {loading ? <CustomLoader /> : null}
//         <form
//           className={styles.settingsBlock}
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           <div className={styles.inputRows}>
//             <p>Желание</p>
//             <CustomInput
//               type="text"
//               placeholder="Желание"
//               className={styles.input}
//               {...register("title", {
//                 required: "Поле не может быть пустым",
//               })}
//             />
//             {errors ? (
//               <p className={styles.error}>{errors.title?.message}</p>
//             ) : null}
//             <p>Описание</p>
//             <CustomInput
//               type="text"
//               placeholder="Описание"
//               className={styles.input}
//               {...register("description")}
//             />
//             {errors ? (
//               <p className={styles.error}>{errors.category_id?.message}</p>
//             ) : null}
//             <p>Категория</p>
//             <SelectCategory
//               type="text"
//               placeholder="Категория"
//               className={styles.input}
//               {...register("category_id")}
//             />
//             <p>Лист</p>
//             <SelectList
//               lists={lists}
//               type="text"
//               placeholder="Лист"
//               className={styles.input}
//               {...register("id_list")}
//             />
//             <p>Cсылка на товар</p>
//             <CustomInput
//               type="text"
//               placeholder="Cсылка на товар"
//               className={styles.input}
//               {...register("link")}
//             />
//             <p>Примерная стоимость в рублях</p>{" "}
//             <CustomInput
//               type="number"
//               placeholder="Примерная стоимость"
//               className={styles.input}
//               {...register("price")}
//             />
//             <p>Ссылка на изображение</p>{" "}
//             <CustomInput
//               className={styles.input}
//               placeholder="ссылка на товар"
//               type="text"
//               {...register("image_url")}
//             />
//           </div>
//           <div className={styles.btnRow}>
//             <input
//               type="button"
//               className={styles.btnCancel}
//               value={"Отмена"}
//               onClick={handleClose}
//             />
//             <input
//               type="submit"
//               className={styles.btnSave}
//               value={"Сохранить"}
//             />
//           </div>
//         </form>
//       </CustomModal>
//     );
//   }
// );
