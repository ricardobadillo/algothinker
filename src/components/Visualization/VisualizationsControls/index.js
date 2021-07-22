import React, { useEffect, useRef, useContext } from 'react';
import GoForwardButton from './GoForwardButton';
import GoBackwardsButton from './GoBackwardsButton';
import PlayStopResetButton from './PlayStopResetButton';
import InputPanelButton from './InputPanelButton';
import { VisualizationContext } from 'context/VisualizationContext';
import { executePartially } from '../functions';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 50px;
  border-top: 0.5px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #0466c8;
`;

const VisualizationsControls = ({ setShowControls }) => {
  const { visualizationState, dispatchVisualization } =
    useContext(VisualizationContext);
  const {
    fullExecution,
    specialData: special,
    stateHistory,
  } = visualizationState;
  const timeoutID = useRef(null);

  //Ejecuta la visualizacion al completo, paso por paso cada 0.5 segundos
  //Si y solo si fullExecution es true y todavia quedan pasos por ejecutar
  useEffect(() => {
    if (fullExecution && !special.finished) {
      timeoutID.current = setTimeout(() => {
        executePartially('forward', dispatchVisualization);
      }, 500);
    } else if (!fullExecution) {
      if (timeoutID.current) {
        clearTimeout(timeoutID.current);
      }
    }
  }, [fullExecution, stateHistory.length]);

  return (
    <Wrapper>
      <GoBackwardsButton />
      <PlayStopResetButton />
      <GoForwardButton />
      <InputPanelButton setShowControls={setShowControls} />
    </Wrapper>
  );
};

export default VisualizationsControls;
