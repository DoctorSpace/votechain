import React, { useEffect, useState } from "react";
import { ethers, formatEther } from "ethers";
import CreateVotingBlock from "../CreateVotingBlock/CreateVotingBlock";
import WhitelistAddressBlock from "../WhitelistAddressBlock/WhitelistAddressBlock";

function App() {
  // const [nonce, setNonce] = useState(-1);

  const [wallet, setWallet] = useState(0);
  const [balance, setBalance] = useState(0);

  let signer = null;
  let provider;

  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
  }

  useEffect(() => {
    const connectWallet = async () => {
      signer = await provider.getSigner();
      setWallet(signer.address);
    };

    const getData = async () => {
      if (wallet == null) return;

      let count = await provider.getBalance(wallet);
      setBalance(formatEther(count));
    };

    connectWallet().catch(console.error);
    getData().catch(console.error);
  }, [wallet]);

  return (
    <div className="App">
      <h1>{balance}</h1>
      <CreateVotingBlock wallet={wallet} />
      <WhitelistAddressBlock wallet={wallet} />
    </div>
  );
}

export default App;
