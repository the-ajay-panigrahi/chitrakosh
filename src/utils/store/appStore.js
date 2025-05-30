import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js"
import movieReducer from "./movieSlice.js"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer
    }
})

export default appStore