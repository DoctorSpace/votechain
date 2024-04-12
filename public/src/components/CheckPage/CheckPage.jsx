import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Web3 from "web3";
import { shortening } from "../../utils/shortening";

const Wraper = styled.div`
  margin-top: 100px;
  width: 100wh;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: start;

  gap: 20px;
  height: 50vh;

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

const Block = styled.div`
  background-color: var(--background);
  box-shadow: 5px 2px 18px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;

  width: 400px;
  height: 200px;

  p{
    font-size: 12px;
  }
`;

const CheckPage = () => {
  const [blocks, setBlocks] = useState([]);
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

  useEffect(() => {
    // Функция для загрузки всех блоков
    const fetchBlocks = async () => {
      try {
        // Получение последнего номера блока
        const latestBlockNumber = await web3.eth.getBlockNumber();

        const blocksData = [];
        // Итерация по блокам от 0 до последнего
        for (
          let blockNumber = 0;
          blockNumber <= latestBlockNumber;
          blockNumber++
        ) {
          // Получение данных о блоке
          const block = await web3.eth.getBlock(blockNumber);

          console.log(block);

          const timestamp = Number(block.timestamp);
          const date = new Date(timestamp * 1000);
          const formattedDate = date.toLocaleString();

          if (blockNumber === 0) {
            blocksData.push({
              number: Number(block.number),
              parentHash: "INIT",
              receiptsRoot: block.receiptsRoot,
              stateRoot: block.stateRoot,
              hash: block.hash,
              timestamp: formattedDate,
              transactions: '1',
            });
          } else {
            
            blocksData.push({
              number: Number(block.number),
              hash: block.hash,
              parentHash: block.parentHash,
              timestamp: formattedDate,
              transactions: String(block.transactions),
            });
          }
        }

        setBlocks(blocksData);
      } catch (error) {
        console.error("Error fetching block data:", error);
      }
    };

    // Вызываем функцию загрузки блоков при монтировании компонента
    fetchBlocks();
  }, []);

  return (
    <Wraper ref={contentBlockRef} onWheel={handleWheel}>
      <WraperBlocks>
        {/* <Block>
          <h3>Блок</h3>
          <h4>hash</h4>
        </Block> */}

        {blocks.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <>
            {blocks.map((block) => (
              <Block key={block.number}>
                <p>Block number: {block.number}</p>
                <p>parentHash: {shortening(block.parentHash)}</p>
                <p>Block hash: {shortening(block.hash)}</p>
                <p>Transactions: {shortening(block.transactions)}</p>
                <p>timestamp: {block.timestamp}</p>
              </Block>
            ))}
          </>
        )}
      </WraperBlocks>
    </Wraper>
  );
};

export default CheckPage;
