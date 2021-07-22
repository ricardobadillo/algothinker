import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  background-color: #023E7D;
  color: #fff;
  padding: 0.5rem;
  font-size: 1rem;
  margin: 0.5rem;
  border: none;

  &:hover {
    background-color: #0353A4;
  }

  &:disabled {
    visibility: hidden;
  }
`;

export default Button;
