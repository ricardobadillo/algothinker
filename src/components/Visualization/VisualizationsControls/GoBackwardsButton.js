import { useContext } from 'react';
import { VisualizationContext } from 'context/VisualizationContext';
import { BiLeftArrowCircle } from 'react-icons/bi';
import Button from '../../Commons/styled/Button';
import { executePartially } from '../functions';

const GoBackwardsButton = () => {
  //Boton para ir hacia atras
  const { visualizationState, dispatchVisualization } =
    useContext(VisualizationContext);
  const { stateHistory } = visualizationState;

  return (
    <Button
      onClick={() => executePartially('backwards', dispatchVisualization)}
      disabled={stateHistory && stateHistory.length > 1 ? false : true}
    >
      <BiLeftArrowCircle />
    </Button>
  );
};

export default GoBackwardsButton;
