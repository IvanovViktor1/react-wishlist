import React, { useState, useEffect } from "react";
import styles from "./filterWishs.module.scss";
import { TCategory, allCategories } from "../../../utils/allCategories";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  reversAllFilterCategorySortWishs,
  setFilterByCategories,
} from "../../../store/reducers/sortAndFilterSlice";
import {
  CaretDownOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const FilterWishs = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.sortAndFilterReducer)
    .sortWishs.categories;

  const isSelectedCategory = (id: number) => {
    const findIndexCategory = categories.findIndex((c) => c.id === id);
    if (findIndexCategory === -1) {
      return false;
    } else return true;
  };

  const handleClickCategory = (id: number) => {
    // dispatch(setFilterByCategories(id));
  };

  const handleAllCategory = () => {
    dispatch(reversAllFilterCategorySortWishs());
  };

  return (
    <div className={styles.main}>
      <div className={styles.selectBlock}>
        <CaretDownOutlined
          className={styles.btnOpenList}
          onClick={() => setFilterOpen(!filterOpen)}
        />
        <div className={styles.select}>
          {categories.map((c) => (
            <div className={styles.item} key={c.id}>
              <span>{c.name}</span>
              <CloseOutlined
                className={styles.iconRemove}
                onClick={() => {
                  handleClickCategory(c.id);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.listBlock}>
        <div
          className={
            filterOpen ? styles.listCategoriesOpen : styles.listCategoriesClose
          }
        >
          <div className={styles.listItem} onClick={() => handleAllCategory()}>
            Все
          </div>

          {allCategories.map((c, index) => (
            <div
              className={
                isSelectedCategory(c.id)
                  ? styles.listItemSelected
                  : styles.listItem
              }
              key={index}
              onClick={() => {
                handleClickCategory(c.id);
              }}
            >
              {c.name}
              {isSelectedCategory(c.id) ? (
                <CheckOutlined style={{ color: "greenyellow" }} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterWishs;
