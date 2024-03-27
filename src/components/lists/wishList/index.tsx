import { FC, useState, useRef, useEffect } from "react";
import styles from "./listItems.module.scss";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
  SettingOutlined,
  UpOutlined,
  setTwoToneColor,
} from "@ant-design/icons";
import Loader from "../../loader";
import { TList, wishlistApi } from "../../../services/ListService";
import { wishApi } from "../../../services/WishService";
import { SettingsList } from "../settingsList";
import Wish from "./Wish";
import { AddingWishForm } from "./addingWish";

const WishList: FC<{ data: TList }> = ({ data }) => {
  const { id, name, description, user_uuid, hidden } = data;
  setTwoToneColor("green");
  const [open, setOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const addingWishFormRef = useRef<HTMLDivElement>(null);
  const [remove, { isLoading: removeIsLoading }] =
    wishlistApi.useRemoveListMutation();

  const {
    data: wishs,
    isLoading: WishsByListId,
    refetch,
  } = wishApi.useGetWishsByListIdQuery(data.id);

  const { isLoading: loadingListsByUserId, refetch: refetchLists } =
    wishlistApi.useGetListsByUserIdQuery(user_uuid);

  const handleOpenSettings = () => {
    if (settingsRef.current) {
      settingsRef.current.style.visibility = "visible";
    }
  };

  const handleOpenAddWish = () => {
    if (addingWishFormRef.current) {
      addingWishFormRef.current.style.visibility = "visible";
    }
  };

  const handleCloseSettings = async () => {
    if (settingsRef.current) {
      settingsRef.current.style.visibility = "hidden";
      await refetchLists();
    }
  };

  const handleCloseAdding = () => {
    if (addingWishFormRef.current) {
      addingWishFormRef.current.style.visibility = "hidden";
    }
    refetch();
  };

  const removeWishList = () => {
    remove(id).then(() => {
      refetchLists();
    });
  };

  return (
    <div className={styles.list}>
      {loadingListsByUserId ? <Loader /> : null}
      {WishsByListId ? <Loader /> : null}
      {removeIsLoading ? <Loader /> : null}
      <div
        className={styles.hList}
        style={{ borderRadius: open ? "10px 10px 0 0" : "10px" }}
      >
        <div className={styles.description}>
          <h3>{name}</h3>
          <h4>{description}</h4>
        </div>
        <div className={styles.options}>
          {open ? (
            <UpOutlined
              className={styles.btnUpNDown}
              onClick={() => setOpen(!open)}
            />
          ) : (
            <DownOutlined
              className={styles.btnUpNDown}
              onClick={() => setOpen(!open)}
            />
          )}

          <PlusOutlined
            className={styles.btnAddWish}
            onClick={handleOpenAddWish}
          />

          <SettingOutlined
            className={styles.btnSettings}
            onClick={handleOpenSettings}
          />

          <CloseOutlined
            className={styles.removeList}
            onClick={removeWishList}
          />
        </div>
      </div>

      {open && (
        <div className={styles.bList}>
          {wishs && wishs.length > 0
            ? wishs.map((wish, index) => <Wish data={wish} key={index} />)
            : "ничего не добавлено"}
        </div>
      )}

      <SettingsList
        data={data}
        ref={settingsRef}
        handleClose={handleCloseSettings}
      />
      <AddingWishForm
        idList={id}
        ref={addingWishFormRef}
        handleClose={handleCloseAdding}
      />
    </div>
  );
};

export default WishList;
