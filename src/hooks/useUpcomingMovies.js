import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS, API_UPCOMING_MOVIE_URL } from "../utils/constants";
import { addUpcomingMovies } from "../utils/store/movieSlice";

const useUpcomingMovies = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        fetchNowPlayingMovies();
    }, []);

    const fetchNowPlayingMovies = async () => {
        const data = await fetch(API_UPCOMING_MOVIE_URL, API_OPTIONS);
        const jsonData = await data.json();
        dispatch(addUpcomingMovies(jsonData.results));
    };
}

export default useUpcomingMovies