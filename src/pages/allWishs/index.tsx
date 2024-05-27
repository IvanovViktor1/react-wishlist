import { FC, useCallback, useEffect, useState } from "react";
import { TWish, wishApi } from "../../services/WishService";
import { useAppSelector } from "../../hooks/redux";
import { sessionApi } from "../../services/SessionService";
import { wishlistApi } from "../../services/ListService";
import { ModalAddWish } from "./wish/modalAddWish";
import SearchBlock from "./searchBlock";
import DescriptionTextForm from "./wish/descriptionTextForm";
import styles from "./lists.module.scss";
import { Layout } from "../../components/layout";

const AllWishs: FC = () => {
  const [addingOpen, setAddingOpen] = useState(false);
  const [resWishs, setResWishs] = useState<TWish[]>([]);
  const sortLists = useAppSelector(
    (state) => state.sortAndFilterReducer
  ).sortLists;
  const sortWishs = useAppSelector(
    (state) => state.sortAndFilterReducer
  ).sortWishs;

  // const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [
    trigerUserInfo,
    { data: userData, isFetching: firstFetching, isLoading: firstLoading },
  ] = sessionApi.useLazyGetCurrentUserInfoQuery();

  const [
    trigerListsData,
    { data: listsData, isFetching: secondFetching, isLoading: secondLoading },
  ] = wishlistApi.useLazyGetListsByUserIdQuery();

  const [
    trigerWhishsData,
    {
      data: wishsData,
      isFetching: thirdFetching,
      isLoading: thirdLoading,
      isUninitialized,
    },
  ] = wishApi.useLazyGetAllWishsInCategoriesQuery();

  useEffect(() => {
    trigerUserInfo()
      .unwrap()
      .then((resultFirst) => {
        // console.log("Первые данные загружены", resultFirst);
        if (resultFirst) {
          return trigerListsData({
            user_id: resultFirst.user.id as number,
            sortByDate: sortLists.sortByDate,
            sortByHidden: sortLists.sortByHidden,
            sortValue: sortLists.value,
          }).unwrap();
        }
      })
      .then((resultSecond) => {
        // console.log("Вторые данные загружены", resultSecond);
        if (resultSecond) {
          return trigerWhishsData({
            categories: sortWishs.categories.map((c) => c.id),
            listIds: sortWishs.byListId,
            sortByDate: sortWishs.sortByDate,
            sortByHidden: sortWishs.sortByHidden,
            sortByPrice: sortWishs.sortByPrice,
            ascending: sortWishs.ascending,
          }).unwrap();
        }
      })
      .then((resultThird) => {
        // console.log("Третьи данные загружены", resultThird);
      })
      .catch((err) => console.error(err));
  }, [trigerUserInfo, trigerListsData, trigerWhishsData, sortWishs]);

  const refetchWishsData = () => {
    if (listsData) {
      trigerWhishsData({
        categories: sortWishs.categories.map((c) => c.id),
        listIds: sortWishs.byListId,
        sortByDate: sortWishs.sortByDate,
        sortByPrice: sortWishs.sortByPrice,
        sortByHidden: sortWishs.sortByHidden,
        ascending: sortWishs.ascending,
      })
        .unwrap()
        .then((resultThird) => {
          console.log("Данные желаний перезагружены", resultThird);
        })
        .catch((err) =>
          console.error("Ошибка при перезагрузке данных желаний", err)
        );
    }
  };

  const handleSearchResults = useCallback((results: TWish[]) => {
    setResWishs(results);
  }, []);

  const [openDescription, setOpenDescription] = useState(false);
  const handleChecked = () => {
    setOpenDescription(!openDescription);
  };

  const handleOpenAddingWish = () => {
    setAddingOpen(true);
  };

  const handleCloseAddingWish = () => {
    setAddingOpen(false);
    refetchWishsData();
  };
  return (
    <>
      {listsData && (
        <ModalAddWish
          lists={listsData}
          open={addingOpen}
          handleClose={handleCloseAddingWish}
        />
      )}

      <Layout>
        <div className={styles.containerLists}>
          {!isUninitialized && wishsData && listsData ? (
            <SearchBlock
              wishs={wishsData}
              lists={listsData}
              onResults={handleSearchResults}
              checked={openDescription}
              onChecked={handleChecked}
              onAddWish={handleOpenAddingWish}
            />
          ) : null}

          {firstFetching ||
            secondFetching ||
            (thirdFetching && <p style={{ position: "absolute" }}>Загрузка</p>)}
          {firstLoading ||
            secondLoading ||
            (thirdLoading && <p style={{ position: "absolute" }}>loading</p>)}
          <div className={styles.listsBlock}>
            {!isUninitialized && wishsData && listsData
              ? resWishs?.map((wish) => (
                  // <WishDescription
                  //   lists={listsData}
                  //   presentationMethod={
                  //     openDescription ? "withDescription" : "onlyName"
                  //   }
                  //   key={wish.id}
                  //   value={wish}
                  //   reloadWishs={refetchWishsData}
                  // />
                  <DescriptionTextForm
                    key={wish.id}
                    wish={wish}
                    lists={listsData}
                  />
                ))
              : null}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AllWishs;