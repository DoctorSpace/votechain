import React from "react";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  background-color: var(--main);
  color: var(--second);
  width: ${(props) => props.width};
  height: ${(props) => props.height || '64px'} ;
  border: 0;
  border-radius: 10px;

  &:hover {
    background-color: var(--main-activ);
  }
`;

const PrimaryButton = (props) => {
  return <Button {...props} />;
};

export default PrimaryButton;
