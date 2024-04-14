import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Voting from "../../image/Voting.svg";
import SecondaryButton from "../UI/SecondaryButton/SecondaryButton";
import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";
import QuestionsBlock from "../QuestionsBlock/QuestionsBlock";

const MainWraper = styled.div`
  margin-top: 60px;
  margin-bottom: 120px;
  max-height: 600px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 138px;
  img {
    justify-self: center;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 60px;

  h1 {
    font-size: 48px;
  }

  h3 {
    font-size: 16px;
    font-style: normal;
  }
`;

const ButtonWraper = styled.div`
  display: flex;
  gap: 20px;
`;

const MainPage = () => {
  return (
    <>
      <MainWraper>
        <InfoBlock>
          <h1>Система голосования на основе технологии Blockchain </h1>
          <h3>
            Безопасное и прозрачное голосование с использованием технологии
            Blockchain: ваш голос имеет значение.<br></br>
            <br></br>
            Надежность блокчейна обеспечивает защиту данных и исключает
            возможность манипуляций, обеспечивая демократичность процесса.
          </h3>
          <ButtonWraper>
            <a href="#section1">
              <PrimaryButton width={"330px"}>
                Учавствовать в опросе
              </PrimaryButton>
            </a>
            <Link to="/create">
              <SecondaryButton>Создать голосование</SecondaryButton>
            </Link>
          </ButtonWraper>
        </InfoBlock>
        <img src={Voting} alt="voting" />
      </MainWraper>
      <div id="section1">
        <QuestionsBlock />
      </div>
    </>
  );
};

export default MainPage;
