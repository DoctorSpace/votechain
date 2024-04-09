import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { contractFunctions } from "../../utils/contractFunctions";
import { useSelector } from "react-redux";
import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";
import NotActiveButton from "../UI/NotActiveButton/NotActiveButton";
import Notification from "../UI/Notification/Notification";

const VoteWraper = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100wh;
`;

const VoteBlock = styled.div`
  width: 1520px;
  height: 761px;

  background: var(--background);
  border-radius: 10px;
  box-shadow: 5px 2px 18px rgba(0, 0, 0, 0.08);
`;

const MainQuestionPlace = styled.h2`
  margin: 60px 100px 60px 100px;
`;

const SecondQuestionPlace = styled.h3`
  margin: 60px 100px 20px 100px;
`;

const OptionsWraper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin: 60px 100px 20px 100px;
`;

const RadioBtn = styled.input.attrs({
  type: "radio",
  className: "toggler",
  name: "radioGroup",
})`
  width: 20px;
  height: 20px;
`;

const Option = styled.label`
  cursor: pointer;
  border: 1px solid var(--main);
  border-radius: 10px;
  padding: 12px;

  display: flex;
  align-items: center;
  gap: 10px;

  & + ${RadioBtn}:checked {
    background-color: #ff0000;
  }
`;

const ButtonWraper = styled.div`
  display: flex;
  justify-content: end;
  margin: 60px 100px 20px 100px;
`;

const VotePage = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("Title");
  const [question, setQuestion] = useState("Question");
  const [option1, setOption1] = useState("Option1");
  const [option2, setOption2] = useState("Option2");
  const [option3, setOption3] = useState("Option3");
  const [option4, setOption4] = useState("Option4");
  const [iswhitelist, setIsWhitelist] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isNotification, setIsNotification] = useState(false);

  const contract = useSelector((state) => state.contract.data);
  const address = useSelector((state) => state.address.data);

  useEffect(() => {
    const currentPageUrl = window.location.href;
    const dataIndex = currentPageUrl.indexOf("/vote/");
    setId(currentPageUrl.substring(dataIndex + "/vote/".length));

    const getVoteInfo = async () => {
      if (!id) return;
      setTitle(await contractFunctions.getTitle(contract, id));
      setQuestion(await contractFunctions.getQuestion(contract, id));
      setOption1(await contractFunctions.getOption1(contract, id));
      setOption2(await contractFunctions.getOption2(contract, id));
      setOption3(await contractFunctions.getOption3(contract, id));
      setOption4(await contractFunctions.getOption4(contract, id));
    };

    const getWhiteList = async () => {
      setIsWhitelist(await contractFunctions.isWhitelist(contract, address));
    };

    getWhiteList();
    getVoteInfo();
  }, [id]);

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleButtonClick = async () => {
    if (selectedValue !== null) {
      await contractFunctions.vote(contract, address, id, selectedValue);

      setIsNotification(true);
      setTimeout(() => {
        setIsNotification(false);
      }, 2000);
    } else {
      console.log("Пожалуйста, выберите значение");
    }
  };

  return (
    <div>
      <VoteWraper>
        <VoteBlock>
          <MainQuestionPlace>Тема: {title}</MainQuestionPlace>
          <SecondQuestionPlace>{question}</SecondQuestionPlace>

          <OptionsWraper>
            <Option htmlFor="option1">
              <RadioBtn
                id="option1"
                value={option1}
                onChange={handleRadioChange}
              />
              {option1}
            </Option>

            <Option htmlFor="option2">
              <RadioBtn
                id="option2"
                value={option2}
                onChange={handleRadioChange}
              />
              {option2}
            </Option>

            <Option htmlFor="option3">
              <RadioBtn
                id="option3"
                value={option3}
                onChange={handleRadioChange}
              />
              {option3}
            </Option>

            <Option htmlFor="option4">
              <RadioBtn
                id="option4"
                value={option4}
                onChange={handleRadioChange}
              />
              {option4}
            </Option>
          </OptionsWraper>

          <ButtonWraper>
            {iswhitelist ? (
              <PrimaryButton
                width={"220px"}
                height={"50px"}
                onClick={handleButtonClick}
              >
                Проголосовать
              </PrimaryButton>
            ) : (
              <NotActiveButton width={"220px"} height={"50px"}>
                {" "}
                Проголосовать
              </NotActiveButton>
            )}
          </ButtonWraper>
        </VoteBlock>

        {isNotification && <Notification>Выбор учтён</Notification>}
      </VoteWraper>
    </div>
  );
};

export default VotePage;
