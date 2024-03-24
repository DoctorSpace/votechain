import React, { useState } from "react";
import { initContractX } from "../../utils/initContractX";
import { contractFunctions } from "../../utils/contractFunctions";
import { useSelector } from "react-redux";

const OptionsBlock = ({ wallet }) => {
  const [question, setQuestion] = useState("Question");
  const [option1, setOption1] = useState("Option1");
  const [option2, setOption2] = useState("Option2");
  const [option3, setOption3] = useState("Option3");
  const [name, setName] = useState("");
  //   const [contract, setContract] = useState(null);


  const contract = useSelector((state) => state.contract.data)

  const getVoteInfo = async () => {
    if (!name) return;

    // const contract = localStorage.getItem("contract");
    // setContract(await initContractX(wallet));
    await contractFunctions.getOption1(contract, wallet);
    console.log("getVoteInfo");
  };

  return (
    <div>
      <h3>VoteInfo</h3>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button onClick={getVoteInfo}>get Vote Info</button>
      </div>
      <h4>{question}</h4>
      <ul>
        <li>{option1}</li>
        <li>{option2}</li>
        <li>{option3}</li>
      </ul>
    </div>
  );
};

export default OptionsBlock;
