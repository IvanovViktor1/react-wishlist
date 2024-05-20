import React, { FC } from "react";
import styles from "./filter.module.scss";
import CustomRadioSortLists from "./radioComponents/RadioSortLists";
import SelectCategory from "../customInputPopup";
import CustomRadioSortWishs from "./radioComponents/RadioSortWishs";

interface IFilterBlock {
  open: boolean;
  onClose: () => void;
}

const FilterBlock: FC<IFilterBlock> = ({ open, onClose }) => {
  return (
    <div className={open ? styles.filterBlockOpen : styles.filterBlockClose}>
      {open ? (
        <div className={styles.block}>
          <CustomRadioSortLists />
          <CustomRadioSortWishs />
          <SelectCategory className={styles.selectCategory} />
        </div>
      ) : null}
    </div>
  );
};

export default FilterBlock;
