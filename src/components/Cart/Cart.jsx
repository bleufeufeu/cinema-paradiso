import { CartContext } from "../../CartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import styles from "./Cart.module.css";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, getTotalPrice } =
    useContext(CartContext);

  if (cartItems.length == 0) {
    return (
      <div className={`content ${styles.empty}`}>
        <h1>Your cart is empty!</h1>
        <Link to="/movies" className={styles.returnButton}>
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="content">
      <h1>Your Cart</h1>

      <div className={styles.cartPage}>
        <div className={styles.cartContainer}>
          {cartItems.map((item) => {
            return (
              <div className={styles.cartItem} key={item.id}>
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/w500/${item.poster}`}
                />
                <div className={styles.itemDetails}>
                  <div className={`${styles.alignIcon} ${styles.title}`}>
                    {item.title}{" "}
                    <FaTrash
                      className={styles.icon}
                      onClick={() => removeFromCart(item)}
                    />
                  </div>
                  <div>Price: ${item.price}</div>
                  <div>Quantity: {item.quantity} tickets</div>
                  <div>
                    Total: ${Math.round(item.quantity * item.price * 100) / 100}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.summary}>
          <div className={styles.title}>Order Summary</div>

          <div className={styles.divider}></div>

          <div className={styles.price}>
            <div>Subtotal</div>
            <div>${getTotalPrice()}</div>
          </div>
          <div className={styles.price}>
            <div>HST (13%)</div>
            <div>${Math.round(getTotalPrice() * 0.13 * 100) / 100}</div>
          </div>

          <div className={styles.price}>
            <div>Total</div>
            <div>
              $
              {Math.round(
                (getTotalPrice() +
                  Math.round(getTotalPrice() * 0.13 * 100) / 100) *
                  100,
              ) / 100}
            </div>
          </div>

          <div className={styles.divider}></div>

          <button
            className={`${styles.button} ${styles.confirm}`}
            onClick={() => clearCart()}
          >
            Confirm Order
          </button>
          <button
            className={`${styles.button} ${styles.clear}`}
            onClick={() => clearCart()}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
