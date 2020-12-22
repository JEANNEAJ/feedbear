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
      console.log('fetchNext');
      const { sortBy, sortDirection } = getState().feedbackList.sort;
      const requests = getState().feedbackList.requests;
      const numResults = 5;
      /** The ID of the last feedback request, empty string if none */
      const last = !requests.length ? '' : requests[requests.length - 1]._id;

      try {
        const { data } = await api.fetchForms(numResults, sortBy, sortDirection, last);
        console.log(data);
        if (!data.length) dispatch(setHasMore(false));
        else {
          // setHasMore(true);
          dispatch(setRequests([...requests, ...data]));
          // setNext(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
);

// export const updateRequests = ()



export default reducer;
