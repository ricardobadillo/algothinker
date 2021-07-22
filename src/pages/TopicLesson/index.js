import {useState, useEffect} from 'react';
import AppLayout from 'layouts/AppLayout';
import { LessonContent } from '../../components/LessonContent';
import { useParams } from 'react-router-dom';
import { SERVER_URL } from '../../constants';

const TopicLesson = () => {
  const [lessonData, setLessonData] = useState({
    loading: true,
    data: null
  });
  const params = useParams();
  const topicTitle = params.topic;

  useEffect(async () => {
    const response = await fetch(`${SERVER_URL}/topics/${topicTitle}/leccion`);
    const data = await response.json();
    
    if (data.ok) {
      setLessonData({
        loading: false,
        data: data.topicData,
      });
    }
  }, [topicTitle]);

  return (
    <AppLayout>
      <div>
        <LessonContent title={topicTitle} data={lessonData} />
      </div>
    </AppLayout>
  );
};

export default TopicLesson;
