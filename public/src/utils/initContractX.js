import Web3 from "web3";
import { votingABI } from "../abi/abi";

export const initContractX = async (wallet) => {
  if (window.ethereum) {

    const web3Instance = new Web3(window.ethereum);
    await window.ethereum.enable();

    // Адрес контракта и его ABI
    const contractInstance = new web3Instance.eth.Contract(votingABI, wallet);

    return contractInstance
    // TODO: добавить в redux
  }
};
