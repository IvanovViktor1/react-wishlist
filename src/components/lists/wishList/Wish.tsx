import { FC, useState, useEffect } from "react";
import styles from "./listItems.module.scss";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../../customInput";
import { TWish, wishApi } from "../../../services/WishService";
import Loader from "../../loader";
import CustomCheckbox from "../../customCheckbox";
import CustomButton from "../../customButton";

const Wish: FC<{ data: TWish }> = ({ data }) => {
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
    values: data,
  });
  const { refetch: refetchList } = wishApi.useGetWishsByListIdQuery(
    data.id_list
  );

  const [isNew, setIsNew] = useState(false);

  const [removeWish] = wishApi.useRemoveWishMutation();

  const [editWish, { isLoading: loadingEdit }] = wishApi.useEditWishMutation();

  const onSubmit: SubmitHandler<TWish> = (dataForm) => {
    try {
      editWish({
        description: dataForm.description,
        hidden: false,
        id: dataForm.id,
        id_list: dataForm.id_list,
        link: dataForm.link,
        price: dataForm.price,
        title: dataForm.title,
      }).then(() => {
        refetchList();
        setIsNew(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const _ = require("lodash");

  const changedData = watch([
    "description",
    "hidden",
    "link",
    "price",
    "title",
  ]);

  const subscribe = watch();

  const deleteWish = () => {
    removeWish(data.id).then(() => {
      refetchList();
    });
  };

  return (
    <form className={styles.listItem} onSubmit={handleSubmit(onSubmit)}>
      {loadingEdit ? <Loader /> : null}

      <div className={styles.inputColumn}>
        <div className={styles.headBlock}>
          <div className={styles.headBlockText}>
            <p className={styles.placeholder}>Наименование</p>
            <CustomInput
              className={styles.inputRow}
              type="text"
              {...register("title")}
            />
          </div>

          <CloseOutlined className={styles.remove} onClick={deleteWish} />
        </div>

        {!changedData.includes(data.title) ? (
          <p className={styles.warning}>не сохранено</p>
        ) : null}
        <p className={styles.placeholder}>Описание</p>
        <CustomInput
          className={styles.inputRow}
          type="text"
          {...register("description")}
        />
        {!changedData.includes(data.description) ? (
          <p className={styles.warning}>не сохранено</p>
        ) : null}
        <p className={styles.placeholder}>Примерная стоимость</p>
        <CustomInput
          className={styles.inputRow}
          type="number"
          {...register("price")}
        />
        {!changedData.includes(data.price) ? (
          <p className={styles.warning}>не сохранено</p>
        ) : null}
        <p className={styles.placeholder}>Ссылка на желание или товар</p>
        <CustomInput
          className={styles.inputRow}
          type="text"
          {...register("link")}
        />
        {!changedData.includes(data.link) ? (
          <p className={styles.warning}>не сохранено</p>
        ) : null}
        {/* <CustomInput
          className={styles.inputRow}
          type="text"
          {...register("hidden")}
        /> */}
        {!changedData.includes(data.hidden) ? (
          <p className={styles.warning}>не сохранено</p>
        ) : null}
        {!_.isEqual(subscribe, data) && <CustomButton text="Сохранить" />}
        {/* <CustomButton text="Сохранить" icon={<CheckOutlined />} /> */}
      </div>
    </form>
  );
};

export default Wish;
