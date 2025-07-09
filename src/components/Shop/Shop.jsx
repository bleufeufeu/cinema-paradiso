import { Link } from "react-router-dom";
import getMoviesList from "../../api/getMoviesList";
import styles from "./Shop.module.css";
import Loading from "../Loading/Loading.jsx";

export default function Shop() {
  const moviesList = getMoviesList();

  if (moviesList.loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={`content ${styles.shop}`}>
      <h1>Now Playing</h1>
      <div className={styles.moviesGrid}>
        {moviesList.map((movie) => {
          return (
            <div className={styles.card} key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img
                  className={styles.cardImg}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
                <div>{movie.title}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
