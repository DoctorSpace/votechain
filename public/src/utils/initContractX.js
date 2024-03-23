import Web3 from "web3";

export const initContractX = async (ABI, wallet) => {
  if (window.ethereum) {

    console.log(ABI);
    console.log(wallet);

    const web3Instance = new Web3(window.ethereum);
    await window.ethereum.enable();

    // Адрес контракта и его ABI
    const contractInstance = new web3Instance.eth.Contract(
      ABI,
      wallet
    );

    console.log(contractInstance);

    return contractInstance
  }
};
