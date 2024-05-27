import React, { FC, useState, useEffect, useRef } from "react";
import { TList } from "../../../../services/ListService";
import styles from "./selectLists.module.scss";
import {
  ArrowUpOutlined,
  DownOutlined,
  SwapOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  filterByListIds,
  setAscending,
  setFilterByCategories,
  setSortByDate,
  setSortByHidden,
  setSortByPrice,
} from "../../../../store/reducers/sortAndFilterSlice";
import { TCategory, allCategories } from "../../../../utils/allCategories";

interface ISortByDate {
  id: number;
  text: string;
}
const sortValues: ISortByDate[] = [
  { id: 1, text: "По дате" },
  { id: 2, text: "По видимости" },
  { id: 3, text: "По цене" },
];

const SelectSort: FC = () => {
  const dispatch = useAppDispatch();
  const blockRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<ISortByDate>(sortValues[0]);
  const ascending = useAppSelector((state) => state.sortAndFilterReducer)
    .sortWishs.ascending;

  const [listOpen, setListOpen] = useState(false);

  const handleSelect = (value: ISortByDate) => {
    setSelected(value);
    setListOpen(false);
  };

  const isSelected = (value: ISortByDate) => {
    return selected === value;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (blockRef.current && !blockRef.current.contains(event.target as Node)) {
      setListOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [listOpen]);

  useEffect(() => {
    switch (selected.id) {
      case 1:
        dispatch(setSortByDate());
        break;
      case 2:
        dispatch(setSortByHidden());
        break;
      case 3:
        dispatch(setSortByPrice());
        break;
    }
  }, [selected]);

  const handleAscending = () => {
    dispatch(setAscending());
  };
  return (
    <div className={styles.selectComponent}>
      <div className={styles.selectBlock} ref={blockRef}>
        <div
          className={listOpen ? styles.titleListOpen : styles.title}
          onClick={() => {
            setListOpen(!listOpen);
          }}
        >
          <DownOutlined className={styles.arrowDown} />
          <span className={styles.text}>Сортировка</span>
        </div>
        <div className={styles.selectListBlock}>
          <select
            className={listOpen ? styles.selectList : styles.selectListClose}
            value={sortValues.map((c) => c.text)}
            multiple
          >
            {sortValues.map((c) => (
              <option
                className={isSelected(c) ? styles.itemSelected : styles.item}
                key={c.id}
                value={c.id}
                onClick={() => handleSelect(c)}
              >
                {c.text}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ArrowUpOutlined
        className={
          ascending ? styles.btnAscendingTrue : styles.btnAscendingFalse
        }
        onClick={handleAscending}
      />
    </div>
  );
};

export default SelectSort;
