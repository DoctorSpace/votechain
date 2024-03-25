import React, { useState } from "react";
import { contractFunctions } from "../../utils/contractFunctions";
import { useSelector } from "react-redux";

const VoteBlock = ({ wallet }) => {
  const [name, setName] = useState("");
  const [option, setOption] = useState("");

  const contract = useSelector((state) => state.contract.data);

  const vote = async () => {
    if (!name || !option) return;

    await contractFunctions.vote(contract, wallet, name, option);
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={option}
        onChange={(e) => setOption(e.target.value)}
        placeholder="Option"
      />

      <button onClick={vote}>--- Vote ---</button>
    </div>
  );
};

export default VoteBlock;
