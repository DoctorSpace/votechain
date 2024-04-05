import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
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
import MainPage from "../MainPage/MainPage";
import Header from "../Header/Header";
import VotePage from "../VotePage/VotePage";
import VoteCreatePage from "../VoteCreatePage/VoteCreatePage";

const AppWraper = styled.div`
  margin: auto;
  max-width: 1400px;
`;

function App() {
  // const [nonce, setNonce] = useState(-1);

  //   const [wallet, setWallet] = useState(0);
  //   const [balance, setBalance] = useState(0);
  const [result, setResult] = useState(null);

  const dispatch = useDispatch();
  const contract = useSelector((state) => state.contract.data);

  //   let signer = null;
  //   let provider;

  //   if (window.ethereum == null) {
  //     console.log("MetaMask not installed; using read-only defaults");
  //     provider = ethers.getDefaultProvider();
  //     // console.log(provider);
  //   } else {
  //     provider = new ethers.BrowserProvider(window.ethereum);
  //     // console.log(provider);
  //   }

  //   useEffect(() => {
  //     const connectWallet = async () => {
  //       signer = await provider.getSigner();
  //       // console.log(signer);
  //       setWallet(signer);
  //     };

  //     const getData = async () => {
  //       if (wallet == null) return;

  //       let count = await provider.getBalance(wallet.address);
  //       setBalance(formatEther(count));
  //     };

  //     connectWallet().catch(console.error);
  //     getData().catch(console.error);
  //   }, []);

  ////

  useEffect(() => {
    const fetchData = async () => {
      let contract1 = await initContractX();
      dispatch(setContactData(contract1));
    };

    fetchData().catch(console.error);
  }, [dispatch]);

  return (
    <AppWraper>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='*' element={<MainPage />} />
        <Route path='/create' element={<VoteCreatePage />} />

        <Route path="/vote/:data" element={<VotePage />} />

      </Routes>
      {/* <OptionsBlock /> */}

      {/* <h1>{balance}</h1> */}
      {/* <CreateVotingBlock wallet={wallet} />
      <WhitelistAddressBlock wallet={wallet.address} />
      <VoteBlock wallet={wallet.address} />
      <OptionsBlock wallet={wallet.address} /> */}
    </AppWraper>
  );
}

export default App;
