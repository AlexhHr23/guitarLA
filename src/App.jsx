import { useState, useEffect } from 'react';
import { Header } from './components/Headers.jsx';
import { Guitar } from './components/Guitra.jsx';
import { db } from './data/db.js';
import './App.css'

function App() {



  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])


  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1; 



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



  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity} 
        increaseQuantity={increaseQuantity}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">z
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addTocart}
            />
          ))}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
