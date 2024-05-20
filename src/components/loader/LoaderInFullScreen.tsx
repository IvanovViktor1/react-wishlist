import { Spin } from "antd";
import React, { FC } from "react";
import styles from "./loaderInFullScreen.module.scss";

interface ICustomLoader {
  text?: string;
}

const LoaderInFullScreen: FC<ICustomLoader> = ({ text = "Загрузка..." }) => {
  const inlineStyle = {
    "--loading-content": `"${text}"`,
  } as React.CSSProperties;

  return (
    <div className={styles.window}>
      <div className={styles.loader} style={inlineStyle}></div>
    </div>
  );
};

export default LoaderInFullScreen;
