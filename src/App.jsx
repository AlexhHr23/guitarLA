import { useState, useEffect } from 'react';
import {Header} from './components/Headers.jsx';
import {Guitar} from './components/Guitra.jsx';
import { db } from './data/db.js';
import './App.css'

function App() {

 
  const[data, setData] = useState(db) 
  
 

  return (
    <>
      <Header/> 

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">z
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
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
