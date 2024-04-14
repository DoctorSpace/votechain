import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Web3 from "web3";
import { shortening } from "../../utils/shortening";
import PrimaryInput from "../UI/PrimaryInput/PrimaryInput";
import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";

const Wraper = styled.div`
  margin-top: 100px;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: start;

  gap: 20px;
  height: 56vh;

  box-shadow: 5px 2px 18px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  background-color: var(--background);

  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  padding: 0 100px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--main); /* Цвет полосы прокрутки */
    border-radius: 5px; /* Округлите края полосы прокрутки */
  }

  &::-webkit-scrollbar-track {
    background-color: var(--second); /* Цвет трека полосы прокрутки */
    border-radius: 0 0 5px 5px;
  }
`;

const WraperBlocks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const CheckBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`;

const CheckInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  justify-content: center;
`;

const Block = styled.div`
  background-color: var(--background);
  box-shadow: 5px 2px 18px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  position: relative;

  padding: 20px;

  width: 400px;
  height: 250px;
`;

const BlockEmpty = styled.div`
  background-color: var(--background-red);
  box-shadow: 5px 2px 18px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  position: relative;

  padding: 20px;

  width: 400px;
  height: 250px;
`;

const BlockNumber = styled.p`
  position: absolute;
  right: 20px;

  width: 30px;
  height: 30px;
  background-color: var(--main);
  color: var(--background);

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 100%;
`;

const BlockTimes = styled.p`
  font-size: 16px;
`;

const BlockInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  justify-content: center;
  align-items: center;
  gap: 6px;

  p {
    font-size: 14px;
    border: 1px solid var(--main);
    padding: 10px 30px;
    letter-spacing: 1px;
    border-radius: 6px;
  }
`;

const BlockSpan = styled.span`
  background-color: var(--second);
  padding: 4px 12px;
`;

const CheckPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [hash, setHash] = useState("");
  const [blockNumber, setBlockNumber] = useState(null);
  const [emptyBlock, setEmptyBlock] = useState(false);

  const contentBlockRef = useRef(null);

  const handleWheel = (event) => {
    event.preventDefault();
    if (event.deltaY < 0) {
      contentBlockRef.current.scrollLeft -= 100;
    } else {
      contentBlockRef.current.scrollLeft += 100;
    }
  };

  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://127.0.0.1:8545")
  );

  const findBlock = async () => {
    try {
      const transaction = await web3.eth.getTransactionFromBlock(hash, 0);
      setBlockNumber(Number(transaction.blockNumber));
    } catch (err) {
      setEmptyBlock(true);
      console.error(err);
    }
  };

  const resetData = async () => {
    setHash("");
    setBlockNumber(null);
    setEmptyBlock(false);
  };

  const filteredBlocks = blocks.filter(
    (block) => block.number === parseInt(blockNumber)
  );

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const latestBlockNumber = await web3.eth.getBlockNumber();

        const blocksData = [];
        for (
          let blockNumber = 0;
          blockNumber <= latestBlockNumber;
          blockNumber++
        ) {
          const block = await web3.eth.getBlock(blockNumber);
          const timestamp = Number(block.timestamp);
          const date = new Date(timestamp * 1000);
          const formattedDate = date.toLocaleString();

          if (blockNumber === 0) {
            blocksData.push({
              number: Number(block.number),
              parentHash: "INIT",
              receiptsRoot: block.receiptsRoot,
              stateRoot: block.stateRoot,
              hash: shortening(block.hash),
              timestamp: formattedDate,
              transactions: "INIT",
            });
          } else {
            blocksData.push({
              number: Number(block.number),
              hash: shortening(block.hash),
              parentHash: shortening(block.parentHash),
              timestamp: formattedDate,
              transactions: shortening(String(block.transactions)),
            });
          }
        }

        setBlocks(blocksData);
      } catch (error) {
        console.error("Error fetching block data:", error);
      }
    };

    fetchBlocks();
  }, []);

  return (
    <Wraper ref={contentBlockRef} onWheel={handleWheel}>
      <CheckBlock>
        <h3>Проверка блока</h3>
        <CheckInput>
          <PrimaryInput
            type="text"
            width={"540px"}
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="Hash"
          />
          <PrimaryButton height="43px" width={"120px"} onClick={findBlock}>
            Найти
          </PrimaryButton>
          <PrimaryButton height="43px" width={"40px"} onClick={resetData}>
            Х
          </PrimaryButton>
        </CheckInput>
      </CheckBlock>
      <WraperBlocks>
        {blocks.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <>
            {!emptyBlock ? (
              blockNumber ? (
                filteredBlocks.map((block) => (
                  <Block key={block.number}>
                    <BlockNumber>{block.number}</BlockNumber>
                    <BlockTimes>{block.timestamp}</BlockTimes>
                    <BlockInfo>
                      <p>
                        Block hash: <BlockSpan>{block.hash}</BlockSpan>
                      </p>
                      <p>Transactions: {block.transactions}</p>
                      <p>parentHash: {block.parentHash}</p>
                    </BlockInfo>
                  </Block>
                ))
              ) : (
                blocks.map((block) => (
                  <Block key={block.number}>
                    <BlockNumber>{block.number}</BlockNumber>
                    <BlockTimes>{block.timestamp}</BlockTimes>
                    <BlockInfo>
                      <p>
                        Block hash: <BlockSpan>{block.hash}</BlockSpan>
                      </p>
                      <p>Transactions: {block.transactions}</p>
                      <p>ParentHash: {block.parentHash}</p>
                    </BlockInfo>
                  </Block>
                ))
              )
            ) : (
              <BlockEmpty>
                <BlockInfo>
                  <p>Блок отсутствует</p>
                </BlockInfo>
              </BlockEmpty>
            )}
          </>
        )}
      </WraperBlocks>
    </Wraper>
  );
};

export default CheckPage;
