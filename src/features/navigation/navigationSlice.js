import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: "login",
    destination: "/",
};

export const navigationSlice = createSlice({
    name: "navigation",
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

export const { setPageLocation, setDestination } = navigationSlice.actions;

export const selectPageLocation = (state) => state.page.location;
export const selectDestination = (state) => state.page.destination;

export default navigationSlice.reducer;
