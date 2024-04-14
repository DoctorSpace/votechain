import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ResultQuestion from "../ResultQuestion/ResultQuestion";
import { useSelector } from "react-redux";
import { contractFunctions } from "../../utils/contractFunctions";

const ResultWraper = styled.div`
  margin-top: 60px;

  h3 {
    margin-bottom: 40px;
  }
`;

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
`;

const ResultPage = () => {
  const [allUserEndQuestions, setAllUserEndQuestions] = useState([]);
  const contract = useSelector((state) => state.contract.data);

  useEffect(() => {
    const getAllQuestions = async () => {
      const AllQuestions = await contractFunctions.getAllQuestions(contract);

      if (!AllQuestions) return;

      let arr = [];

      for (const _id of AllQuestions) {
        let isActive = await contractFunctions.isVotingFinished(contract, _id);

        if (isActive) {
          arr.push(_id);
        }
      }


      setAllUserEndQuestions(arr);
    };

    getAllQuestions();
  }, [contract]);

  return (
    <ResultWraper>
      <h3>Завершённые</h3>
      <Container>
        {allUserEndQuestions &&
          allUserEndQuestions.map((item, index) => (
            <ResultQuestion data={item} key={index} />
          ))}
      </Container>
    </ResultWraper>
  );
};

export default ResultPage;
