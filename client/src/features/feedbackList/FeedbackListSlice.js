import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as api from "../../api/forms";

export const feedbackListSlice = createSlice({
  name: "feedbackList",
  initialState: {
    requests: [],
    sort: {
      sortBy: 'createdAt', // field to sort by
      sortDirection: -1, // 1 for ascending, -1 for descending
    },
    hasMore: true,
  },
  reducers: {
    setRequests(state, action) {
      state.requests = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setHasMore(state, action) {
      state.hasMore = action.payload;
    }
  },
});

export const selectRequests = (state) => state.feedbackList.requests;
export const selectSort = (state) => state.feedbackList.sort;
export const selectHasMore = (state) => state.feedbackList.hasMore;

const { actions, reducer } = feedbackListSlice;
export const { setRequests, setSort, setHasMore } = actions;


/** fetch the next batch of feedback requests */
export const fetchNext = createAsyncThunk(
    'feedbackList/fetchNext',
    async (_=null, { dispatch, getState }) => {
      const { sortBy, sortDirection } = getState().feedbackList.sort;
      const requests = getState().feedbackList.requests;
      const numResults = 20;
      /** The ID of the last feedback request, empty string if none */
      const last = !requests.length ? '' : requests[requests.length - 1]._id;

      try {
        const { data } = await api.fetchForms(numResults, sortBy, sortDirection, last);
        const newRequests = removeDuplicates(requests, data, numResults);

        if (newRequests.length === requests.length) {
          dispatch(setHasMore(false));
        } else {
          dispatch(setRequests(newRequests));
        }
      } catch (err) {
        console.error(err);
      }
    }
);

/**
 * Remove items in data that already exist in requests
 * @param {*} requests the existing requests array
 * @param {*} data the new data array to check
 * @param {*} numResults the number of results per batch
 */
const removeDuplicates = (requests, data, numResults) => {
  //TODO not performant as array size scales - use numResults to only check last n elements of array for duplicates
  const arrayToCheck = [...requests, ...data];
  const result = arrayToCheck.filter(function({_id}) {
    return !this[_id] && (this[_id] = _id)
  }, {});
  return result;
}

export default reducer;
