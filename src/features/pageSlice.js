import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: "login",
    destination: "/",
};

export const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setPageLocation: (state, action) => {
            state.location = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
    },
});

export const { setPageLocation, setDestination } = pageSlice.actions;

export const selectPageLocation = (state) => state.page.location;
export const selectDestination = (state) => state.page.destination;

export default pageSlice.reducer;
