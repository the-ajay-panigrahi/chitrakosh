import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import MovieList from "./MovieList";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import AISearchPage from "./AISearchPage";

const Browse = () => {
  const movie = useSelector((store) => store.movie);
  const showSearch = useSelector((store) => store.gemini.enableSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div className="bg-slate-950">
      <Header />
      {showSearch ? (
        <AISearchPage />
      ) : (
        <>
          <MainContainer />
          <MovieList title={"Now Playing"} movies={movie.nowPlayingMovies} />
          <MovieList title={"Top Rated"} movies={movie.topRatedMovies} />
          <MovieList title={"Popular"} movies={movie.popularMovies} />
          <MovieList title={"Upcoming"} movies={movie.upcomingMovies} />
        </>
      )}
    </div>
  );
};

export default Browse;
