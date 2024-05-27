import React, { FC, useState, useEffect, useRef } from "react";
import { TList } from "../../../../services/ListService";
import styles from "./selectLists.module.scss";
import { DownOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../../hooks/redux";
import { filterByListIds } from "../../../../store/reducers/sortAndFilterSlice";
interface ISelectLists {
  data: TList[];
  onChange: (lists: TList[]) => void;
}

const SelectLists: FC<ISelectLists> = ({ data, onChange }) => {
  const dispatch = useAppDispatch();
  const blockRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<TList[] | null>(data);

  const [listOpen, setListOpen] = useState(false);

  const handleSelect = (id: number) => {
    const findIndex = selected?.findIndex((select) => select.id === id);
    const findItem = data.find((l) => l.id === id) as TList;

    if (findIndex !== -1) {
      setSelected((prevItems) =>
        prevItems ? prevItems.filter((item) => item.id !== findItem.id) : null
      );
    } else {
      setSelected((prevItems) => [...(prevItems || []), findItem]);
    }
  };

  const isSelected = (value: TList) => {
    const findIndex = selected?.findIndex((select) => select.id === value.id);
    if (findIndex !== -1) {
      return true;
    } else {
      return false;
    }
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
    if (selected) {
      // onChange(selected);
      dispatch(filterByListIds(selected.map((l) => l.id)));
    }
  }, [selected]);

  return (
    <div className={styles.selectBlock} ref={blockRef}>
      <div
        className={listOpen ? styles.titleListOpen : styles.title}
        onClick={() => {
          setListOpen(!listOpen);
        }}
      >
        <DownOutlined className={styles.arrowDown} />
        <span className={styles.text}>Темы</span>
      </div>
      <div className={styles.selectListBlock}>
        <select
          className={listOpen ? styles.selectList : styles.selectListClose}
          value={selected?.map((item) => item.name)}
          multiple
        >
          {data.map((c) => (
            <option
              className={isSelected(c) ? styles.itemSelected : styles.item}
              key={c.id}
              value={c.id}
              onClick={() => handleSelect(c.id)}
            >
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectLists;
