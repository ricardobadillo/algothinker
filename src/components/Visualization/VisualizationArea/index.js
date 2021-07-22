import React, { useState, useEffect, useContext } from 'react';
import VisualizationsControls from '../VisualizationsControls';
import SVGCanvas from '../SVGCanvas';
import visualizations from 'visualizations/visualizationsData';
import ArrayControls from 'components/Visualization/ArrayControls';
import StackControls from 'components/Visualization/StackControls';
import QueueControls from 'components/Visualization/QueueControls';
import { VisualizationContext } from 'context/VisualizationContext';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    display: ${({ selectedTab }) =>
      selectedTab === 'Visualización' ? 'flex' : 'none'};
  }
`;

const VisualizationArea = React.memo(({ visualizationData, selectedTab }) => {
  const { dispatchVisualization } = useContext(VisualizationContext);
  const [inputData, setInputData] = useState(null);
  const [specialData, setSpecialData] = useState(null);
  const [initialize, setInitialize] = useState(true);
  const [showControls, setShowControls] = useState(false);
  let isArray = false;
  let isStack = false;
  let isQueue = false;

  useEffect(() => {
    if (inputData && specialData && initialize) {
      const { algorithm, keyframe, transition } =
        visualizations[visualizationData.name];

      dispatchVisualization({
        type: 'SET_VISUALIZATION',
        lesson: visualizationData.name,
        currentState: inputData,
        specialData: specialData,
        algorithm: algorithm,
        visualization: keyframe,
        updateVisualization: transition,
      });

      setInitialize(false);
    }
  }, [inputData, specialData, initialize]);

  switch (visualizationData.name) {
    case 'bubble':
    case 'insertion':
    case 'selection':
    case 'merge':
    case 'linearSearch':
    case 'binarySearch':
      isArray = true;
      break;
    case 'stack':
      isStack = true;
      break;
    case 'queue':
      isQueue = true;
  }

  return (
    <Wrapper selectedTab={selectedTab}>
      <SVGCanvas />
      {!showControls && isArray && (
        <ArrayControls
          setInputData={setInputData}
          setShowControls={setShowControls}
          initialSpecial={visualizationData.special}
          setSpecialData={setSpecialData}
          setInitialize={setInitialize}
          type={visualizationData.name}
        />
      )}
      {isStack && (
        <StackControls
          setInputData={setInputData}
          initialSpecial={visualizationData.special}
          setInitialize={setInitialize}
          setSpecialData={setSpecialData}
        />
      )}
      {isQueue && (
        <QueueControls
          setInputData={setInputData}
          initialSpecial={visualizationData.special}
          setInitialize={setInitialize}
          setSpecialData={setSpecialData}
        />
      )}
      {showControls && !isStack && (
        <VisualizationsControls setShowControls={setShowControls} />
      )}
    </Wrapper>
  );
});

export default VisualizationArea;
