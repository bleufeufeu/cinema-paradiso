import { useState, useEffect, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedItems = localStorage.getItem("cartItems")
        return storedItems ? JSON.parse(storedItems) : [];
    });

    const addToCart = (item) => {
        const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

        if (itemInCart) {
            setCartItems(cartItems.map((cartItem) =>
                cartItem.id === item.id 
                    ? {...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem 
                )
            );
        } else {
            setCartItems([...cartItems, {...item, quantity: 1}])
        }
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const getTotalPrice = () => {
        return Math.round((cartItems.reduce((total, cartItem) => total = total + cartItem.quantity * cartItem.price, 0)) * 100) / 100;
    }

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            clearCart,
            getTotalPrice
        }}>
            {children}
        </CartContext.Provider>
    )
}