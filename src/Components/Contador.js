import React, { useState } from 'react';

function Contador() {
  const [num, setNum] = useState(6);

  function sumar(){
      setNum(num+1)
  }
  
  function restar() {
        if(num > 0)
        setNum(oldCount => oldCount - 1)}

  return (
    <div className="app">
      <h4>Palabras</h4>
      <p>{num}</p>
        <button onClick={restar}>-</button>
        <button onClick={sumar}>+</button>
      
    </div>
  );
}

export default Contador
