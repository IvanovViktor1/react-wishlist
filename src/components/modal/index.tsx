import React, { FC } from "react";
import styles from "./customModal.module.scss";
import { JsxElement } from "typescript";
import { CloseOutlined } from "@ant-design/icons";

interface ICustomModal {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}

const CustomModal: FC<ICustomModal> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalWrapper}>
            <div className={styles.modalContent}>
              <div className={styles.header}>
                {title}
                <CloseOutlined
                  className={styles.btnModalClose}
                  onClick={onClose}
                />
              </div>
              <div className={styles.body}>{children}</div>
            </div>
          </div>
        </div>
      )}
    </>

    // }
  );
};

export default CustomModal;
