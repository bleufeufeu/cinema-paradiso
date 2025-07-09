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
    </div>
  );
}
