import React, {
  type ChangeEventHandler,
  forwardRef,
  type KeyboardEventHandler,
  type FocusEventHandler,
  useState,
} from "react";

// import {
//   EyeOutlined,
//   EyeInvisibleOutlined,
//   ArrowDownOutlined,
// } from "@ant-design/icons";
// import styles from "./customInputPopup.module.scss";
import { TCategory, allCategories } from "../../utils/allCategories";

export interface InputElementProps {
  value?: string;
  type?: string;
  required?: boolean;
  label?: React.ReactNode;
  placeholder?: string;
  className?: string;
  onVisible?: boolean;
  readOnly?: boolean;
  onFocus?: FocusEventHandler<HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onKeyDown?: KeyboardEventHandler<HTMLSelectElement>;
}

const SelectCategory = forwardRef<HTMLSelectElement, InputElementProps>(
  function InputElement(props, ref) {
    return (
      <select
        {...props}
        ref={ref}
        onChange={props.onChange}
        onBlur={props.onBlur}
      >
        {allCategories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    );
  }
);

export default SelectCategory;
