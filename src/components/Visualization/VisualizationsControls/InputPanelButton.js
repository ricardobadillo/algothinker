import styled from 'styled-components';
import Button from '../../Commons/styled/Button';
import { FcMultipleInputs } from 'react-icons/fc';

const InputButton = styled(Button)`
  background-color: white;

  &:hover {
    background-color: lightgray;
  }
`;

const InputPanelButton = ({ setShowControls }) => {
  return (
    <InputButton
      onClick={() => {
        setShowControls(false);
      }}
    >
      <FcMultipleInputs />
    </InputButton>
  );
};

export default InputPanelButton;
