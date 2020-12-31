import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as projectApi from "../api/projects";

export const projectListSlice = createSlice({
  name: "projectList",
  initialState: {
    projects: [],
    sort: {
      sortBy: "createdAt", // field to sort by
      sortDirection: -1, // 1 for ascending, -1 for descending
    },
    hasMore: true,
  },
  reducers: {
    setProjects(state, action) {
      state.projects = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setHasMore(state, action) {
      state.hasMore = action.payload;
    },
  },
});

export const selectProjects = (state) => state.projectList.projects;
export const selectSort = (state) => state.projectList.sort;
export const selectHasMore = (state) => state.projectList.hasMore;

const { actions, reducer } = projectListSlice;
export const { setProjects, setSort, setHasMore } = actions;

/** fetch the next batch of projects */
export const fetchNext = createAsyncThunk(
  "projectList/fetchNext",
  async (_ = null, { dispatch, getState }) => {
    const { sortBy, sortDirection } = getState().projectList.sort;
    const projects = getState().projectList.projects;
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
