import React, {
  type ChangeEventHandler,
  forwardRef,
  type KeyboardEventHandler,
  type FocusEventHandler,
} from "react";

// import styles from "./customInputPopup.module.scss";
// import { TCategory, allCategories } from "../../utils/allCategories";
import { TList } from "../../services/ListService";

export interface InputElementProps {
  value?: string;
  type?: string;
  required?: boolean;
  label?: React.ReactNode;
  lists: TList[];
  placeholder?: string;
  className?: string;
  onVisible?: boolean;
  readOnly?: boolean;
  onFocus?: FocusEventHandler<HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onKeyDown?: KeyboardEventHandler<HTMLSelectElement>;
}

const SelectList = forwardRef<HTMLSelectElement, InputElementProps>(
  function InputElement(props, ref) {
    return (
      <select
        {...props}
        ref={ref}
        onChange={props.onChange}
        onBlur={props.onBlur}
      >
        {props.lists.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    );
  }
);

export default SelectList;
