import { FC, useState, useRef, useEffect } from "react";
import styles from "./listItems.module.scss";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
  SettingOutlined,
  UpOutlined,
  setTwoToneColor,
} from "@ant-design/icons";
import Loader from "../../loader";
import { TList, wishlistApi } from "../../../services/ListService";
import { wishApi } from "../../../services/WishService";
import { SettingsList } from "../SettingsList";
import Wish from "./wish/Wish";
import { AddingWishForm } from "./AddWish";
import { sessionApi } from "../../../services/SessionService";
import { useAppSelector } from "../../../hooks/redux";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/reducers/authSlice";

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

  const currentUserUuid = useSelector(selectUser)?.user_uuid;
  const isOwner = currentUserUuid === user_uuid;
  const { data: userInfo } = sessionApi.useGetUserInfoByUuidQuery(user_uuid);

  const { isLoading: loadingListsByUserId, refetch: refetchLists } =
    wishlistApi.useGetListsByUserIdQuery(userInfo?.id as number);

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

  const [setVisibleList, { isLoading: isLoadingSetVisible }] =
    wishlistApi.useSetVisibleListMutation();

  const setVisibleWishList = async () => {
    await setVisibleList({ ...data, hidden: !data.hidden }).then(() => {
      refetchLists();
    });
  };

  return (
    <div className={styles.list}>
      {loadingListsByUserId ? <Loader /> : null}
      {WishsByListId ? <Loader /> : null}
      {removeIsLoading ? <Loader /> : null}
      {isLoadingSetVisible ? <Loader /> : null}
      <div className={open ? styles.hList : styles.hListClosed}>
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

          {isOwner ? (
            <>
              <PlusOutlined
                className={styles.btnAddWish}
                onClick={handleOpenAddWish}
              />

              <SettingOutlined
                className={styles.btnSettings}
                onClick={handleOpenSettings}
              />

              {hidden ? (
                <EyeInvisibleOutlined
                  className={styles.btnSetVisible}
                  onClick={setVisibleWishList}
                />
              ) : (
                <EyeOutlined
                  className={styles.btnSetVisible}
                  onClick={setVisibleWishList}
                />
              )}
              <CloseOutlined
                className={styles.btnRemoveList}
                onClick={removeWishList}
              />
            </>
          ) : null}
        </div>
      </div>

      {open && (
        <div className={styles.bList}>
          {wishs && wishs.length > 0
            ? wishs
                // .filter((wish) => wish.hidden === isOwner)
                .map((wish, index) => (
                  <Wish data={wish} key={index} isOwner={isOwner} />
                ))
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
