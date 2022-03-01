import React, { useContext, useEffect, useState } from "react";
import Styled from "styled-components";
import { AuthContext } from "../App";
import EthereumIcon from "mdi-react/EthereumIcon";
import Web3 from 'web3';

export default function Wallet() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  useEffect(() => {
    connectWallet();
  }, [])

  const connectWallet = async () => {
    const web3 = new Web3(window.ethereum);
    dispatch({
      type: "WEB3",
      payload: { web3 }
    });
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  }

  const handleConnect = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      setData({ ...data, isLoading: true });
      const account = await connectWallet();

      dispatch({
        type: "CONNECT",
        payload: { wallet: account, isConnected: true }
      });
      setData({ ...data, isLoading: false });
    } catch (err) {
      setData({
        isLoading: false,
        errorMessage: "Sorry! Connection failed"
      });
    }
  }

  const handleDisconnect = () => {
    dispatch({
      type: "DISCONNECT"
    });
  }

  return !state.isConnected ? (
    <Wrapper>
      <div className="section">
        <span>{data.errorMessage}</span>
        {data.isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <a
            className="login-link"
            onClick={() => handleConnect()}
          >
            <EthereumIcon />
            <span>Connect to MetaMask wallet</span>
          </a>
        )}
      </div>
    </Wrapper>
  ) : (
    <Wrapper>
      <div className="section">
        <div className="wallet-info">
          <span>Address: {state.wallet}</span>
        </div>
        <a
          className="login-link"
          onClick={() => handleDisconnect()}
        >
          <span>Disconnect</span>
        </a>
      </div>
    </Wrapper>
  );
}

const Wrapper = Styled.section`
.wallet-info {
  margin-bottom: 15px;
}
`;
