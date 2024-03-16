// store/slices/projectsSlice.ts

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProjects = createAsyncThunk(
  'projects/fetchUserProjects',
  async (userId: string) => {
    const response = await axios.post("/api/project/getUserProject", { id: userId });
    return response.data;
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    userProjects: [],
    status: 'idle',
    error: null
  },
  reducers: {
    // Additional reducers can be added here if needed
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userProjects = action.payload;
      })
      .addCase(fetchUserProjects.rejected, (state, action) => {
        state.status = 'failed';
        // @ts-ignore
        state.error = action.error.message;
      });
  }
});

export default projectsSlice.reducer;
