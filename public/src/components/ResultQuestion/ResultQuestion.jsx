import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { contractFunctions } from "../../utils/contractFunctions";
import { useSelector } from "react-redux";


const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  box-shadow: 5px 2px 18px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
`;

const BlockMaxCount = styled.p`
  text-align: center;
`;

const BlockQuestions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Question = styled.div`
  display: flex;
  padding: 4px 10px;
  justify-content: space-between;
  border: 1px solid var(--main);
  border-radius: 4px;
  background-color: ${(props) => (props.isMostVoted ? "#58E15D" : "#ffffff")};

  p {
    font-weight: 300;
  }

  span {
    color: #888;
    font-weight: 300;
  }
`;

const ResultQuestion = ({ data }) => {
  const [question, setQuestion] = useState("Question");
  const [option1, setOption1] = useState("Option1");
  const [option2, setOption2] = useState("Option2");
  const [option3, setOption3] = useState("Option3");
  const [option4, setOption4] = useState("Option4");
  const [counts, setCounts] = useState("");
  const [maxCounts, setMaxCounts] = useState(0);

  const [ansver1, setAnsver1] = useState(false);
  const [ansver2, setAnsver2] = useState(false);
  const [ansver3, setAnsver3] = useState(false);
  const [ansver4, setAnsver4] = useState(false);

  const contract = useSelector((state) => state.contract.data);

  const countMax = async () => {
    setMaxCounts(
      Number(counts[0]) +
        Number(counts[1]) +
        Number(counts[2]) +
        Number(counts[3])
    );

    let maxX = Math.max(
      Number(counts[0]),
      Number(counts[1]),
      Number(counts[2]),
      Number(counts[3])
    );

    if (maxX === 0) return;

    if (Number(counts[0]) === maxX) {
      setAnsver1(true);
    }
    if (Number(counts[1]) === maxX) {
      setAnsver2(true);
    }
    if (Number(counts[2]) === maxX) {
      setAnsver3(true);
    }
    if (Number(counts[3]) === maxX) {
      setAnsver4(true);
    }
  };

  useEffect(() => {
    const getVoteInfo = async () => {
      if (!data) return;

      try {
        setQuestion(await contractFunctions.getQuestion(contract, data));
        setOption1(await contractFunctions.getOption1(contract, data));
        setOption2(await contractFunctions.getOption2(contract, data));
        setOption3(await contractFunctions.getOption3(contract, data));
        setOption4(await contractFunctions.getOption4(contract, data));
        setCounts(await contractFunctions.getCounts(contract, data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getVoteInfo();
  }, [contract]);

  useEffect(() => {
    countMax();
  }, [counts]);

  return (
    <Block>
      <p>{question}</p>
      <BlockQuestions>
        <Question isMostVoted={ansver1}>
          <p>
            {option1}
            <span> - {Number(counts[0])}</span>
          </p>

          <p>{maxCounts === 0 ? 0 : ((Number(counts[0]) / maxCounts) * 100).toFixed(1)}%</p>
        </Question>
        <Question isMostVoted={ansver2}>
          <p>
            {option2}
            <span> - {Number(counts[1])}</span>
          </p>
          <p>{maxCounts === 0 ? 0 : ((Number(counts[1]) / maxCounts) * 100).toFixed(1)}%</p>
        </Question>
        <Question isMostVoted={ansver3}>
          <p>
            {option3}
            <span> - {Number(counts[2])}</span>
          </p>
          <p>{maxCounts === 0 ? 0 : ((Number(counts[2]) / maxCounts) * 100).toFixed(1)}%</p>
        </Question>
        <Question isMostVoted={ansver4}>
          <p>
            {option4}
            <span> - {Number(counts[3])}</span>
          </p>
          <p>{maxCounts === 0 ? 0 : ((Number(counts[3]) / maxCounts) * 100).toFixed(1)}%</p>
        </Question>
      </BlockQuestions>
      <BlockMaxCount>Проголосовало: {maxCounts}</BlockMaxCount>
    </Block>
  );
};

export default ResultQuestion;
