import React, { FC, useState, useRef } from "react";
import styles from "./listItems.module.scss";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
  SettingOutlined,
  setTwoToneColor,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import Loader from "../../loader";
import { TList } from "../../../services/ListService";
import { wishApi } from "../../../services/WishService";
import { SettingsList } from "../settingsList";
import Wish from "./Wish";

const WishList: FC<{ data: TList }> = ({ data }) => {
  const { id: id_list, name, description, user_uuid, hidden } = data;
  setTwoToneColor("green");
  const [open, setOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const {
    data: wishs,
    isError,
    isLoading,
  } = wishApi.useGetWishsByListIdQuery(data.id);

  const handleOpenSettings = () => {
    // setOpenSettings(true);
    if (settingsRef.current) {
      settingsRef.current.style.visibility = "visible";
    }
  };

  const handleCloseSettings = () => {
    if (settingsRef.current) {
      settingsRef.current.style.visibility = "hidden";
    }
  };

  const openWishList = () => {
    setOpen(true);
  };

  return (
    <div className={styles.list}>
      <div className={styles.options}>
        <div className={styles.btnAddWish}>
          <PlusCircleTwoTone
            className={styles.btnAddWish}
            // onClick={handleAddWish}
          />
        </div>

        <div>
          <SettingOutlined
            className={styles.btnSettings}
            onClick={handleOpenSettings}
          />
          <DeleteOutlined className={styles.btnDelete} />
        </div>
      </div>

      {!open ? (
        <div className={styles.hList}>
          <div>{name}</div>
          <div>{description}</div>
        </div>
      ) : (
        <div className={styles.bList}>
          <div className={styles.hList}>
            <div>{name}</div>
            <div>{description}</div>
          </div>
          {wishs && wishs.length > 0
            ? wishs.map((wish, index) => <Wish data={wish} key={index} />)
            : "ничего не добавлено"}
        </div>
      )}
      {!open ? (
        <CaretDownOutlined onClick={openWishList} />
      ) : (
        <CaretUpOutlined onClick={() => setOpen(false)} />
      )}

      <SettingsList
        data={data}
        ref={settingsRef}
        handleClose={handleCloseSettings}
      />
    </div>
  );
};

export default WishList;
