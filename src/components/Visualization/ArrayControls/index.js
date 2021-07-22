import styled from 'styled-components';
import { Formik, Form } from 'formik';

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
`;

const Submit = styled.input`
  background-color: #0466c8;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 0.2rem;
  height: 35px;
  grid-column: 1/-1;

  &:hover {
    background-color: #001845;
  }
`;

const FormWrapper = styled.div`
  padding: 0.5rem;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: 100%;
`;

const ArrayControls = ({
  setInputData,
  initialSpecial,
  setSpecialData,
  setShowControls,
  type,
  setInitialize,
}) => {
  const isSearch = type === 'linearSearch' || type === 'binarySearch';
  const initialValues = { array: '', target: isSearch ? 0 : null };

  const validate = ({ array }) => {
    const errors = {};
    const regex = /^\[(\-?\d+\,?)+\]$/;

    if (!regex.test(array)) {
      errors.array = true;
    }

    return errors;
  };

  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={({ array, target }) => {
          let arrayParsed = JSON.parse(array);

          if (type === 'binarySearch') arrayParsed.sort((a, b) => a - b);

          setInputData(arrayParsed);

          // setSpecialData({
          //   ...initialSpecial,
          //   target: Number(target),
          // });

          if (isSearch) initialSpecial.target = Number(target);

          setSpecialData(initialSpecial);
          setShowControls(true);
          setInitialize(true);
        }}
      >
        {({ handleChange }) => (
          <Form>
            <FormWrapper>
              <Input
                name='array'
                onChange={handleChange}
                placeholder='[1,5,3,2,0] (sin espacios)'
              />
              {isSearch && (
                <Input
                  name='target'
                  type='number'
                  min='-9999'
                  max='9999'
                  onChange={handleChange}
                  placeholder='Objetivo de la busqueda'
                />
              )}
              <Submit type='submit' value='Ingresar' />
            </FormWrapper>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ArrayControls;
