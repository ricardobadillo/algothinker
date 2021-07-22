import React, { useContext } from 'react';
import { VisualizationContext } from 'context/VisualizationContext';
import { BiRightArrowCircle } from 'react-icons/bi';
import { executePartially } from '../functions';
import Button from '../../Commons/styled/Button';

const GoForwardButton = React.memo(() => {
  const { visualizationState, dispatchVisualization } =
    useContext(VisualizationContext);
  const { specialData: special } = visualizationState;

  return (
    <Button
      onClick={() => {
        executePartially('forward', dispatchVisualization)
      }}
      disabled={special && special.finished ? true : false}
    >
      <BiRightArrowCircle />
    </Button>
  );
});

export default GoForwardButton;
