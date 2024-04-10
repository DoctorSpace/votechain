import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfilePost from "../ProfilePost/ProfilePost";
import { contractFunctions } from "../../utils/contractFunctions";
import { useSelector } from "react-redux";

const ProfileWraper = styled.div`
  margin-top: 100px;
  width: 100wh;

  display: flex;
  flex-direction: column;
  gap: 20px;

  box-shadow: 5px 2px 18px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  background-color: var(--background);

  padding: 100px 200px;
`;

const PostBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const PostWraper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
`;

const ProfilePage = () => {
  const [allUserQuestions, setAllUserQuestions] = useState([]);
  const [allUserEndQuestions, setAllUserEndQuestions] = useState([]);

  const contract = useSelector((state) => state.contract.data);
  const address = useSelector((state) => state.address.data);

  useEffect(() => {
    const fetchData = async () => {
      const questions = await contractFunctions.getAllQuestions(contract);

      const newUserQS = [];
      const newUserEndQS = [];

      if (!questions) return;

      for (const hashx of questions) {
        let userAddress = await contractFunctions.getCreatorAddress(
          contract,
          hashx
        );

        if (address === userAddress.toLowerCase()) {
          let isActive = await contractFunctions.isVotingFinished(
            contract,
            hashx
          );

          isActive ? newUserEndQS.push(hashx) : newUserQS.push(hashx);
        }
      }

      setAllUserQuestions(newUserQS);
      setAllUserEndQuestions(newUserEndQS);
    };

    fetchData();
  }, [contract, address]);

  return (
    <ProfileWraper>
      <h2>Созданные Голосования</h2>
      <PostBlock>
        <h3>Активные:</h3>
        <PostWraper>
          {allUserQuestions &&
            allUserQuestions.map((item, index) => (
              <ProfilePost data={item} key={index} isClose={false} />
            ))}
        </PostWraper>
      </PostBlock>
      <PostBlock>
        <h3>Завершённые:</h3>
        <PostWraper>
          {allUserEndQuestions &&
            allUserEndQuestions.map((item, index) => (
              <ProfilePost data={item} key={index} isClose={true} />
            ))}
        </PostWraper>
      </PostBlock>
    </ProfileWraper>
  );
};

export default ProfilePage;
