
import { useState, useEffect } from 'react'
import './App.css'

function App () {
const [enabled, setEnabled] = useState(false);
const [position, setPosition] = useState({x:0, y:0});

useEffect(() => {
  console.log('effect', {enabled})

  const handleMove  = (event) =>{
    const {clientX, clientY} = event;
    console.log('handleMove', {clientX, clientY})
    setPosition({x: clientX, y: clientY})
    
  }
  if(enabled){//Subscripcion al evento si el estado de enabled es true 
    window.addEventListener('pointermove', handleMove)
  }
  // cleanup:
    // -> cuando el componente se desmonta
    // -> cuando cambian las dependencias, antes de ejecutar
    //    el efecto de nuevo
    
  return () => {// cleanup method
    console.log('cleanup')
    window.removeEventListener('pointermove', handleMove)
  }
}, [enabled])

 // [] -> solo se ejecuta una vez cuando se monta el componente
  // [enabled] -> se ejecuta cuando cambia enabled y cuando se monta el componente
  // undefined -> se ejecuta cada vez que se renderiza el componente


  return (
    <main>
    <div style={{
      position: 'absolute',
      backgroundColor: '#09f',
      border: '1px solid #fff',
      borderRadius: '50%',
      opacity:0.8,
      pointerEvents: 'none',
      left:-20,
      top: -20,
      width: 40,
      height: 40,
      transform: `translate(${position.x}px, ${position.y}px)`
    }}/>
    <button onClick={()=>setEnabled(!enabled)} >
      {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
   
    
  )
}

export default App
