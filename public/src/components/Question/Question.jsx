import React from "react";
import styled from "styled-components";
import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";

const QuestionWraper = styled.div`
  background: var(--background);
  border-radius: 16px;
  width: 100%;
  min-width: 276px;
  height: 380px;
  box-shadow: 5px 2px 18px rgba(0, 0, 0, 0.08);
  position: relative;
`;

const IdPlace = styled.p`
  position: absolute;
  right: 40px;
  border-radius: 0 0 6px 6px;
  padding: 2px 10px;
  background-color: var(--main);

  font-weight: 200;

  color: var(--background);
  text-align: center;
`;

const MainQuestionPlace = styled.h3`
  padding: 40px 20px;
  font-weight: 300;
  font-size: 24px;

  text-align: left;
`;

const SecondQuestionPlace = styled.h4`
  padding: 0 20px;
  font-weight: 300;
`;

const ButtonPlace = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

const Question = ({ data }) => {
  return (
    <QuestionWraper>
      <IdPlace>{data}</IdPlace>
      <MainQuestionPlace>
        Мировые здравоохранение и борьба с пандемиями
      </MainQuestionPlace>
      <SecondQuestionPlace>
        Какие меры считаете важными для обеспечения свободы СМИ и защиты от
        дезинформации?
      </SecondQuestionPlace>
      <ButtonPlace>
        <Link to={`/data/${data}`}>
          <PrimaryButton width={"240px"} height={"44px"}>
            пройти опрос
          </PrimaryButton>
        </Link>
      </ButtonPlace>
    </QuestionWraper>
  );
};

export default Question;
