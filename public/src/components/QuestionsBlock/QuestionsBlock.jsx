import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Question from "../Question/Question";
import { contractFunctions } from "../../utils/contractFunctions";
import { useSelector } from "react-redux";

const QuestionsWraper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 80px;
  width: 100%;
  margin-bottom: 400px;
`;

const QuestionsBlock = () => {
  const [allQuestion, setAllQuestion] = useState([]);
  const contract = useSelector((state) => state.contract.data);

  useEffect(() => {
    const fetchData = async () => {
      setAllQuestion(await contractFunctions.getAllQuestions(contract));
    };

    fetchData();
  }, [contract]);

  return (
    <QuestionsWraper>
      {allQuestion &&
        allQuestion.map((item, index) => <Question data={item} key={index} />)}
    </QuestionsWraper>
  );
};

export default QuestionsBlock;
