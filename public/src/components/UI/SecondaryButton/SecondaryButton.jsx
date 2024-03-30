import React from "react";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  background-color: var(--bacground);
  height: 64px;
  border: 1px solid var(--main);
  border-radius: 10px;
  padding: 0 22px;

  &:hover {
    border: 1px solid var(--main-activ);
    color: var(--main-activ);
  }
`;

const SecondaryButton = ({ children }) => {
  return <Button>{children}</Button>;
};

export default SecondaryButton;
