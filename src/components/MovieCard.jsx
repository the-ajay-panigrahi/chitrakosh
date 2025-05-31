import React from "react";
import { TMDB_IMG_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  return (
    <>
      {movie.poster_path && (
        <img
          className="w-52 py-2"
          src={TMDB_IMG_URL + movie.poster_path}
          alt="movies"
        />
      )}
    </>
  );
};
export default MovieCard;
