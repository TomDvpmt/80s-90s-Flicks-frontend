import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import movieReducer from "../features/movie/movieSlice";
import themeReducer from "../theme/themeSlice";
import configReducer from "../config/configSlice";
import navigationReducer from "../features/navigation/navigationSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        page: navigationReducer,
        movie: movieReducer,
        theme: themeReducer,
        config: configReducer,
    },
    devTools: process.env.NODE_ENV === "development",
});

export default store;
