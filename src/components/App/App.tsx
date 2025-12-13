import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieModal from "../MovieModal/MovieModal";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(false);

    try {
      const results = await fetchMovies(query);
      setMovies(results);

      if (results.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-center" />

      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
