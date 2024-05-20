import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import React, { FC, useState, useEffect } from "react";
import styles from "./customRadio.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  sortListsByDateAscendingFalse,
  sortListsByDateAscendingTrue,
  sortListsByHiddenAscendingFalse,
  sortListsByHiddenAscendingTrue,
} from "../../../store/reducers/sortAndFilterSlice";

export type TValueRadio = {
  id: number;
  content: string;
  action: () => void;
};

const CustomRadioSortLists: FC = () => {
  const dispatch = useAppDispatch();
  const [sortingUp, setSortingUp] = useState(false);

  const sortByDate = () => {
    sortingUp
      ? dispatch(sortListsByDateAscendingTrue())
      : dispatch(sortListsByDateAscendingFalse());
  };

  const sortByHidden = () => {
    sortingUp
      ? dispatch(sortListsByHiddenAscendingTrue())
      : dispatch(sortListsByHiddenAscendingFalse());
  };

  const values: TValueRadio[] = [
    { id: 1, content: "по дате", action: sortByDate },
    { id: 2, content: "скрытые", action: sortByHidden },
  ];

  const [current, setCurrent] = useState<number>(values[0].id);

  useEffect(() => {
    if (current === 1) {
      sortByDate();
    } else if (current === 2) {
      sortByHidden();
    }
  }, [sortingUp]);

  return (
    <div className={styles.main}>
      <span className={styles.title}>Сортировка листов</span>

      <div className={styles.itemsBlock}>
        <label className={styles.items}>
          {values.map((value) => (
            <span
              className={
                current === value.id ? styles.currentValue : styles.otherValue
              }
              key={value.id}
              onClick={() => {
                setCurrent(value.id);
                value.action();
              }}
            >
              {value.content}
            </span>
          ))}
        </label>
        <ArrowUpOutlined
          className={sortingUp ? styles.arrowUp : styles.arrowDown}
          onClick={() => setSortingUp(!sortingUp)}
        />
      </div>
    </div>
  );
};

export default CustomRadioSortLists;
