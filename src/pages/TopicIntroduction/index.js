import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from 'layouts/AppLayout';
import CardsIntroductions from 'components/CardsIntroductions';
import CardsCourses from 'components/CardsCourses';
import { FcReadingEbook, FcStart, FcPuzzle } from 'react-icons/fc';
import '../../styles/Introduction.css';
import { SERVER_URL } from '../../constants';

const TopicIntroduction = () => {
  const params = useParams();
  const topic = params.topic;
  const [topicData, setTopicData] = useState({
    loading: true,
    data: {},
  });

  useEffect(async () => {
    const response = await fetch(`${SERVER_URL}/topics/${topic}`);
    const data = await response.json();
    
    if (data.ok) {
      setTopicData({
        loading: false,
        data: data.topic,
      });
    }
  }, [topic]);

  return (
    <>
      <AppLayout>
        <CardsIntroductions
          header={topicData.data.title}
          text={topicData.data.introduction}
          image={topicData.data.introduction_image}
        />
        <div className='barra'>
          <div className='barra_blanca'>
            <div className='barra_blanca_div'>
              <p>¿Qué quieres hacer?</p>
            </div>
            <div className='barra_blanca_div'>
              <FcReadingEbook className='barra_icon' />
              <FcStart className='barra_icon' />
              <FcPuzzle className='barra_icon' />
            </div>
          </div>
        </div>
        <CardsCourses course={topicData} />
      </AppLayout>
    </>
  );
};

export default TopicIntroduction;