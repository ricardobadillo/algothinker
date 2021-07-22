import React from 'react';
import 'styles/Introduction.css';

const CardsIntroductions = ({ header, text, image }) => {
  return (
    <div className='container'>
      <h1>{header}</h1>

      <div className='presentacion'>
        <div className='presentacion_p'>
          <p>{text}</p>
        </div>
        <div className='presentacion_img'>
          <img src={image} className='img' alt={header} />
        </div>
      </div>
    </div>
  );
};

export default CardsIntroductions;
