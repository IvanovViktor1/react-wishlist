import FilterBlock from "../filter";
import { Layout } from "../layout";
import React, { FC, useState, useEffect } from "react";
import styles from "./lists.module.scss";
import { useAppSelector } from "../../hooks/redux";
import { wishlistApi } from "../../services/ListService";
import { sessionApi } from "../../services/SessionService";
import CustomLoader from "../loader/CustomLoader";
import WishList from "./wishList";
import HeaderLists from "./headerLists";
const Lists: FC = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const currentUser = useAppSelector((state) => state.userReducer).session
    ?.user;

  const [
    addList,
    { data, isError: isErrorAddList, isLoading: isLoadingAddList, status },
  ] = wishlistApi.useAddNewListMutation();

  const { data: userInfo } = sessionApi.useGetUserInfoByUuidQuery(
    currentUser?.id as string
  );

  const sortLists = useAppSelector(
    (state) => state.sortAndFilterReducer
  ).sortLists;

  const {
    data: lists,
    isError,
    isLoading: isLoadingGetLists,
    refetch,
  } = wishlistApi.useGetListsByUserIdQuery({
    user_id: userInfo?.id as number,
    sortByDate: sortLists.sortByDate,
    sortByHidden: sortLists.sortByHidden,
    sortValue: sortLists.value,
  });

  const addNewList = () => {
    if (currentUser && userInfo) {
      addList({
        description: "Описание",
        hidden: false,
        name: "Наименование",
        user_id: userInfo.id,
      }).then(() => {
        refetch();
        console.log("refetch");
      });
    }
  };

  return (
    <Layout>
      <HeaderLists />
      <FilterBlock
        open={openFilter}
        onClose={() => setOpenFilter(!openFilter)}
      />

      <div className={styles.mainLists}>
        {isLoadingGetLists ? (
          <CustomLoader text="загрузка списков..." />
        ) : (
          <div className={styles.mainBlock}>
            {lists && lists.length ? (
              lists.map((list, index) => <WishList data={list} key={list.id} />)
            ) : (
              <div className={styles.noSheets}>
                <div> У Вас еще нет листов</div>
                <div className={styles.pAddList} onClick={addNewList}>
                  Хотите создать?
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Lists;
