import React, {
  useState,
  useEffect,
  forwardRef,
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
} from "react";
import { UseFormRegister } from "react-hook-form";
import styles from "./customInputImg.module.scss";
import { DeleteOutlined } from "@ant-design/icons";

export interface InputElementProps {
  value?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  label?: React.ReactNode;
  placeholder?: string;
  className?: string;
  onVisible?: boolean;
  readOnly?: boolean;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  register: UseFormRegister<any>;
  name: string;
}

const ImageInput = forwardRef<HTMLTextAreaElement, InputElementProps>(
  function InputElement(props, ref) {
    const [isValid, setIsValid] = useState<boolean>(false);
    const [inputVisible, setInputVisible] = useState<boolean>(true);

    useEffect(() => {
      if (props.value) {
        validateImageUrl(props.value);
      }
    }, [props.value]);

    const validateImageUrl = (url: string) => {
      const img = new Image();
      img.onload = () => setIsValid(true);
      img.onerror = () => setIsValid(false);
      img.src = url;
    };

    const handleRemoveImage = () => {
      props.onChange && props.onChange({ target: { value: "" } } as any);
      setIsValid(false);
      setInputVisible(true);
    };

    return (
      <div className={styles.container}>
        {inputVisible && (
          <div className={styles.inputRow}>
            <textarea
              disabled={props.disabled}
              {...props.register(props.name)}
              ref={ref}
              {...props}
            />
          </div>
        )}
        {isValid && !props.disabled ? (
          <div className={styles.previewBlock}>
            {/* <span>Предварительный просмотр:</span> */}
            <div className={styles.imgBlock}>
              <img
                src={props.value}
                alt="Loaded"
                // style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
              <DeleteOutlined
                className={styles.btnClear}
                onClick={handleRemoveImage}
              />
            </div>
          </div>
        ) : null}
        {!isValid && props.value && <p>Invalid image URL. Please try again.</p>}
      </div>
    );
  }
);

export default ImageInput;
