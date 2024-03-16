import { configureStore } from '@reduxjs/toolkit';
import countReducer from './slice';
import transactionsReducer from './userDataSlice';
import projectReducer from './projectDataSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    count: countReducer,
    users: userReducer,
    transactions: transactionsReducer,
    projects: projectReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
