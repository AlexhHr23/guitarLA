
import { useState, useEffect, useMemo } from 'react';
import { db } from '../data/db';

export const useCart = () => {

    const initialCart =  () => {
        const localCart = localStorage.getItem('cart')
        return localCart ? JSON.parse(localCart) : []
      }
     
      const [data] = useState(db)
      const [cart, setCart] = useState(initialCart)
    
    
      const MAX_ITEMS = 5;
      const MIN_ITEMS = 1; 
    
      useEffect(( ) => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart]) 
    
    
    
      const addTocart = (item) => { 
    
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
        console.log(itemExist);
    
        if (itemExist >= 0) {
          if(cart[itemExist].quantity >= MAX_ITEMS) return
          const updatedCart = [...cart]
          updatedCart[itemExist].quantity++; 
          setCart(updatedCart); 
        } else {
          console.log('NO existe... Agregando ');
          item.quantity = 1 
          setCart(prevCart => [...prevCart, item])
        }   
    
      }
    
      const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
    
      const decreaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
          if(item.id === id && item.quantity > MIN_ITEMS) {
            return {
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item
        }) 
        setCart(updatedCart)
      }
    
      const increaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
          if(item.id === id && item.quantity < MAX_ITEMS) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        }) 
        setCart(updatedCart)
      }
    
      const clearCart = () => {
        setCart([])
      }


      //State devivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])

    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    

    return {
        data,
        cart,
        addTocart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}
