// TODO: refactor -> userSlice in the SignIn folder? not sure how to structure this
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/session";

export const login = createAsyncThunk(
  "user/login",
  async (credentials, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().user;

    // do nothing if another request is being processed
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }

    const response = await api.login(credentials);
    return response.data;
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (credentials, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().user;

    // do nothing if another request is being processed
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }

    const res = await api.signup(credentials);
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      _id: undefined,
      email: undefined,
      name: undefined,
    },
    loading: "idle",
    isLoggedIn: false,
    currentRequestId: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },

    [login.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.data = action.payload.data;
        state.isLoggedIn = true;
        state.currentRequestId = undefined;
      }
    },

    [login.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.isLoggedIn = false;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },

    [signup.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },

    [signup.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.data = action.payload.data;
        state.isLoggedIn = true;
        state.currentRequestId = undefined;
      }
    },

    [signup.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.isLoggedIn = false;
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const selectUser = (state) => state.user.data;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
