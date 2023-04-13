import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    type: "",
};

export const pageSetType = createAction("page/setType");

const pageReducer = createReducer(initialState, (builder) => {
    return builder.addCase(pageSetType, (draft, action) => {
        draft.type = action.payload;
        return;
    });
});

export default pageReducer;
