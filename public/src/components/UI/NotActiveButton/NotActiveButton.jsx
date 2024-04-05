import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: var(--grey);
  color: var(--black);
  width: ${(props) => props.width};
  height: ${(props) => props.height || "64px"};
  border: 0;
  border-radius: 10px;
`;

const NotActiveButton = (props) => {
  return <Button {...props} />;
};

export default NotActiveButton;
