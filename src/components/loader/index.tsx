import { Flex, Row, Spin } from "antd";
import React, { FC } from "react";
import styles from "./loader.module.scss";

const Loader: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        {/* <Row align="middle" justify="center" style={{ width: "100%" }}> */}
        {/* <Flex align="center" gap="middle"> */}
        <Spin size="large" />
        {/* </Flex> */}
        {/* </Row> */}
      </div>
    </div>
  );
};

export default Loader;
