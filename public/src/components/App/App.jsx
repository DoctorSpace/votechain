import React, { useEffect } from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { initContractX } from "../../utils/initContractX";
import { setContactData } from "../../store/features/contractSlice";
import { useDispatch } from "react-redux";
import MainPage from "../MainPage/MainPage";
import Header from "../Header/Header";
import VotePage from "../VotePage/VotePage";
import VoteCreatePage from "../VoteCreatePage/VoteCreatePage";
import ProfilePage from "../ProfilePage/ProfilePage";
import CheckPage from "../CheckPage/CheckPage";
import ResultPage from "../ResultPage/ResultPage";

const AppWraper = styled.div`
  margin: auto;
  max-width: 1400px;
`;

function App() {
  const dispatch = useDispatch();

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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create" element={<VoteCreatePage />} />
        <Route path="/check" element={<CheckPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/vote/:data" element={<VotePage />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </AppWraper>
  );
}

export default App;
