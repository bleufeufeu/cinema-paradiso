import {
  FaHouse,
  FaFilm,
  FaCartShopping,
  FaCircleUser,
  FaMagnifyingGlass
} from "react-icons/fa6";

import { CartContext } from "../../CartContext";
import { useContext } from "react";
import styles from "./Navbar.module.css"
import logo from "../../assets/images/cinemalogo.webp"
import { Link } from "react-router-dom";

export default function Navbar () {
    return (
        <header className={styles.navbar}>
            <img className={styles.logo} src={logo} alt="logo" />
            <div className={styles.rightSide}>
                <Link to="/" className={styles.navItem}>Home</Link>
                <Link to="/movies" className={styles.navItem}>Tickets</Link>
                <Link to="/concessions" className={styles.navItem}>Concessions</Link>
            </div>
            <div className={styles.rightSide}>
                <FaMagnifyingGlass />
                <FaCircleUser />
                <Link to="/cart"><FaCartShopping /></Link>
            </div>
        </header>
    )
}