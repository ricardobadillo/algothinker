import React from 'react';
import { useHistory, useParams } from 'react-router';
import { FcReadingEbook, FcStart, FcPuzzle } from 'react-icons/fc';
import styled from 'styled-components';
import 'styles/CardCourse.css';

const Div = styled.div`
  display: flex;

  @media (max-width: 780px) {
    flex-direction: column;
  }
`;

const topicOptions = [
  {
    id: 'leccion',
    title: 'Lección',
    icon: <FcReadingEbook />,
    description:
      'Comienza con la documentación necesaria para entender sobre este tópico.',
  },
  {
    id: 'visualizacion',
    title: 'Visualización',
    icon: <FcStart />,
    description:
      'Prueba con visualizaciones y lectura de código para mejorar lo aprendido.',
  },
  {
    id: 'ejercicios',
    title: 'Ejercicios',
    icon: <FcPuzzle />,
    description: 'Ponte a prueba con nuestros ejercicios.',
  },
];

const CardsCourses = ({ course }) => {
  console.log(course);

  const routeParams = useParams();
  const history = useHistory();
  const { category, topic } = routeParams;

  return (
    <Div>
      {topicOptions.map((item, index) => (
        <div className='card-contenedor' key={index}>
          <div className='card-title'>
            <p className='item-icon'>{item.icon}</p>
            <p className='item-title'>{item.title}</p>
          </div>
          <div className='card-description'>{item.description}</div>
          <div
            onClick={() => {
              const path = `/${category}/${topic}/${item.id}`;

              history.push( path );
            }}
          >
            <button className='card-button'>Empezar</button>
          </div>
        </div>
      ))}
    </Div>
  );
};

export default CardsCourses;
