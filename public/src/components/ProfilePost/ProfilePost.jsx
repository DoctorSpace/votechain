import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { contractFunctions } from "../../utils/contractFunctions";
import { useSelector } from "react-redux";

const PostWraper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  background: var(--background);
  border-radius: 16px;

  min-height: 140px;
  padding: 20px;
  box-shadow: 5px 2px 18px rgba(0, 0, 0, 0.08);
  position: relative;
`;

const AnsverBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Ansver = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  background-color: ${(props) => (props.isMostVoted ? "#58E15D" : "#eee")};
  border-radius: 6px;

  height: ${(props) => props.height || "auto"};

  p {
    padding: 6px 10px;
    font-weight: 300;
  }
`;

const CloseBtn = styled.button`
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  border: 0;
  background-color: var(--main);
  color: var(--background);
  position: absolute;
  right: 20px;
  top: 10px;

  &:hover {
    background-color: var(--main-activ);
  }
`;

const ProfilePost = ({ data, isClose }) => {
  const [question, setQuestion] = useState("Question");
  const [option1, setOption1] = useState("Option1");
  const [option2, setOption2] = useState("Option2");
  const [option3, setOption3] = useState("Option3");
  const [option4, setOption4] = useState("Option4");
  const [counts, setCounts] = useState("");

  const [ansver1, setAnsver1] = useState(false);
  const [ansver2, setAnsver2] = useState(false);
  const [ansver3, setAnsver3] = useState(false);
  const [ansver4, setAnsver4] = useState(false);


  const contract = useSelector((state) => state.contract.data);
  const address = useSelector((state) => state.address.data);

  const countMax = () => {

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

  const closeVote = async () => {
    await contractFunctions.finishVoting(contract, address, data);
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

        if (isClose) {
          setTimeout(() => {
            countMax();
          }, 200);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getVoteInfo();
  }, [contract, address]);

  return (
    <PostWraper>
      <h4>{question}</h4>
      <AnsverBlock>
        <Ansver isMostVoted={ansver1}>
          <p>{option1}</p>
          <p>{`${counts[0]}`}</p>
        </Ansver>
        <Ansver isMostVoted={ansver2}>
          <p>{option2}</p>
          <p>{`${counts[1]}`}</p>
        </Ansver>
        <Ansver isMostVoted={ansver3}>
          <p>{option3}</p>
          <p>{`${counts[2]}`}</p>
        </Ansver>
        <Ansver isMostVoted={ansver4}>
          <p>{option4}</p>
          <p>{`${counts[3]}`}</p>
        </Ansver>
      </AnsverBlock>

      {isClose ? null : <CloseBtn onClick={closeVote}>X</CloseBtn>}
    </PostWraper>
  );
};

export default ProfilePost;
