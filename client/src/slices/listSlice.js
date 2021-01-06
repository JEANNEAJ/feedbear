import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as projectApi from "../api/projects";

export const listSlice = createSlice({
  name: "list",
  initialState: {
    listItems: [],
    sort: {
      sortBy: "createdAt", // field to sort by
      sortDirection: -1, // 1 for ascending, -1 for descending
    },
    hasMore: true,
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
  },
});

export const selectListItems = (state) => state.list.projects;
export const selectSort = (state) => state.list.sort;
export const selectHasMore = (state) => state.list.hasMore;

const { actions, reducer } = listSlice;
export const { setListItems, setSort, setHasMore } = actions;

/** fetch the next batch of projects */
export const fetchNext = createAsyncThunk(
  "projectList/fetchNext",
  async (_ = null, { dispatch, getState }) => {
    const { sortBy, sortDirection } = getState().projectList.sort;
    const projects = getState().projectList.projects;
    /** How many results to fetch and display per batch */
    const numResults = 20;
    /** The ID of the last project, empty string if none */
    const last = !projects.length ? "" : projects[projects.length - 1]._id;

    try {
      const { data } = await projectApi.fetchProjects(
        numResults,
        sortBy,
        sortDirection,
        last
      );
      const newProjects = removeDuplicates(projects, data, numResults);

      if (newProjects.length === projects.length) {
        dispatch(setHasMore(false));
      } else {
        dispatch(setProjects(newProjects));
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
