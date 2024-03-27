import React, {
  type ChangeEventHandler,
  forwardRef,
  type KeyboardEventHandler,
  type FocusEventHandler,
  useState,
} from "react";

import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import styles from "./customChecbox.module.scss";

export interface InputElementProps {
  value?: string;
  type?: string;
  required?: boolean;
  label?: React.ReactNode;
  placeholder?: string;
  className?: string;
  onVisible?: boolean;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

const CustomCheckbox = forwardRef<HTMLInputElement, InputElementProps>(
  function InputElement(props, ref) {
    return (
      <div className={styles.inputRow}>
        {/* <input
          {...props}
          ref={ref} 
          type={props.type === "password" && !visible ? "password" : "text"}
        />
        {props.type === "password" ? (
          visible ? (
            <EyeInvisibleOutlined
              className={styles.customIcon}
              onClick={() => setVisible(!visible)}
            />
          ) : (
            <EyeOutlined
              className={styles.customIcon}
              onClick={() => setVisible(!visible)}
            />
          )
        ) : null} */}
        <input type="checkbox" role="switch" className={styles.neon} />
      </div>
    );
  }
);

export default CustomCheckbox;
