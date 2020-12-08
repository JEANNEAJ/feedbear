import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/session";

export const checkLoggedIn = createAsyncThunk(
  "user/checkLoggedIn",
  async (credentials = null, { getState, requestId, rejectWithValue }) => {
    const { currentRequestId, loading } = getState().user;

    // do nothing if another request is being processed
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    
    try {
      const response = await api.checkLoggedIn();
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
  console.log('pending');
  if (state.loading === "idle") {
    state.loading = "pending";
    state.currentRequestId = action.meta.requestId;
  }
}

const fulfilled = (state, action) => {
  console.log('fulfilled');
  const { requestId } = action.meta;
  
  if (action.type === 'user/checkLoggedIn/fulfilled' && !action.payload.data._id) {
    return;
  }

  if (state.loading === "pending" && state.currentRequestId === requestId) {
    state.loading = "idle";
    state.data = action.payload.data;
    state.isLoggedIn = true;
    state.currentRequestId = undefined;
  }
}

const rejected = (state, action) => {
  console.log('rejected');
  const { requestId } = action.meta;
  if (state.loading === "pending" && state.currentRequestId === requestId) {
    state.loading = "idle";
    state.isLoggedIn = false;
    state.error = action.payload;
    state.currentRequestId = undefined;
  }
}

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
  reducers: {
    clearErrors(state) {
      state.loading = "idle";
      state.currentRequestId = undefined;
      state.error = null;
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

    [checkLoggedIn.pending]: pending,
    [checkLoggedIn.fulfilled]: fulfilled,
    [checkLoggedIn.rejected]: rejected,
  },
});

export const selectUser = (state) => state.user.data;
export const selectError = (state) => state.user.error;

const { actions, reducer } = userSlice;
export const { clearErrors } = actions;
export default reducer;
