import React, { FC } from "react";
import styles from "./mainBlock.module.scss";
import { List } from "antd";
import WishList from "../wishList";
import { useSelector } from "react-redux";
import { supabase } from "../../..";
import { wishlistApi } from "../../../services/ListService";
import { useAppSelector } from "../../../hooks/redux";
import Loader from "../../loader";

const MainBlock: FC = () => {
  const {
    data: lists,
    isError,
    isLoading,
    refetch,
  } = wishlistApi.useGetAllListsQuery();

  const currentUser = useAppSelector((state) => state.userReducer).session
    ?.user;

  const [
    addList,
    { data, isError: isErrorAddList, isLoading: isLoadingAddList, isSuccess },
  ] = wishlistApi.useAddNewListMutation();

  const addNewList = () => {
    if (currentUser) {
      addList({
        description: "Описание",
        hidden: false,
        name: "Наименование",
        user_uuid: currentUser.id,
      });
      if (!isLoadingAddList && isSuccess) {
        refetch();
        console.log("refetch");
      }
    }
  };

  return (
    <div className={styles.mainBlock}>
      {isLoading ? <Loader /> : null}
      <div className={styles.headMainBlock}>
        <div className={styles.hBtn} onClick={addNewList}>
          Создать
        </div>
        <div className={styles.hBtn}>Последний измененный</div>
        <div className={styles.hBtn}>Листы друзей</div>
      </div>

      <div className={styles.mainBlock}>
        {lists && lists.length ? (
          lists.map((list, index) => <WishList data={list} key={index} />)
        ) : (
          <div className={styles.noSheets}>
            <div> У Вас еще нет листов</div>{" "}
            <div className={styles.pAddList} onClick={addNewList}>
              Хотите создать?
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainBlock;
