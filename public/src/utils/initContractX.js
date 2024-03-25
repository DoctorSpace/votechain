import Web3 from "web3";
import { votingABI } from "../abi/abi";

export const initContractX = async () => {
  // Подключение к локальному узлу Ethereum
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://127.0.0.1:8545")
  );

  // Загрузка контракта
  const contractAddress = "0x663F3ad617193148711d28f5334eE4Ed07016602";
  const contract = new web3.eth.Contract(votingABI, contractAddress);

  return contract
};
