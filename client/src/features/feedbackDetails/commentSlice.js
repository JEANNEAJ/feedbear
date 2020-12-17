import { createSlice } from "@reduxjs/toolkit";

import * as commentApi from "../../api/comments";

export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    editing: '', // the ID of the comment being edited
  },
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    },
    setEditing(state, action) {
      if (state.editing !== action.payload) {
        state.editing = action.payload;
      } else {
        state.editing = '';
      }
    }
  },
});

export const selectComments = (state) => state.comments.comments;
export const selectEditing = (state) => state.comments.editing;

const { actions, reducer } = commentSlice;
export const { setComments, setEditing } = actions;

export const getComments = feedbackID => async dispatch => {
  try {
    const { data } = await commentApi.fetchComments(feedbackID);
    dispatch(setComments(data.length ? data[0].comments : []));
  } catch (err) {
    console.error(err);
  }
};

export default reducer;