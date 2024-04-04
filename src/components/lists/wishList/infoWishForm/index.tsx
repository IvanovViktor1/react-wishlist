import React, { FC, useState, forwardRef } from "react";
import styles from "./infoWishForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { TWish, wishApi } from "../../../../services/WishService";
import Loader from "../../../loader";
import CustomInput from "../../../customInput";
import CustomCheckbox from "../../../customCheckbox";

type IInfoWishForm = {
  wish: TWish;
  visible: boolean;
};

export const InfoWishForm = forwardRef<HTMLDivElement, IInfoWishForm>(
  ({ visible, wish }, ref) => {
    const {
      formState: { errors, isValid },
      getValues, //не обязательно
      getFieldState, //не обязательноб
      setValue,
    } = useForm<TWish>({
      mode: "onChange",
      values: wish,
    });

    return (
      <div
        className={styles.infoContainer}
        ref={ref}
        style={{ visibility: visible ? "visible" : "hidden" }}
      >
        <div>
          Наименование:
          <p>{wish.title}</p>
        </div>
        <div>
          Описание:
          <p>{wish.description}</p>
        </div>
        <div>
          Стоимость:
          <p>{wish.price}</p>
        </div>
      </div>
    );
  }
);
