import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import home from "../../assets/images/home.jpg";

export default function Home() {
  return (
    <div className={`content ${styles.container}`}>
      <img className={styles.img} src={home} />
      <h1>Welcome to the World's Greatest Cinema!</h1>
      <Link to="movies" className={styles.button}>
        See What's Playing
      </Link>

      <p>Powered by <a className={styles.link} href="https://www.themoviedb.org/" target="_blank">TMDB</a> and <a className={styles.link} href="https://css-loaders.com/" target="_blank">CSS Loaders</a></p>
    </div>
  );
}
