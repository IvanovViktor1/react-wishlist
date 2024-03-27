import React, { FC, ReactNode } from "react";
import styles from "./customButton.module.scss";

interface ICustomButton {
  text: string;
  icon?: ReactNode;
}

const CustomButton: FC<ICustomButton> = ({ text, icon }) => {
  return (
    <div className={styles.button}>
      <p className={styles.btnText}>{text}</p>
      <div className={styles.icon}>{icon}</div>
    </div>
  );
};

export default CustomButton;
