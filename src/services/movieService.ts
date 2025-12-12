import type { Movie } from "../types/movie";
import axios from "axios";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`;

interface MoviesResponse {
  results: Movie[];
}

async function fetchMovies(query: string): Promise<Movie[]> {
  const params = {
    query,
  };
  const response = await axios.get<MoviesResponse>("/search/movie", { params });
  return response.data.results;
}

export default fetchMovies;
