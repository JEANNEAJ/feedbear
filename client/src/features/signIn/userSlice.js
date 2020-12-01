// TODO: refactor -> userSlice in the SignIn folder? not sure how to structure this
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/session';

export const login = createAsyncThunk(
    'user/login',
    async (credentials, { getState, requestId}) => {
        const { currentRequestId, loading } = getState().user;

        // do nothing if another request is being processed
        if (loading !== 'pending' || requestId !== currentRequestId) {
            return;
        }

        const response = await api.login(credentials);
        return response.data;
    }
)

export const userSlice = createSlice({
	name: 'user',
	initialState: {
        data: {
            _id: undefined,
            email: undefined
        },
        loading: 'idle',
        currentRequestId: undefined,
        error: null
    },
	reducers: { },
    extraReducers: {
        [login.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
                state.currentRequestId = action.meta.requestId;
            }
        },

        [login.fulfilled]: (state, action) => {
            const { requestId } = action.meta;
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle';
                state.data = action.payload.data;
                state.currentRequestId = undefined;
            }
        },

        [login.rejected]: (state, action) => {
            const { requestId } = action.meta;
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle';
                state.error = action.error;
                state.currentRequestId = undefined;
            }
        }
    }
});

export const selectUser = state => state.user.data;

export default userSlice.reducer;