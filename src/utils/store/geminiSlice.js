import { createSlice } from "@reduxjs/toolkit"

const geminiSlice = createSlice({
    name: "gemini",
    initialState: {
        movieSuggestions: null,
        enableSearch: false,
        realMovieSuggestionData: []
    },
    reducers: {
        addMovieSuggestions: (state, action) => {
            state.movieSuggestions = action.payload
        },
        setShowSearch: (state) => {
            state.enableSearch = !state.enableSearch
        },
        setRealMovieSuggestionData: (state, action) => {
            state.realMovieSuggestionData.push(action.payload)
        },
        resetRealMovieSuggestionData: (state) => {
            state.realMovieSuggestionData.length = 0
        }
    }
})

export const { addMovieSuggestions, setShowSearch, setRealMovieSuggestionData,resetRealMovieSuggestionData } = geminiSlice.actions
export default geminiSlice.reducer