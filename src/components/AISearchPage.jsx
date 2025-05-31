import React, { useState } from "react";
import useGemini from "../hooks/useGemini";
import { useDispatch, useSelector } from "react-redux";
import { API_INDIVIDUAL_MOVIE_URL, API_OPTIONS } from "../utils/constants";
import {
  resetRealMovieSuggestionData,
  setRealMovieSuggestionData,
} from "../utils/store/geminiSlice";
import MovieList from "./MovieList";
const AISearchPage = () => {
  const movieSuggestions = useSelector(
    (store) => store.gemini.movieSuggestions
  );
  const realMovieList = useSelector(
    (store) => store.gemini.realMovieSuggestionData
  );
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const aiMovieSearch = useGemini();

  const handleAISearch = () => {
    dispatch(resetRealMovieSuggestionData());
    aiMovieSearch(searchText);
    movieSuggestions.map((movie) => {
      fetchMovies(movie);
    });
  };

  const fetchMovies = async (movie) => {
    const data = await fetch(
      API_INDIVIDUAL_MOVIE_URL + movie + "?&page=1",
      API_OPTIONS
    );
    const jsonData = await data.json();
    dispatch(
      setRealMovieSuggestionData({
        [movie]: jsonData.results,
      })
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col pt-32 gap-10">
      <div className="bg-slate-950 text-white relative z-50 p-3 rounded-lg w-1/2">
        <input
          className="text-black placeholder:text-black p-4 bg-white rounded-l-4xl w-9/12"
          type="text"
          placeholder="Ask AI to suggest movies (e.g. Indian retro comedy)"
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
        />
        <button
          className="bg-red-600 p-4 rounded-r-4xl w-3/12 cursor-pointer transition-colors duration-150 font-medium hover:bg-red-700"
          onClick={handleAISearch}
        >
          Search
        </button>
      </div>
      {movieSuggestions && (
        <div className=" relative">
          {realMovieList.map((individualMovie) => {
            return (
              <MovieList
                title={Object.keys(individualMovie)[0]}
                movies={individualMovie[Object.keys(individualMovie)[0]]}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AISearchPage;
