import React, { FC, useState } from "react";
import { TWish, wishApi } from "../../../services/WishService";
import styles from "./desc.module.scss";
import {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { ModalEditWish } from "./modalEditWish";
import { TList } from "../../../services/ListService";
interface IOption {
  value: TWish;
  lists: TList[];
  reloadWishs: () => void;
}

const Options: FC<IOption> = ({ value, lists, reloadWishs }) => {
  // const [editingOpen, setEditingOpen] = useState(false);
  const [removeWish] = wishApi.useRemoveWishMutation();

  const handleRemove = () => {
    removeWish(value.id).then(() => {
      reloadWishs();
    });
  };

  // const handleCloseEditing = () => {
  //   reloadWishs();
  //   setEditingOpen(false);
  // };

  return (
    <>
      {/* <ModalEditWish
        wish={value}
        open={editingOpen}
        lists={lists}
        handleClose={handleCloseEditing}
      /> */}
      <div className={styles.options}>
        {/* <EditOutlined
          className={styles.btnEdit}
          onClick={() => setEditingOpen(true)}
        /> */}
        {value.hidden ? (
          <EyeOutlined className={styles.btnEye} />
        ) : (
          <EyeInvisibleOutlined className={styles.btnEye} />
        )}
        <DeleteOutlined className={styles.btnDelete} onClick={handleRemove} />
      </div>
    </>
  );
};

export default Options;
