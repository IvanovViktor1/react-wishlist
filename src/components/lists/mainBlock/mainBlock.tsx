import React, { FC, useState } from "react";
import styles from "./mainBlock.module.scss";
import { List } from "antd";
import WishList from "../wishList";
import { useSelector } from "react-redux";
import { supabase } from "../../..";
import { wishlistApi } from "../../../services/ListService";
import { useAppSelector } from "../../../hooks/redux";
import Loader from "../../loader";
import { QueryStatus } from "@reduxjs/toolkit/query";
import FilterBlock from "../filter";
import { sessionApi } from "../../../services/SessionService";
import { selectUser } from "../../../store/reducers/authSlice";

const MainBlock: FC = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const currentUser = useSelector(selectUser);

  const [
    addList,
    { data, isError: isErrorAddList, isLoading: isLoadingAddList, status },
  ] = wishlistApi.useAddNewListMutation();

  const {
    data: lists,
    isError,
    isLoading,
    refetch,
  } = wishlistApi.useGetListsByUserIdQuery(currentUser?.id as number);

  const addNewList = () => {
    if (currentUser) {
      addList({
        // description: "Описание",
        // hidden: false,
        // name: "Наименование",
        // user_id: currentUser.id,
        description: "Описание",
        hidden: false,
        name: "Наименование",
        user_id: currentUser.id,
      }).then(() => {
        refetch();
        console.log("refetch");
      });
    }
  };

  if (currentUser && typeof currentUser.id === "string") {
    return (
      <div className={styles.mainBlock}>
        {isLoading ? <Loader /> : null}
        {isLoadingAddList ? <Loader /> : null}
        <div className={styles.headMainBlock}>
          <div
            className={styles.hBtn}
            onClick={() => setOpenFilter(!openFilter)}
          >
            Фильтрация
          </div>
          <div className={styles.hBtn} onClick={addNewList}>
            Создать
          </div>
          <div className={styles.hBtn} onClick={() => refetch()}>
            Обновить
          </div>
        </div>
        <div className={styles.content}>
          <FilterBlock
            open={openFilter}
            onClose={() => setOpenFilter(!openFilter)}
          />

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
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default MainBlock;
