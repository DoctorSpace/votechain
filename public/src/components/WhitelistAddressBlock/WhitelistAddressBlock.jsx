import React, { useState } from "react";
import { initContractX } from "../../utils/initContractX";
import { contractFunctions } from "../../utils/contractFunctions";

const WhitelistAddressBlock = ({ wallet }) => {
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState(null);

  // TODO
  // Проверка если ввели больше одно адресса, добавить больше


  const addWhiteList = async () => {

    console.log(wallet);
    // setContract(await initContractX('0x90F79bf6EB2c4f870365E785982E1f101E93b906'));
    setContract(await initContractX(wallet));

    await contractFunctions.addWhitelistAddress(contract, wallet)
  };

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      <button onClick={addWhiteList}>Add White List</button>
    </div>
  );
};

export default WhitelistAddressBlock;
