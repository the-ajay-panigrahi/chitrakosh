import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return;
  return (
    <div className="mx-auto py-5 max-w-7xl">
      <h2 className="text-2xl text-white font-bold py-3 pb-5">{title}</h2>
      <div className="flex overflow-x-scroll gap-5">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default MovieList;
