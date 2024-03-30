import React from "react";
import styled from "styled-components";
import Question from "../Question/Question";

const QuestionsWraper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 80px;
  width: 100%;
  margin-bottom: 400px;
`;

const QuestionsBlock = () => {
  const arr = [123, 235, 555555555];

  return (
    <QuestionsWraper>
      {arr.map((post, index) => (
        <Question data={post} key={index} />
      ))}
    </QuestionsWraper>
  );
};

export default QuestionsBlock;
