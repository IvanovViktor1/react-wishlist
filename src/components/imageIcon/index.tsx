import React, { FC, useEffect } from "react";
import styles from "./imageIcon.module.scss";
import { useForm } from "react-hook-form";

interface IImageIcon {
  imageUrl: string;
}

const ImageIcon: FC = () => {
  const {
    register,
    handleSubmit,
    watch, // для отслеживания введенных данных
    reset,
    formState: { errors, isValid },
    getValues, //не обязательно
    getFieldState, //не обязательноб
    setValue,
  } = useForm<IImageIcon>({
    mode: "onChange",
  });

  //   const currentImg = getValues().imageUrl;
  const currentImg = watch("imageUrl");

  //   useEffect(() => {
  //     console.log(cc);
  //   }, [cc]);
  return (
    <form className={styles.mainBlock}>
      {currentImg && (
        <img
          src={currentImg}
          alt="Предварительный просмотр"
          style={{ maxWidth: "75%" }}
        />
      )}
      <input
        className={styles.inputUrl}
        type="url"
        placeholder="url"
        {...register("imageUrl")}
      />
    </form>
  );
};

export default ImageIcon;
