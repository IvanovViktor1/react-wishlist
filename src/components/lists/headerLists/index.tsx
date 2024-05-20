import { useEffect, useState } from "react";
import styles from "./headerLists.module.scss";
import { sessionApi } from "../../../services/SessionService";
import { useAppSelector } from "../../../hooks/redux";
import { wishlistApi } from "../../../services/ListService";
import CustomLoader from "../../loader/CustomLoader";
import CustomRadioSortLists from "../../filter/radioComponents/RadioSortLists";
import CustomRadioSortWishs from "../../filter/radioComponents/RadioSortWishs";
import FilterWishs from "../../filter/filterWishs";

const HeaderLists = () => {
  const currentUser = useAppSelector((state) => state.userReducer).session
    ?.user;
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

  // useEffect(() => {
  //   refetch();
  // }, [sortLists.sortByDate, sortLists.sortByHidden, sortLists.value]);

  const [
    addList,
    { data, isError: isErrorAddList, isLoading: isLoadingAddList, status },
  ] = wishlistApi.useAddNewListMutation();

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
    <div className={styles.headerLists}>
      {isLoadingAddList ? (
        <CustomLoader text="создание нового списка..." />
      ) : null}
      <div className={styles.filter}>
        <CustomRadioSortLists />
      </div>
      <div className={styles.buttons}>
        <div onClick={addNewList}>Создать</div>
        <div onClick={() => refetch()}>Обновить</div>
      </div>
    </div>
  );
};

export default HeaderLists;
