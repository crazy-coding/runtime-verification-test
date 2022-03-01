import React, { useState, useContext, useEffect } from "react";
import Styled from "styled-components";
import BlockChainIcon from "mdi-react/BlockChainIcon";
import { AuthContext } from "../App";

const CONTRACT = "0x706D34aC0993C1f6AA147Fed229543E23A377254";
const ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "un",
				"type": "string"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

export default function Blockchain() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ isExist: false, errorMessage: "", isLoading: false });
  const [rvTest, setRVTest] = useState({});

  useEffect(() => {
    if (state.web3.eth) {
      const ervTest = new state.web3.eth.Contract(ABI, CONTRACT);
      setRVTest(ervTest);
    }
  }, [state.web3.eth]);

  useEffect(() => {
    if (rvTest.methods) {
      checkAccount()
    }
  }, [state.isLoggedIn, state.isConnected, rvTest.methods])

  const checkAccount = async () => {
    setData({...data, isLoading: true});
    const account = await rvTest.methods.get().call();
    console.log(account, "000")
    setData({...data, isExist: account === state.user?.login, isLoading: false});
  }

  const handleSet = async () => {
    await rvTest.methods.set(state.user?.login).send({ from: state.wallet });
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
            className={`login-link ${state.isLoggedIn && state.isConnected ? '' : 'disabled'}`}
            onClick={() => handleSet()}
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
          {data.isExist && <span>correlated on blockchain</span>}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = Styled.section`

`;
