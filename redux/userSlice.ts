// In slices/userSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserDetails {
  // Define your user details interface here
}

interface UserState {
  userDetails: UserDetails[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  userDetails: [],
  status: 'idle',
  error: null,
};

export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async () => {
    const response = await axios.get("/api/authentication/getAllUserDetails");
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});

export default userSlice.reducer;
