import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TCategory, allCategories } from "../../utils/allCategories";

export type TSortLists = {
  sortByDate: boolean; // по дате
  sortByHidden: boolean; // сначала скрытые от других
  value: boolean; //
};

export type TSortWishs = {
  sortByDate: boolean; // по дате
  sortByHidden: boolean; // сначала скрытые от других
  sortByPrice: boolean;
  ascending: boolean; //
  categories: TCategory[];
  byListId: number[];
};

interface SortAndFilterState {
  sortLists: TSortLists;
  sortWishs: TSortWishs;
}

const initialState: SortAndFilterState = {
  sortLists: { sortByDate: true, sortByHidden: false, value: false },
  sortWishs: {
    sortByDate: true,
    sortByHidden: false,
    sortByPrice: false,
    ascending: false,
    categories: allCategories,
    byListId: [],
  },
};

export const sortAndFilterSlice = createSlice({
  name: "sortAndFilter",
  initialState,
  reducers: {
    sortListsByDateAscendingTrue: (state) => {
      state.sortLists = {
        sortByDate: true,
        sortByHidden: false,
        value: true,
      };
    },
    sortListsByDateAscendingFalse: (state) => {
      state.sortLists = {
        sortByDate: true,
        sortByHidden: false,
        value: false,
      };
    },
    sortListsByHiddenAscendingTrue: (state) => {
      state.sortLists = {
        sortByDate: false,
        sortByHidden: true,
        value: true,
      };
    },
    sortListsByHiddenAscendingFalse: (state) => {
      state.sortLists = {
        sortByDate: false,
        sortByHidden: true,
        value: false,
      };
    },

    setInitialSortLists: (state) => {
      state.sortLists = initialState.sortLists;
    },
    // wishs______________________
    filterByListIds: (state, actions: PayloadAction<number[]>) => {
      state.sortWishs.byListId = actions.payload;
    },
    setSortByDate: (state) => {
      state.sortWishs.sortByDate = true;
      state.sortWishs.sortByHidden = false;
    },
    setSortByHidden: (state) => {
      state.sortWishs.sortByDate = false;
      state.sortWishs.sortByHidden = true;
    },
    setSortByPrice: (state) => {
      state.sortWishs.sortByDate = false;
      state.sortWishs.sortByHidden = false;
      state.sortWishs.sortByPrice = true;
    },
    setAscending: (state) => {
      state.sortWishs.ascending = !state.sortWishs.ascending;
    },

    sortWishsByDateAscendingTrue: (state) => {
      state.sortWishs = {
        sortByDate: true,
        sortByHidden: false,
        sortByPrice: false,
        ascending: true,
        categories: state.sortWishs.categories,
        byListId: state.sortWishs.byListId,
      };
    },
    sortWishsByDateAscendingFalse: (state) => {
      state.sortWishs = {
        sortByDate: true,
        sortByHidden: false,
        sortByPrice: false,
        ascending: false,
        categories: state.sortWishs.categories,
        byListId: state.sortWishs.byListId,
      };
    },
    sortWishsByHiddenAscendingTrue: (state) => {
      state.sortWishs = {
        sortByDate: false,
        sortByHidden: true,
        sortByPrice: false,
        ascending: true,
        categories: state.sortWishs.categories,
        byListId: state.sortWishs.byListId,
      };
    },
    sortWishsByHiddenAscendingFalse: (state) => {
      state.sortWishs = {
        sortByDate: false,
        sortByHidden: true,
        sortByPrice: false,
        ascending: false,
        categories: state.sortWishs.categories,
        byListId: state.sortWishs.byListId,
      };
    },
    setFilterByCategories: (state, actions: PayloadAction<TCategory[]>) => {
      state.sortWishs.categories = actions.payload;
    },

    setInitialSortWishs: (state) => {
      state.sortWishs = initialState.sortWishs;
    },
    reversAllFilterCategorySortWishs: (state) => {
      if (state.sortWishs.categories.length === allCategories.length) {
        state.sortWishs.categories = [];
      } else {
        state.sortWishs.categories = allCategories;
      }
    },
  },
});

export const {
  setSortByDate,
  setSortByHidden,
  setSortByPrice,
  setAscending,
  sortListsByDateAscendingTrue,
  sortListsByDateAscendingFalse,
  sortListsByHiddenAscendingTrue,
  sortListsByHiddenAscendingFalse,
  setInitialSortLists,
  sortWishsByDateAscendingTrue,
  sortWishsByDateAscendingFalse,
  sortWishsByHiddenAscendingTrue,
  sortWishsByHiddenAscendingFalse,
  setInitialSortWishs,
  setFilterByCategories,
  reversAllFilterCategorySortWishs,
  filterByListIds,
} = sortAndFilterSlice.actions;

export default sortAndFilterSlice.reducer;
