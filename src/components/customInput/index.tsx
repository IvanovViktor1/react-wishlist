import React, {
  type ChangeEventHandler,
  forwardRef,
  type KeyboardEventHandler,
  type FocusEventHandler,
  useState,
} from "react";

import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import styles from "./customInput.module.scss";

export interface InputElementProps {
  value?: string;
  type?: string;
  required?: boolean;
  label?: React.ReactNode;
  placeholder?: string;
  className?: string;
  onVisible?: boolean;
  readOnly?: boolean;
  // onFocus?: FocusEventHandler<HTMLInputElement>;
  // onBlur?: FocusEventHandler<HTMLInputElement>;
  // onChange?: ChangeEventHandler<HTMLInputElement>;
  // onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
}

const CustomInput = forwardRef<HTMLTextAreaElement, InputElementProps>(
  function InputElement(props, ref) {
    const [visible, setVisible] = useState(false);
    return (
      <div className={styles.inputRow}>
        {/* <input
          {...props}
          ref={ref}
          
          type={props.type === "password" && !visible ? "password" : "text"}
        /> */}
        <textarea
          {...props}
          ref={ref}

          // type={props.type === "password" && !visible ? "password" : "text"}
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
        ) : null}
      </div>
    );
  }
);

export default CustomInput;
