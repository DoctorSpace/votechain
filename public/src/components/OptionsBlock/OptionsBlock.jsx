import React, { useState } from "react";
import { contractFunctions } from "../../utils/contractFunctions";
import { useSelector } from "react-redux";

const OptionsBlock = ({ wallet }) => {
  const [question, setQuestion] = useState("Question");
  const [option1, setOption1] = useState("Option1");
  const [option2, setOption2] = useState("Option2");
  const [option3, setOption3] = useState("Option3");
  const [whitelist, setWhitelist] = useState("");
  const [iswhitelist, setIsWhitelist] = useState(false);
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  const [allQuestion, setAllQuestion] = useState("");

  const contract = useSelector((state) => state.contract.data);


  const getAllQuestions = async () => {
    setAllQuestion(await contractFunctions.getAllQuestions(contract));
  };


  const getVoteInfo = async () => {
    if (!name) return;
    setOption1(await contractFunctions.getOption1(contract, name));
    setOption2(await contractFunctions.getOption2(contract, name));
    setOption3(await contractFunctions.getOption3(contract, name));
    setQuestion(await contractFunctions.getPollName(contract, name));
  };

  const getResult = async () => {
    if (!name) return;
    setResult(await contractFunctions.getPollCounts(contract, name));
  };

  const getWhiteList = async () => {
    if (!whitelist) return;
    setIsWhitelist(await contractFunctions.isWhitelist(contract, whitelist));
  };

  return (
    <div>
      <h3>get All Questions</h3>
      <div>
        {allQuestion}
        <button onClick={getAllQuestions}>get Vote Info</button>
      </div>

      {/*  */}

      <h3>Vote Info</h3>
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

      {/*  */}

      <h3>Result Voting</h3>
      <h5>{result ? `${result[0]} - ${result[1]} - ${result[2]}` : "-"}</h5>
      <button onClick={getResult}>get Result Voting</button>

      {/*  */}

      <div>
        <h3>Check Address</h3>
        <h5>{iswhitelist ? "true" : "falce"}</h5>

        <input
          type="text"
          value={whitelist}
          onChange={(e) => setWhitelist(e.target.value)}
          placeholder="WhiteList"
        />
        <button onClick={getWhiteList}>is White List</button>
      </div>
    </div>
  );
};

export default OptionsBlock;
