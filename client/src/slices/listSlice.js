import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as projectApi from "../api/projects";

/** reset the list */
export const resetList = createAsyncThunk(
  "list/resetList",
  async (_ = null, { dispatch }) => {
    dispatch(setListItems([]));
    dispatch(setHasMore(true));
  }
);

export const listSlice = createSlice({
  name: "list",
  initialState: {
    listItems: [],
    sort: {
      sortBy: "createdAt", // field to sort by
      sortDirection: -1, // 1 for ascending, -1 for descending
    },
    hasMore: true,
    listType: '',
    searchParams: {
      idType: '',
      id: '',
    },
  },
  reducers: {
    setListItems(state, action) {
      state.listItems = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setHasMore(state, action) {
      state.hasMore = action.payload;
    },
    setListType(state, action) {
      state.listType = action.payload;
    },
    setSearchParams(state, action) {
      state.searchParams = action.payload;
    }
  },
});

export const selectListItems = (state) => state.list.listItems;
export const selectSort = (state) => state.list.sort;
export const selectHasMore = (state) => state.list.hasMore;
export const selectListType = (state) => state.list.listType;
export const selectSearchParams = (state) => state.list.searchParams;

const { actions, reducer } = listSlice;
export const { setListItems, setSort, setHasMore, setListType, setSearchParams } = actions;


/** fetch the next batch of listItems */
export const fetchNext = createAsyncThunk(
  "list/fetchNext",
  async (_ = null, { dispatch, getState }) => {
    const { sortBy, sortDirection } = getState().list.sort;
    const listItems = getState().list.listItems;
    const listType = getState().list.listType;
    const { idType, id } = getState().list.searchParams;
    /** How many results to fetch and display per batch */
    const numResults = 20;
    /** The ID of the last project, empty string if none */
    const last = !listItems.length ? "" : listItems[listItems.length - 1]._id;

    try {
      const { data } = await projectApi.fetchProjects(
        numResults,
        sortBy,
        sortDirection,
        last,
        idType,
        id,
      );
      const newListItems = removeDuplicates(listItems, data, numResults);

      if (newListItems.length === listItems.length) {
        dispatch(setHasMore(false));
      } else {
        dispatch(setListItems(newListItems));
      }

    } catch (err) {
      console.error(err);
    }
  }
);


/**
 * Remove items in data that already exist in projects
 * @param {*} projects the existing projects array
 * @param {*} data the new data array to check
 * @param {*} numResults the number of results per batch
 */
const removeDuplicates = (projects, data, numResults) => {
  //TODO not performant as array size scales - use numResults to only check last n elements of array for duplicates
  const arrayToCheck = [...projects, ...data];
  const result = arrayToCheck.filter(function ({ _id }) {
    return !this[_id] && (this[_id] = _id);
  }, {});
  return result;
};

export default reducer;
