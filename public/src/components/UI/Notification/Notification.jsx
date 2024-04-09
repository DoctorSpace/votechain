import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    top: -100px;
  }
  100% {
    top: 20px;
  }
`;

const NotificationWraper = styled.div`
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;
  top: -100px;

  border-radius: 10px;
  color: var(--main);

  animation: 0.5s ${fadeIn} forwards;

  padding: 10px 20px;

  background-color: ${(props) => props.backgroundColor || "var(--second)"};
  right: 48vw;
`;

const Notification = (props) => {
  return <NotificationWraper {...props} />;
};

export default Notification;
