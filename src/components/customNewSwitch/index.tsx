import React, { FC, memo, useState } from "react";
import styles from "./switch.module.scss";

interface ISwitch {
  checked: boolean;
  onChange: () => void;
  text?: string;
}

const Switch: FC<ISwitch> = ({ checked, onChange, text }) => {
  return (
    <div className={styles.switchContainer}>
      <label className={styles.switch}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className={styles.sliderRound}></span>
      </label>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default Switch;
