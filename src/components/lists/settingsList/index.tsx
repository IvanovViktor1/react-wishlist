import React, {
  FC,
  useState,
  forwardRef,
  ForwardedRef,
  useEffect,
} from "react";
import { TList } from "../../../redux/lists/types";
import styles from "./settingsList.module.scss";
import CustomInput from "../../customInput";
import CustomButton from "../../customButton";
import { useAppDispatch } from "../../../redux/store";
import { editList } from "../../../redux/lists/asyncActions";
import { SubmitHandler, useForm } from "react-hook-form";
import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";
import { useSelector } from "react-redux";
import { listsStatusState } from "../../../redux/lists/selectors";
import { Status } from "../../../redux/types";
import Loader from "../../loader";

type ISettingsListProps = {
  data: TList;
  handleClose: () => void;
};

export const SettingsList = forwardRef<HTMLDivElement, ISettingsListProps>(
  ({ data, handleClose }, ref) => {
    const dispatch = useAppDispatch();
    const status = useSelector(listsStatusState);
    const [error, setError] = useState<string | number | null>(null);
    const {
      register,
      handleSubmit,
      watch, // для отслеживания введенных данных
      reset,
      formState: { errors, isValid },
      getValues, //не обязательно
      getFieldState, //не обязательноб
      setValue,
    } = useForm<TList>({
      mode: "onChange",
      values: data,
    });

    const onSubmit: SubmitHandler<TList> = async (dataForm) => {
      if (isValid) {
        try {
          await dispatch(editList(dataForm));

          if (status === Status.SUCCESS) {
            handleClose();
          }
        } catch (error) {
          const maybeError = isErrorWithMessage(error);
          if (maybeError) {
            setError(error.data.message);
          } else {
            setError("Неизвестная ошибка");
          }
        }
      }
    };

    return (
      <div
        className={styles.settingsContainer}
        ref={ref}
        style={{ visibility: "hidden" }}
      >
        {status === Status.LOADING ? <Loader /> : null}
        <form
          className={styles.settingsBlock}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.inputRows}>
            <CustomInput
              type="text"
              placeholder="Наименование"
              className={styles.input}
              {...register("name", { required: "Поле Имя обязательно!" })}
            />
            {errors ? (
              <p className={styles.error}>{errors.name?.message}</p>
            ) : null}

            <CustomInput
              type="text"
              placeholder="Опинсание"
              className={styles.input}
              {...register("description")}
            />

            <CustomInput
              className={styles.input}
              type="checkbox"
              {...register("hidden")}
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
          {error ? <p className={styles.error}>{error}</p> : null}
        </form>
      </div>
    );
  }
);
