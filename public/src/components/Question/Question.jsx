import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";
import { contractFunctions } from "../../utils/contractFunctions";
import { useSelector } from "react-redux";
import Notification from "../UI/Notification/Notification";
import { shortening } from "../../utils/shortening";
import NotActiveButton from "../UI/NotActiveButton/NotActiveButton";

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
  cursor: pointer;
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

const CountsPlace = styled.p`
  padding: 0 20px;
  font-weight: 300;
`;

const ButtonPlace = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

const Question = ({ data }) => {
  const [title, setTitle] = useState("Title");
  const [question, setQuestion] = useState("Question");
  const [counts, setCounts] = useState("");
  const [isNotification, setIsNotification] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const contract = useSelector((state) => state.contract.data);

  const copyAddress = () => {
    navigator.clipboard
      .writeText(data)
      .then(() => {
        console.log("Значение скопировано в буфер обмена:", data);

        setIsNotification(true);
        setTimeout(() => {
          setIsNotification(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Ошибка при копировании в буфер обмена:", error);
      });
  };

  useEffect(() => {
    const getVoteInfo = async () => {
      if (!data) return;
      setTitle(await contractFunctions.getTitle(contract, data));
      setQuestion(await contractFunctions.getQuestion(contract, data));
    };

    const getCounts = async () => {
      if (!data) return;
      setCounts(await contractFunctions.getCounts(contract, data));
    };

    const gestIsActive = async () => {
      setIsActive(await contractFunctions.isVotingFinished(contract, data));
      console.log('isActive', isActive);
    };

    gestIsActive();
    getVoteInfo();
    getCounts();
  }, []);

  return (
    <QuestionWraper>
      <IdPlace onClick={copyAddress}>{shortening(data)}</IdPlace>
      <MainQuestionPlace>{title}</MainQuestionPlace>
      <SecondQuestionPlace>{question}</SecondQuestionPlace>
      <CountsPlace>
        {counts
          ? `${counts[0]} - ${counts[1]} - ${counts[2]} - ${counts[3]}`
          : ""}
      </CountsPlace>
      <ButtonPlace>
        {!isActive ? (
          <Link to={`/vote/${data}`}>
            <PrimaryButton width={"240px"} height={"44px"}>
              пройти опрос
            </PrimaryButton>
          </Link>
        ) : <NotActiveButton width={'240px'} height={'44px'}>опрос завершён</NotActiveButton>}
      </ButtonPlace>

      {isNotification && <Notification>Скопировано</Notification>}
    </QuestionWraper>
  );
};

export default Question;
