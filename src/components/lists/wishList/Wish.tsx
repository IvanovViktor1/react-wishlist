import React, { FC, useState, useEffect } from "react";
import styles from "./listItems.module.scss";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  SmallDashOutlined,
} from "@ant-design/icons";
import { useForm, useWatch } from "react-hook-form";
import CustomInput from "../../customInput";
import { TWish, wishApi } from "../../../services/WishService";

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

  const [isNew, setIsNew] = useState(false);

  const {} = wishApi.useGetWishByIdQuery(data.id);

  const onSubmit = () => {
    console.log("save");
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      // console.log(value, name, type)
      setIsNew(true)
    );
    return () => {
      subscription.unsubscribe();
      setIsNew(false);
    };
  }, [watch]);

  return (
    <form className={styles.listItem} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.caseOptions}>
        {isNew ? (
          <button type="submit" className={styles.btnSave}>
            <SaveOutlined style={{ color: "green" }} />
            <CheckOutlined style={{ color: "green" }} />
          </button>
        ) : (
          <p> </p>
        )}
        <DeleteOutlined className={styles.btnDelete} />
      </div>

      <div className={styles.inputColumn}>
        <CustomInput
          className={styles.inputRow}
          type="text"
          {...register("title")}
        />
        <CustomInput
          className={styles.inputRow}
          type="text"
          {...register("description")}
        />
        <CustomInput
          className={styles.inputRow}
          type="text"
          {...register("price")}
        />
        <CustomInput
          className={styles.inputRow}
          type="text"
          {...register("link")}
        />
        <CustomInput
          className={styles.inputRow}
          type="text"
          {...register("hidden")}
        />
      </div>
    </form>
  );
};

export default Wish;
