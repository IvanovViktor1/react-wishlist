import { FC, useState, useRef, useEffect } from "react";
import styles from "./wishlist.module.scss";
import {
  CloseOutlined,
  DownOutlined,
  FilterOutlined,
  PlusOutlined,
  SettingOutlined,
  UpOutlined,
  setTwoToneColor,
} from "@ant-design/icons";
import { TList, wishlistApi } from "../../../services/ListService";
import { wishApi } from "../../../services/WishService";
import { SettingsList } from "../modals/SettingsList";
import { AddingWishForm } from "../modals/AddWish";
import { sessionApi } from "../../../services/SessionService";
import { useAppSelector } from "../../../hooks/redux";
import EyesBtn from "../../customButtons/black/EyesBtn/EyesBtn";
import { formatDate } from "../../../utils/formatDate";
import Wish from "../../wish/Wish";
import CustomRadioSortWishs from "../../filter/radioComponents/RadioSortWishs";
import FilterWishs from "../../filter/filterWishs";

const WishList: FC<{ data: TList }> = ({ data }) => {
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(38, 91, 16, 0.252)"
  );
  const { id, name, description, user_uuid, hidden, date_of_creation } = data;
  setTwoToneColor("green");
  const [open, setOpen] = useState(false);
  const [filterBlockOpen, setFilterBlockOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const addingWishFormRef = useRef<HTMLDivElement>(null);
  const [remove, { isLoading: removeIsLoading }] =
    wishlistApi.useRemoveListMutation();

  const [openAddingWish, setOpenAddingWish] = useState(false);
  const [openEditList, setOpenEditList] = useState(false);
  const currentUserUuid = useAppSelector((state) => state.userReducer).session
    ?.user.id;
  const isOwner = currentUserUuid === user_uuid;
  const { data: userInfo } = sessionApi.useGetUserInfoByUuidQuery(user_uuid);

  const sortLists = useAppSelector(
    (state) => state.sortAndFilterReducer
  ).sortLists;
  const sortWishs = useAppSelector(
    (state) => state.sortAndFilterReducer
  ).sortWishs;

  const { data: wishs, refetch: refetchWishs } =
    wishApi.useGetWishsByListIdQuery({
      id: data.id,
      sortByDate: sortWishs.sortByDate,
      sortByHidden: sortWishs.sortByHidden,
      sortValue: sortWishs.ascending,
      categories: sortWishs.categories.map((c) => c.id),
    });

  const { isLoading: loadingRefetchLists, refetch: refetchLists } =
    wishlistApi.useGetListsByUserIdQuery({
      user_id: userInfo?.id as number,
      sortByDate: sortLists.sortByDate,
      sortByHidden: sortLists.sortByHidden,
      sortValue: sortLists.value,
    });

  useEffect(() => {
    refetchWishs();
  }, [sortWishs.sortByDate, sortWishs.sortByHidden]);

  const handleOpenSettings = () => {
    setOpenEditList(true);
  };

  const handleOpenAddWish = () => {
    setOpenAddingWish(true);
  };

  const handleCloseSettings = async () => {
    setOpenEditList(false);
    await refetchLists();
  };

  const handleCloseAdding = () => {
    setOpenAddingWish(false);
    refetchWishs();
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

  const getRandomColor = (): string => {
    const r = Math.floor(Math.random() * 128) + 30;
    const g = Math.floor(Math.random() * 128);
    return `rgba(${r}, ${g}, 190, 0.5`;
  };

  useEffect(() => {
    setBackgroundColor(getRandomColor());
  }, []);

  return (
    <>
      <AddingWishForm
        open={openAddingWish}
        idList={id}
        ref={addingWishFormRef}
        handleClose={handleCloseAdding}
      />

      <SettingsList
        open={openEditList}
        data={data}
        ref={settingsRef}
        handleClose={handleCloseSettings}
      />
      <div className={styles.list}>
        <div
          className={open ? styles.hList : styles.hListClosed}
          style={{ backgroundColor: backgroundColor }}
        >
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
            <FilterOutlined
              className={styles.btnFilter}
              onClick={() => setFilterBlockOpen(!filterBlockOpen)}
            />
            {isOwner ? (
              <>
                <PlusOutlined
                  className={styles.btnAddWish}
                  onClick={handleOpenAddWish}
                  // onClick={() => setOpenModal(!openModal)}
                />

                <SettingOutlined
                  className={styles.btnSettings}
                  onClick={handleOpenSettings}
                />

                <EyesBtn
                  openEyes={!hidden}
                  isLoading={isLoadingSetVisible || loadingRefetchLists}
                  onClick={setVisibleWishList}
                />

                <CloseOutlined
                  className={
                    removeIsLoading
                      ? styles.btnRemoveListLoader
                      : styles.btnRemoveList
                  }
                  onClick={removeWishList}
                />
              </>
            ) : null}
          </div>
          <div className={styles.firstRow}>
            <div className={styles.description}>
              <p className={styles.name}>{name}</p>
              <p className={styles.nameDescription}>{description}</p>
            </div>
            <p style={{ fontSize: "small", background: "transparent" }}>
              дата создания: {formatDate(date_of_creation)}
            </p>
          </div>

          <div
            className={
              filterBlockOpen ? styles.filterBlockOpen : styles.filterBlockClose
            }
          >
            <CustomRadioSortWishs />
            <FilterWishs />
          </div>
        </div>

        <div className={open ? styles.bList : styles.bListClose}>
          {wishs && wishs.length > 0
            ? wishs.map((wish) => (
                <Wish data={wish} key={wish.id} isOwner={isOwner} />
              ))
            : "ничего не добавлено"}
        </div>
      </div>
    </>
  );
};

export default WishList;
