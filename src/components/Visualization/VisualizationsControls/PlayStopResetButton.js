import { useContext } from 'react';
import { VisualizationContext } from 'context/VisualizationContext';
import { FiPlay, FiPause } from 'react-icons/fi';
import { VscDebugRestart } from 'react-icons/vsc';
import { executeFully, resetVisualization } from '../functions';
import Button from '../../Commons/styled/Button';

const PlayStopResetButton = () => {
  const { visualizationState, dispatchVisualization } =
    useContext(VisualizationContext);
  const { fullExecution, specialData: special } = visualizationState;

  return (
    <Button
      onClick={() => {
        if (fullExecution && special.finished) {
          resetVisualization(dispatchVisualization);
        } else if(!fullExecution){
          executeFully(dispatchVisualization);
        }
      }}
    >
      {!fullExecution && special && !special.finished ? (
        <FiPlay />
      ) : special && special.finished ? (
        <VscDebugRestart />
      ) : (
        <FiPause />
      )}
    </Button>
  );
};

export default PlayStopResetButton;
