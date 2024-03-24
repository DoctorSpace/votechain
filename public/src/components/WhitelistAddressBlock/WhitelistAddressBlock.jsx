import React, { useState } from "react";
import { initContractX } from "../../utils/initContractX";
import { contractFunctions } from "../../utils/contractFunctions";
import { useSelector } from "react-redux";

const WhitelistAddressBlock = ({ wallet }) => {
  const [address, setAddress] = useState("");
  const contract = useSelector((state) => state.contract.data)

  // TODO
  // Проверка если ввели больше одно адресса, добавить больше

  const addWhiteList = async () => {
    console.log(wallet);
    await contractFunctions.addWhitelistAddress(contract, wallet);
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
