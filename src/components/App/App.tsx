import { useEffect, useState } from "react";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchMovies("Inception")
      .then((data) => setMovies(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearchSubmit = (query: string) => {
    setLoading(true);
    fetchMovies(query)
      .then((data) => setMovies(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };
  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearchSubmit} />
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}></p>}
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.movieItem}>
            <h2>{movie.title}</h2>
            {movie.release_date && <p>Release: {movie.release_date}</p>}
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
