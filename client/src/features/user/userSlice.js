import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/session";

export const checkForUserSession = createAsyncThunk(
  "user/checkForUserSession",
  async (_ = null, { getState, requestId, rejectWithValue }) => {
    const { currentRequestId, loading } = getState().user;

    // do nothing if another request is being processed
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }

    try {
      const response = await api.getUserSession();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (credentials, { getState, requestId, rejectWithValue }) => {
    const { currentRequestId, loading } = getState().user;

    // do nothing if another request is being processed
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }

    try {
      const response = await api.login(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (credentials, { getState, requestId, rejectWithValue }) => {
    const { currentRequestId, loading } = getState().user;

    // do nothing if another request is being processed
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }

    try {
      const response = await api.signup(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const pending = (state, action) => {
  console.log("pending");
  if (state.loading === "idle") {
    state.loading = "pending";
    state.currentRequestId = action.meta.requestId;
  }
};

const fulfilled = (state, action) => {
  console.log("fulfilled");
  const { requestId } = action.meta;

  if (state.loading === "pending" && state.currentRequestId === requestId) {
    state.loading = "idle";
    state.currentRequestId = undefined;
    
    if (action.type === 'user/checkForUserSession/fulfilled') {
      state.userSessionChecked = true;
      
      if (action.payload.data === undefined) {
        // short circuit return if there was no user data in the api call response
        return;
      }
    }

    state.data = action.payload.data;
  }
};

const rejected = (state, action) => {
  console.log("rejected");
  const { requestId } = action.meta;
  if (state.loading === "pending" && state.currentRequestId === requestId) {
    state.loading = "idle";
    state.error = action.payload;
    state.currentRequestId = undefined;
  }
};

const nullUser = {
  _id: undefined,
  email: undefined,
  name: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: nullUser,
    loading: "idle",
    userSessionChecked: false,
    currentRequestId: undefined,
    error: null,
  },
  reducers: {
    clearErrors(state) {
      state.loading = "idle";
      state.currentRequestId = undefined;
      state.error = null;
    },
    logout(state) {
      state.data = nullUser;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [login.pending]: pending,
    [login.fulfilled]: fulfilled,
    [login.rejected]: rejected,

    [signup.pending]: pending,
    [signup.fulfilled]: fulfilled,
    [signup.rejected]: rejected,

    [checkForUserSession.pending]: pending,
    [checkForUserSession.fulfilled]: fulfilled,
    [checkForUserSession.rejected]: rejected,
  },
});

export const selectUser = (state) => state.user.data;
export const selectError = (state) => state.user.error;

const { actions, reducer } = userSlice;
export const { clearErrors, logout } = actions;
export default reducer;
