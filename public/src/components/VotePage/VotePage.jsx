import React, { useEffect, useState } from "react";
import styled from "styled-components";

const VoteWraper = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100wh;
`;

const VoteBlock = styled.div`
  width: 1520px;
  height: 761px;

  padding: 40px;
  background: var(--background);
  border-radius: 10px;
  box-shadow: 5px 2px 18px rgba(0, 0, 0, 0.08);
`;

const MainQuestionPlace = styled.h2`
    margin-bottom: 60px;
`;

const SecondQuestionPlace = styled.h3`
    margin-bottom: 20px;
`;



const VotePage = () => {
  const [id, setId] = useState("");

  useEffect(() => {
    const currentPageUrl = window.location.href;
    const dataIndex = currentPageUrl.indexOf("/data/");
    setId(currentPageUrl.substring(dataIndex + "/data/".length));
  }, []);

  return (
    <div>
      {/* <h2>Product Page: {id}</h2> */}
      <VoteWraper>
        <VoteBlock>
            {/* {id} */}
            <MainQuestionPlace>Тема: Кибербезопасность и цифровая приватность</MainQuestionPlace>
            <SecondQuestionPlace>Какие шаги следует предпринять для обеспечения кибербезопасности и защиты цифровой приватности на мировом уровне?</SecondQuestionPlace>

            <div>
                <div>Международные стандарты кибербезопасности</div>
                <div>Международные стандарты кибербезопасности</div>
                <div>Международные стандарты кибербезопасности</div>
                <div>Международные стандарты кибербезопасности</div>
            </div>

        </VoteBlock>
      </VoteWraper>
    </div>
  );
};

export default VotePage;
