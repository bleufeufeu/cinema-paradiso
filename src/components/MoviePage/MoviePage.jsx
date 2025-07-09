import { useParams } from "react-router-dom";
import getMovieDetails from "../../api/getMovieDetails";
import { CartContext } from "../../CartContext";
import { useState, useContext } from "react";
import {
  FaCalendar,
  FaClock,
  FaFilm,
  FaMinus,
  FaPlus,
  FaCartShopping,
} from "react-icons/fa6";
import styles from "./MoviePage.module.css";
import Loading from "../Loading/Loading.jsx";

export default function MoviePage() {
  const { addToCart } = useContext(CartContext);
  const { movieId } = useParams();

  const movieDetails = getMovieDetails(movieId, 0);

  const [quantity, setQuantity] = useState(1);
  const increase = () => setQuantity((quantity) => quantity + 1);
  const decrease = () =>
    setQuantity((quantity) => {
      if (quantity > 1) return quantity - 1;
      return quantity;
    });

  if (movieDetails.loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={`${styles.detailsContainer}`} key={movieDetails.id}>
      <div
        className={styles.detailsMain}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop})`,
        }}
      >
        <div className={styles.centre}>
          <div className={styles.detailsMainContent}>
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster}`}
            />
            <div className={styles.detailsMainRight}>
              {(movieDetails.logo !== "" && (
                <img
                  className={styles.logo}
                  src={`https://image.tmdb.org/t/p/w500/${movieDetails.logo}`}
                  alt="Movie Logo"
                />
              )) || <h1>{movieDetails.title}</h1>}
              <div className={styles.tagline}>{movieDetails.tagline}</div>
              <div className={styles.dateTime}>
                <div className={styles.alignIcon}>
                  <FaClock />
                  {movieDetails.runtime} mins
                </div>
                <div className={styles.alignIcon}>
                  <FaCalendar />
                  {movieDetails.releaseDate}
                </div>
              </div>
              <div className={styles.genreList}>
                {movieDetails.genres.map((genre, index) => (
                  <div key={index} className={styles.genre}>
                    {genre}
                  </div>
                ))}
              </div>
              <div>{movieDetails.overview}</div>
              <div className={styles.cartAdder}>
                <div>
                  <button
                    className={`${styles.increment} ${styles.minus}`}
                    type="button"
                    onClick={() => decrease()}
                  >
                    <FaMinus />
                  </button>
                  <input
                    className={styles.quantityInput}
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <button
                    className={`${styles.increment} ${styles.plus}`}
                    type="button"
                    onClick={() => increase()}
                  >
                    <FaPlus />
                  </button>
                </div>
                <button
                  className={`${styles.alignIcon} ${styles.addToCart}`}
                  onClick={() => addToCart(movieDetails, quantity)}
                >
                  <FaCartShopping /> Add to Cart
                </button>
              </div>
              <div className={styles.trailer}>
                <a
                  className={styles.alignIcon}
                  href={`https://www.youtube.com/watch?v=${movieDetails.trailer}`}
                  target="_blank"
                >
                  <FaFilm />
                  Trailer
                </a>
              </div>
              <div className={styles.crew}>
                <div className={styles.creditItem}>
                  <div className={styles.role}>Director</div>
                  <div className={styles.creditList}>
                    {movieDetails.director.join(", ")}
                  </div>
                </div>
                <div className={styles.creditItem}>
                  <div className={styles.role}>Writers</div>
                  <div className={styles.creditList}>
                    {movieDetails.writers.join(", ")}
                  </div>
                </div>
                <div className={styles.creditItem}></div>
              </div>
            </div>
          </div>
          <div>
            <h2>Cast</h2>
            <div className={styles.castContainer}>
              {movieDetails.cast.map((member) => (
                <div key={member.id} className={styles.actorCard}>
                  <img
                    className={styles.actor}
                    src={`https://image.tmdb.org/t/p/w500/${member.image}`}
                  />
                  <div>{member.name}</div>
                  <div className={styles.role}>{member.character}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
