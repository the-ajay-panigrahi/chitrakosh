import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS, API_TOP_RATED_MOVIE_URL } from "../utils/constants";
import { addTopRatedMovies } from "../utils/store/movieSlice";

const useTopRatedMovies = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        fetchNowPlayingMovies();
    }, []);

    const fetchNowPlayingMovies = async () => {
        const data = await fetch(API_TOP_RATED_MOVIE_URL, API_OPTIONS);
        const jsonData = await data.json();
        dispatch(addTopRatedMovies(jsonData.results));
    };
}

export default useTopRatedMovies