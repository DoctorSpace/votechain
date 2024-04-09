import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Web3 from "web3";
import PrimaryInput from "../UI/PrimaryInput/PrimaryInput";
import { genHash } from "../../utils/genHash";
import { useSelector } from "react-redux";
import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";
import { contractFunctions } from "../../utils/contractFunctions";
import Notification from "../UI/Notification/Notification";


const VotePlace = styled.div`
  margin-top: 80px;
`;

const VoteWraper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 40px;
  width: 100%;

  margin-top: 40px;

  height: 60vh;
  width: 100wh;
`;

const VoteBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  border-radius: 10px;
  padding: 40px;
  box-shadow: 5px 2px 18px rgba(0, 0, 0, 0.08);

  span {
    color: #0000006b;
  }

  p {
    font-size: 12px;
  }
`;

const OptionBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const InputInfo = styled.div`
  display: grid;
  gap: 6px;
  width: 100%;
`;

const AdressBlock = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 14px;
`;

const BaseAddress = styled.div`
  margin-top: 8px;
  background-color: var(--background);
  border: 1px solid var(--main);
  padding: 6px;
  text-align: center;
  border-radius: 6px;
  color: var(--main);
`;

const VoteCreatePage = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [guestAddress, setGuestAddress] = useState("");
  const [inBaseAddress, setInBaseAddress] = useState([]);
  const [isNotification, setIsNotification] = useState(false);

  const contract = useSelector((state) => state.contract.data);
  const address = useSelector((state) => state.address.data);

  useEffect(() => {
    const getBaseAddress = async () => {
      setInBaseAddress(
        await contractFunctions.getWhitelistedAddresses(contract)
      );
    };

    getBaseAddress();
  }, [contract]);


  const weeeeb = async () => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545")
    );

    const latestBlockNumber = await web3.eth.getBlockNumber();
    const block = await web3.eth.getBlock(latestBlockNumber);

    const tx = await web3.eth.getTransactionFromBlock(latestBlockNumber, 0);
    console.log("6+++tx", tx);

    const transaction = await web3.eth.getTransaction(tx.hash);

    console.log("transaction", transaction);
    console.log("---latestBlocks", block);
  };

  const createVote = async () => {
    const hash10 = genHash();

    if (!question || !title) return;
    if (!option1 || !option2 || !option3 || !option4) return;


    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545")
    );

    const latestBlockNumber = await web3.eth.getBlockNumber();
    // const block = await web3.eth.getBlock(latestBlockNumber);

    const tx = await web3.eth.getTransactionFromBlock(latestBlockNumber, 0);
    // const transaction = await web3.eth.getTransaction(tx.hash);

    // console.log(transaction);


    await contractFunctions.createVoting(
      contract,
      address,
      tx.hash,
      title,
      question,
      option1,
      option2,
      option3,
      option4
    );

    setIsNotification(true);
    setTimeout(() => {
      setIsNotification(false);
    }, 2000);

  };

  const addAdress = async () => {
    await contractFunctions.addWhitelistAddress(
      contract,
      address,
      guestAddress
    );
  };

  return (
    <VotePlace>
      <h2>Создание опроса</h2>
      <VoteWraper>
        <VoteBlock>
          <span>шаг 1</span>
          <h4>Заполнение опроса</h4>

          <InputInfo>
            <p>Заголовок</p>
            <PrimaryInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </InputInfo>
          <InputInfo>
            <p>Вопрос</p>
            <PrimaryInput
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Question"
            />
          </InputInfo>

          <p>Варианты ответов</p>
          <OptionBlock>
            <PrimaryInput
              type="text"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              placeholder="Option1"
            />
            <PrimaryInput
              type="text"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              placeholder="Option2"
            />
            <PrimaryInput
              type="text"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
              placeholder="Option3"
            />
            <PrimaryInput
              type="text"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
              placeholder="Option4"
            />
          </OptionBlock>
          <PrimaryButton onClick={createVote} height={"43px"}>
            Создать опрос
          </PrimaryButton>
        </VoteBlock>
        <VoteBlock>
          <span>шаг 2</span>
          <h4>Доступ к опросу</h4>
          <InputInfo>
            <p>Адрес</p>
            <AdressBlock>
              <PrimaryInput
                type="text"
                value={guestAddress}
                onChange={(e) => setGuestAddress(e.target.value)}
                placeholder="Address"
                list="addres"
              />

              <datalist id="addres">
                <option value="0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"></option>
                <option value="0x90F79bf6EB2c4f870365E785982E1f101E93b906"></option>
                <option value="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"></option>
              </datalist>

              <PrimaryButton onClick={addAdress} height={"43px"}>
                добавить
              </PrimaryButton>
            </AdressBlock>

            {inBaseAddress &&
              inBaseAddress.map((item) => <BaseAddress>{item}</BaseAddress>)}
          </InputInfo>
        </VoteBlock>
      </VoteWraper>

      {isNotification && <Notification>Опрос создан</Notification>}
    </VotePlace>
  );
};

export default VoteCreatePage;
