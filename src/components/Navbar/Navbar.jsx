import {
  FaHouse,
  FaFilm,
  FaCartShopping,
  FaCircleUser,
  FaMagnifyingGlass,
} from "react-icons/fa6";

import { CartContext } from "../../CartContext";
import { useContext } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/images/cinemalogo.webp";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);

  return (
    <header className={styles.navbar}>
      <img className={styles.logo} src={logo} alt="logo" />
      <div className={styles.rightSide}>
        <Link to="/" className={styles.navItem}>
          Home
        </Link>
        <Link to="/movies" className={styles.navItem}>
          Tickets
        </Link>
      </div>
      <div className={styles.rightSide}>
        <FaMagnifyingGlass />
        <FaCircleUser />
        <Link className={styles.cart} to="/cart">
          <FaCartShopping className={styles.icon} />
          <div className={styles.cartCount}>{cartItems.length}</div>
        </Link>
      </div>
    </header>
  );
}
