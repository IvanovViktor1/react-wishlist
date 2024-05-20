import { CopyOutlined, EditOutlined } from "@ant-design/icons";
import React, { FC, useState } from "react";

interface IBtnCopy {
  onClick: () => void | Promise<void>;
  className?: string;
}

const BtnCopy: FC<IBtnCopy> = ({ className, onClick }) => {
  const [message, setMessage] = useState(false);

  const handleClick = () => {
    Promise.resolve(onClick())
      .then(() => {
        setMessage(true);
        setTimeout(() => {
          setMessage(false);
        }, 500);
      })
      .catch((error) => {
        console.error("Ошибка при выполнении onClick:", error);
      });
  };

  return (
    <div>
      {message ? (
        <p>Скопировано..</p>
      ) : (
        <CopyOutlined className={className} onClick={handleClick} />
      )}
    </div>
  );
};

export default BtnCopy;
