import Web3 from "web3";
import { votingABI } from "../abi/abi";

export const initContractX = async () => {
  // Подключение к локальному узлу Ethereum
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://127.0.0.1:8545")
  );

  console.log('1', web3);

  // Загрузка контракта
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contract = new web3.eth.Contract(votingABI, contractAddress);

  const latestBlockNumber = await web3.eth.getBlockNumber();
  const block = await web3.eth.getBlock(latestBlockNumber);


  const tx = await web3.eth.getTransactionFromBlock(latestBlockNumber, 0);
  console.log('6+++tx', tx);

  const transaction = await web3.eth.getTransaction(tx.hash);

  // "0x1ef585a69f9db4cccd4ee7e56242bde2b7090bd069dacfecb75f77843cd90474" <- tx
  // "0x0d19d467dfbd34e12c8eacce5efdad621f98369c913afd51c73c7e36db3b7555" <- block


  // const transaction = await web3.eth.getTransaction(block.hash);
  // const tx = await web3.eth.getTransaction(block.hash);
  // block.transactions = tx;

  console.log('transaction', transaction);
  console.log('---latestBlocks', block);

  return contract;
};
