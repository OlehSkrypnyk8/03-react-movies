import css from "./MovieModal.module.css";
import { useEffect } from "react";
import type { Movie } from "../../types/movie";
import { createPortal } from "react-dom";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

function MovieModal({ onClose }: MovieModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src="https://image.tmdb.org/t/p/original/backdrop_path"
          alt="movie_title"
          className={css.image}
        />
        <div className={css.content}>
          <h2>movie_title</h2>
          <p>movie_overview</p>
          <p>
            <strong>Release Date:</strong> movie_release_date
          </p>
          <p>
            <strong>Rating:</strong> movie_vote_average/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
export default MovieModal;
