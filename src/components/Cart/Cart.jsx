import { CartContext } from "../../CartContext";
import { useContext } from "react";

export default function Cart() {
    const { cartItems, clearCart, getTotalPrice } = useContext(CartContext);

    return (
        <div>
            {cartItems.map((item) => {
                return (
                    <div key={item.id}>
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster}`} />
                        <h3>{item.title}</h3>
                        <p>Tickets {item.quantity}</p>
                        <p>${Math.round((item.quantity * item.price) * 100) / 100}</p>
                    </div>
                )
            })}
            <div>Total: ${getTotalPrice()}</div>
            <button onClick={() => clearCart()}>Confirm Order</button>
            <button onClick={() => clearCart()}>Clear Cart</button>
        </div>
    )
}
