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
  role?: React.AriaRole;
  checked?: boolean | undefined;
  required?: boolean;
  label?: React.ReactNode;
  placeholder?: string;
  className?: string;
  onVisible?: boolean;
  readOnly?: boolean;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

const CustomCheckbox = forwardRef<HTMLInputElement, InputElementProps>(
  function InputElement(props, ref) {
    return (
      <input
        className={styles.checkbox}
        type="checkbox"
        ref={ref}
        role="switch"
        {...props}
      />
    );
  }
);

export default CustomCheckbox;
