import React, { FC, ReactNode } from "react";
import styles from "./customButton.module.scss";

interface ICustomButton {
  text: string;
}

const CustomButton: FC<ICustomButton> = ({ text }) => {
  return (
    <div className={styles.mainBlockBtn}>
      <input className={styles.button} type="submit" value={text} />
    </div>
  );
};

export default CustomButton;
