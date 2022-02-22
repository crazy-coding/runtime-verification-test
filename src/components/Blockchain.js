import React, { useState, useContext } from "react";
import Styled from "styled-components";
import BlockChainIcon from "mdi-react/BlockChainIcon";
import { AuthContext } from "../App";


export default function Blockchain() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ items: [], errorMessage: "", isLoading: false });

  const handleScan = () => {
    const blockchain_url = state.blockchain_url;

    const requestData = {
      wallet: state.wallet,
      username: state.user?.login,
    };

    fetch(blockchain_url, {
      method: "POST",
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => {
        setData({
          ...data[0],
          isLoading: false,
        });
      })
      .catch(error => {
        setData({
          isLoading: false,
          errorMessage: "Sorry! Login failed"
        });
      });
  }

  return !data.tx ? (
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
            onClick={() => handleScan()}
          >
            <BlockChainIcon />
            <span>Store Ethereum</span>
          </a>
        )}
      </div>
    </Wrapper>
  ) : (
    <Wrapper>
      <div className="section">
        <div className="wallet-info">
          <span>{data.tx}</span>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = Styled.section`

`;
