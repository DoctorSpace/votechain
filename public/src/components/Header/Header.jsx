import React, { useEffect, useState } from "react";
import Web3 from "web3";
import styled from "styled-components";
import Votebox from "../../image/Votebox.svg";
import Metamask from "../../image/metamask.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAddressData } from "../../store/features/addressSlice";
import { shortening } from "../../utils/shortening";
import Notification from "../UI/Notification/Notification";

const HeaderWraper = styled.div`
  margin-top: 10px;
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
`;

const IconWraper = styled.button`
  cursor: pointer;
  display: flex;
  gap: 6px;
  align-items: center;

  border: 0;
  background-color: var(--background);

  img {
    width: 50px;
  }

  h1 {
    font-size: 24px;
  }
`;

const InfoWraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MetaMaskLinlk = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;

  border: 1px solid var(--main);
  padding: 0 10px;
  border-radius: 6px;

  p {
    font-size: 12px;
  }

  img {
    height: 28px;
  }
`;

const AddressBlock = styled.p`
  font-size: 10px;

  display: inline-block;
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  user-select: all;
`;

const BalanceBlock = styled.p`
  font-size: 12px;
`;

const Header = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const dispatch = useDispatch();

  // Функция для проверки наличия MetaMask
  const checkMetaMaskInstalled = () => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetaMaskInstalled(true);
    } else {
      setIsMetaMaskInstalled(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard
      .writeText(currentAccount)
      .then(() => {
        console.log("Значение скопировано в буфер обмена:", currentAccount);

        setIsNotification(true);
        setTimeout(() => {
          setIsNotification(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Ошибка при копировании в буфер обмена:", error);
      });
  };

  const getCurrentAccount = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
          console.log(accounts[0]);
          dispatch(setAddressData(accounts[0]));
          getBalance(accounts[0]);
        } else {
          setCurrentAccount("");
          dispatch(setAddressData(""));
          setBalance(0);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getBalance = async (account) => {
    try {
      const web3 = new Web3(window.ethereum);
      const weiBalance = await web3.eth.getBalance(account);
      const ethBalance = web3.utils.fromWei(weiBalance, "ether");
      setBalance(parseFloat(ethBalance));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkMetaMaskInstalled();
    if (isMetaMaskInstalled) {
      getCurrentAccount();
      window.ethereum.on("accountsChanged", getCurrentAccount);
      return () => {
        window.ethereum.removeListener("accountsChanged", getCurrentAccount);
      };
    }
  }, [isMetaMaskInstalled]);

  return (
    <HeaderWraper>
      <Link to="/">
        <IconWraper>
          <img src={Votebox} alt="icon Votebox" />
          <h1>votechain</h1>
        </IconWraper>
      </Link>

      {isMetaMaskInstalled ? (
        <InfoWraper>
          <AddressBlock onClick={copyAddress}>
            {shortening(currentAccount)}
          </AddressBlock>
          <BalanceBlock>{balance} ETH</BalanceBlock>
        </InfoWraper>
      ) : (
        <MetaMaskLinlk href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?Hl=ru&pli=1">
          <img src={Metamask} alt="Metamask icon"></img>
          <p>Нужно установить MetaMask</p>
        </MetaMaskLinlk>
      )}

      {isNotification && <Notification>Скопировано</Notification>}
    </HeaderWraper>
  );
};

export default Header;
