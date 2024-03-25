import React, { useEffect, useState } from "react";
import { ethers, formatEther } from "ethers";
import CreateVotingBlock from "../CreateVotingBlock/CreateVotingBlock";
import WhitelistAddressBlock from "../WhitelistAddressBlock/WhitelistAddressBlock";
import OptionsBlock from "../OptionsBlock/OptionsBlock";
import Web3 from "web3";
import { votingABI } from "../../abi/abi";
import { initContractX } from "../../utils/initContractX";

import { setContactData } from "../../store/features/contractSlice";
import { useSelector, useDispatch } from "react-redux";
import VoteBlock from "../VoteBlock/VoteBlock";

function App() {
  // const [nonce, setNonce] = useState(-1);

  const [wallet, setWallet] = useState(0);
  const [balance, setBalance] = useState(0);
  const [result, setResult] = useState(null);

  const dispatch = useDispatch();
  const contract = useSelector((state) => state.contract.data);

  let signer = null;
  let provider;

  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider();
    // console.log(provider);
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
    // console.log(provider);
  }

  useEffect(() => {
    const connectWallet = async () => {
      signer = await provider.getSigner();
      // console.log(signer);
      setWallet(signer);
    };

    const getData = async () => {
      if (wallet == null) return;

      let count = await provider.getBalance(wallet.address);
      setBalance(formatEther(count));
    };

    connectWallet().catch(console.error);
    getData().catch(console.error);
  }, []);

  ////


  useEffect(() => {
    const fetchData = async () => {

      let contract1 = await initContractX()
      dispatch(setContactData(contract1));

      console.log('contract1', contract1);
      // setResult(contract1)

      // dispatch(setContactData(await initContractX()));

      try {
        //123458
        const result = await contract1.methods.getOption2("123456").call();

        setResult(result);
      } catch (error) {
        console.error("Ошибка вызова функции myFunction:", error);
      }
    }

    fetchData().catch(console.error);
  }, []);

  return (
    <div className="App">
      {result ? (
        <div>
          <p>Результат функции myFunction:</p>
          <p>Number: {result}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <h1>{balance}</h1>
      <CreateVotingBlock wallet={wallet} />
      <WhitelistAddressBlock wallet={wallet.address} />
      <VoteBlock wallet={wallet.address}/>
      <OptionsBlock wallet={wallet.address} />
    </div>
  );
}

export default App;
