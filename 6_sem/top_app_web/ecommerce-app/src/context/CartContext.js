import React, { createContext, useState } from 'react';
import productsData from '../data/products';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  // Criamos um estado para manter o controle do estoque atualizado
  const [productStock, setProductStock] = useState(
    productsData.reduce((acc, product) => {
      acc[product.id] = product.stock;
      return acc;
    }, {})
  );

  const getProductStock = (id) => {
    return productStock[id] || 0;
  };

  const getCurrentCartQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  const addToCart = (product) => {
    const currentQuantity = getCurrentCartQuantity(product.id);
    const availableStock = getProductStock(product.id);
    
    if (currentQuantity >= availableStock) {
      // Estoque insuficiente
      return false;
    }
    
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    
    return true;
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => 
      prevItems.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
          return acc;
        }
        acc.push(item);
        return acc;
      }, [])
    );
  };

  // Atualização para subtrair do estoque na finalização da compra
  const clearCart = (updateStock = false) => {
    if (updateStock) {
      // Atualiza o estoque quando a compra for finalizada
      const newStock = { ...productStock };
      
      cartItems.forEach(item => {
        newStock[item.id] = Math.max(0, newStock[item.id] - item.quantity);
      });
      
      setProductStock(newStock);
    }
    
    setCartItems([]);
  };
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart,
      getTotalPrice,
      getTotalItems,
      getProductStock,
      getCurrentCartQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};