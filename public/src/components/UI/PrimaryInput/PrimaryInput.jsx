import React from "react";
import styled from "styled-components";

const Input = styled.input`
  background-color: #588fe111;
  color: var(--black);
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "40px"};
  padding-left: 16px;
  padding-bottom:${(props) => props.paddingBottom || "0px"};
  text-align: justify;
  border: 1px solid var(--main);
  border-radius: 6px;
`;

const PrimaryInput = (props) => {
  return <Input {...props} />;
};

export default PrimaryInput;
