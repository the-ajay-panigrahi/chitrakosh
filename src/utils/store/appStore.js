import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js"
import movieReducer from "./movieSlice.js"
import geminiReducer from "./geminiSlice.js"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
        gemini: geminiReducer
    }
})

export default appStore