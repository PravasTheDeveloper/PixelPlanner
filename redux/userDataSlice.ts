// store/slices/transactionsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Transaction {
    
}

interface TransactionsState {
    transactions: Transaction[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TransactionsState = {
    transactions: [],
    status: 'idle',
    error: null
};

export const getAllTransactions = createAsyncThunk<
    Transaction[],
    string, // email
    { rejectValue: string }
>('transactions/getAllTransactions', async (email, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/transaction/getAllTransactions", { email });
        return response.data;
    } catch (error) {
        // @ts-ignore
        return rejectWithValue(error.response.data);
    }
});

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        // Additional reducers can be added here if needed
    },
    extraReducers: builder => {
        builder
            .addCase(getAllTransactions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllTransactions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.transactions = action.payload;
            })
            .addCase(getAllTransactions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export default transactionsSlice.reducer;
