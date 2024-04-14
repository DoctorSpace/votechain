import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Web3 from "web3";
import Voting from "../../image/Voting.svg";
import SecondaryButton from "../UI/SecondaryButton/SecondaryButton";
import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";
import QuestionsBlock from "../QuestionsBlock/QuestionsBlock";
import PrimaryInput from "../UI/PrimaryInput/PrimaryInput";

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
  const [hash, setHash] = useState("");

  // const weeeeb = async () => {
  //   const web3 = new Web3(
  //     new Web3.providers.HttpProvider("http://127.0.0.1:8545")
  //   );

  //   // const latestBlockNumber = await web3.eth.getBlockNumber();
  //   // const block = await web3.eth.getBlock(latestBlockNumber);

  //   // const tx = await web3.eth.getTransactionFromBlock(latestBlockNumber, 0);
  //   // console.log("6+++tx", tx);

  //   const transaction = await web3.eth.getTransaction(hash);

  //   console.log("transaction", transaction);
  //   // console.log("---latestBlocks", block);
  // };

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
            <PrimaryButton width={"330px"}>Учавствовать в опросе</PrimaryButton>
            <Link to="/create">
              <SecondaryButton>Создать голосование</SecondaryButton>
            </Link>
          </ButtonWraper>
        </InfoBlock>
        <img src={Voting} alt="voting" />
      </MainWraper>

      {/* <div>
        <PrimaryInput
          type="text"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder="Hash"
        />
        <PrimaryButton onClick={weeeeb}>ssss</PrimaryButton>
      </div> */}

      <QuestionsBlock />
    </>
  );
};

export default MainPage;
