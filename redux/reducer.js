import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    client: { toggleForm: false },
};

export const ReducerSlice = createSlice({
    name: 'fiverr',
    initialState,
    reducers: {
        toggleChangeAction: (state) => {
            state.client.toggleForm = !state.client.toggleForm;
        },
    },
});

export const { toggleChangeAction } = ReducerSlice.actions;

export default ReducerSlice.reducer;
