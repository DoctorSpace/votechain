import React, { useState } from "react";
import { createVotingABI } from "../../abi/abi";
import { initContractX } from "../../utils/initContractX";
import { contractFunctions } from "../../utils/contractFunctions";

const CreateVotingBlock = ({ wallet }) => {
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [contract, setContract] = useState(null);

  const initContract = async () => {
    setContract(await initContractX(createVotingABI, wallet));
  };

  const createVoting = async () => {
    contractFunctions.createVoting(
      contract,
      wallet,
      question,
      name,
      option1,
      option2,
      option3
    );
  };

  return (
    <div>
      <button onClick={initContract}>Init Contract</button>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={option1}
        onChange={(e) => setOption1(e.target.value)}
        placeholder="Option 1"
      />
      <input
        type="text"
        value={option2}
        onChange={(e) => setOption2(e.target.value)}
        placeholder="Option 2"
      />
      <input
        type="text"
        value={option3}
        onChange={(e) => setOption3(e.target.value)}
        placeholder="Option 3"
      />
      <button onClick={createVoting}>Create Voting</button>
    </div>
  );
};

export default CreateVotingBlock;
