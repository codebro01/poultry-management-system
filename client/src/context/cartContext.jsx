import { createContext, useCallback, useContext, useState } from "react";

// Create Context
export const CartContext = createContext();

// Create Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  

  // Function to add item to cart
  const addToCart = useCallback((item) => {
    const { itemId } = item;
    setCart((prevCart) => {
      const itemIsExisting = prevCart.find(
        (prevItem) => prevItem.itemId === itemId
      );
      if (itemIsExisting) {
        alert(
          "Item already exist in cart, you can delete or remove it in the checkout page"
        );
        return prevCart;
      } else {
        const updatedCart =  [...prevCart, item];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
    });
  }, []);

  // Function to remove item from cart

 // Function to remove item from cart
 const removeFromCart = useCallback((itemId) => {

  let savedCart = JSON.parse(localStorage.getItem("cart")) || []; // Ensure savedCart is an array

  // Filter out the item
  const updatedCart = savedCart.filter((item) => item.itemId !== itemId);

  // Update State & Local Storage
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));

}, []);

const incrementQuantity = useCallback((itemId) => {
  let savedCart = JSON.parse(localStorage.getItem("cart")) || [];

  const updatedCart = savedCart.map((item) =>
    item.itemId === itemId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
  );

  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}, []);

const decrementQuantity = useCallback((itemId) => {
  let savedCart = JSON.parse(localStorage.getItem("cart")) || [];

  const updatedCart = savedCart
    .map((item) =>
      item.itemId === itemId ? { ...item, quantity: item.quantity - 1 } : item
    )
    .filter((item) => item.quantity > 0); // Remove if quantity is 0

  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}, []);


 

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
