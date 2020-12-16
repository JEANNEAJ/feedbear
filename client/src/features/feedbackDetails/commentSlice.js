import { createSlice } from "@reduxjs/toolkit";

import * as commentApi from "../../api/comments";

export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
  },
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    }
  },
});

export const selectComments = (state) => state.comments.comments;

const { actions, reducer } = commentSlice;
export const { setComments } = actions;

export const getComments = feedbackID => async dispatch => {
  try {
    const { data } = await commentApi.fetchComments(feedbackID);
    dispatch(setComments(data.length ? data[0].comments : []));
  } catch (err) {
    console.error(err);
  }
};

export default reducer;