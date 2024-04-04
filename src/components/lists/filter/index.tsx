import React, { FC } from "react";
import styles from "./filter.module.scss";

interface IFilterBlock {
  open: boolean;
  onClose: () => void;
}

const FilterBlock: FC<IFilterBlock> = ({ open, onClose }) => {
  return (
    <div className={open ? styles.filterBlockOpen : styles.filterBlockClose}>
      {open ? (
        <div className={styles.block}>
          <div className={styles.tags}>Теги</div>
          <div className={styles.tags}>Теги</div>
          <div className={styles.tags}>Теги</div>
          <div className={styles.tags}>Теги</div>
          <div className={styles.tags}>Теги</div>
        </div>
      ) : null}
    </div>
  );
};

export default FilterBlock;
