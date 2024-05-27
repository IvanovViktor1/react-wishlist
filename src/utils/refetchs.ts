import { useCallback } from "react";
import { useAppSelector } from "../hooks/redux";
import { wishApi } from "../services/WishService";

export const useRefetchWishs = () => {
  const sortWishs = useAppSelector(
    (state) => state.sortAndFilterReducer
  ).sortWishs;

  const [triggerWhishsData] = wishApi.useLazyGetAllWishsInCategoriesQuery();

  const refetchWishs = useCallback(() => {
    triggerWhishsData({
      categories: sortWishs.categories.map((c) => c.id),
      listIds: sortWishs.byListId,
      sortByDate: sortWishs.sortByDate,
      sortByHidden: sortWishs.sortByHidden,
      sortByPrice: sortWishs.sortByPrice,
      ascending: sortWishs.ascending,
    });
  }, [sortWishs, triggerWhishsData]);

  return refetchWishs;
};
