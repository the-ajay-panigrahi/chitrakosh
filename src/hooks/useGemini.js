import { GoogleGenAI } from "@google/genai";
import { useDispatch } from "react-redux";
import { addMovieSuggestions } from "../utils/store/geminiSlice";

const useGemini = () => {
    const dispatch = useDispatch()
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_APIKEY });
    async function aiMovieSearchSuggestions(searchText) {
        if (!searchText) return
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Give me a JavaScript array of 10 movies that match the category: "${searchText}".Respond ONLY with the array, exactly like this format: ["Movie 1", "Movie 2", ..., "Movie 10"] Do NOT include any markdown formatting, code blocks, or extra text — just the array.`,
        });
        dispatch(addMovieSuggestions(JSON.parse(response.text)))
    }

    return aiMovieSearchSuggestions;

}

export default useGemini


