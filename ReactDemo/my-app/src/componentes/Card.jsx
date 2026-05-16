import React from 'react';
import '../estilos/card.css';
import carta1 from '../imagenes/Blue-Eyes.png'
import carta2 from '../imagenes/DarkMagician.jpg'
import carta3 from '../imagenes/DarkMagicianGirl.jpg'

const imagenes = {
  carta1: carta1,
  carta2: carta2,
  carta3: carta3,
}

function Card(props){
  return (
    <div className='contenido-card'>
      <img 
        className='imagen-card'
        src={imagenes[props.imagen]} 
        alt='foto de ${props.nombre}'
      />
      <div className='contenedor-texto-card'>
        <p classNamme='nombre-card'>
          <strong>{props.nombre}</strong>
        </p>
        <p className='pais-card'>
          {props.pais}
        </p>
        <p className='texto-card'>
          {props.contenido}
        </p>
      </div>
    </div>
  );
}

export default Card;

