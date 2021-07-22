import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { VisualizationContext } from 'context/VisualizationContext';
import { executePartially } from '../functions';
import Button from '../../Commons/styled/Button';

const Wrapper = styled.div`
  border-top: 0.5px solid gray;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #023e7d;
`;

const Input = styled.input`
  font-family: 'Roboto';
  width: 200px;
  padding: 0.5rem;
  border: none;
  border-radius: 0.2rem;
  height: 35px;
  margin: 0.2rem;
  width: 100%;
`;

const FormWrapper = styled.div`
  padding: 0.5rem;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr 0.5fr 0.5fr;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ActionButton = styled(Button)`
  background-color: #001845;
  justify-content: center;
`;

const StackControls = ({
  setInputData,
  initialSpecial,
  setInitialize,
  setSpecialData,
}) => {
  const [inputs, setInputs] = useState({ value: '', action: '' });
  const [submitAction, setSubmitAction] = useState(false);
  const { visualizationState, dispatchVisualization } =
    useContext(VisualizationContext);
  const { current } = visualizationState;

  useEffect(() => {
    setInputData([]);
    setSpecialData(initialSpecial);
    setInitialize(true);
  }, []);

  useEffect(() => {
    if (submitAction) {
      executePartially('forward', dispatchVisualization, inputs);
      setSubmitAction(false);
    }
  }, [submitAction]);

  return (
    <Wrapper>
      {current && (
        <FormWrapper>
          <Input
            onChange={(e) => setInputs({ ...inputs, value: e.target.value })}
            value={inputs.value}
            placeholder='Valor a insertar en la pila'
            type='number'
            required
          />
          <ActionButton
            disabled={current.length === 5}
            onClick={() => {
              if (inputs.value.trim().length > 0) {
                setInputs({ ...inputs, action: 'push' });
                setSubmitAction(true);
              }
            }}
          >
            Push
          </ActionButton>
          <ActionButton
            disabled={current.length === 0}
            onClick={() => {
              setInputs({ ...inputs, action: 'pop' });
              setSubmitAction(true);
            }}
          >
            Pop
          </ActionButton>
        </FormWrapper>
      )}
    </Wrapper>
  );
};

export default StackControls;
