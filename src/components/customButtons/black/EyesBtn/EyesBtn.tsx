import { Spin } from "antd";
import React, { FC } from "react";
import styles from "./eyesBtn.module.scss";

interface IEyesBtn {
  openEyes: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}

const EyesBtn: FC<IEyesBtn> = ({ openEyes = true, onClick, isLoading }) => {
  return (
    <div className={styles.mainStyles} onClick={onClick}>
      {isLoading ? (
        <div className={styles.loaderLoading}></div>
      ) : (
        <div
          className={openEyes ? styles.loaderBlock : styles.loaderBlockClose}
        >
          <div className={styles.loader}></div>
        </div>
      )}
    </div>
  );
};

export default EyesBtn;
