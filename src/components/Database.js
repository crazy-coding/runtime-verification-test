import React, { useState, useContext, useEffect } from "react";
import Styled from "styled-components";
import DatabaseAddIcon from "mdi-react/DatabaseAddIcon";
import { AuthContext } from "../App";


export default function Database() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ items: [], errorMessage: "", isLoading: false });

  useEffect(() => {
    handleScan();
  }, [state.isLoggedIn, state.isConnected, state.wallet])

  const handleStore = () => {
    const scan_url = state.scan_url;

    const requestData = {
      wallet: state.wallet,
      username: state.user?.login,
    };

    fetch(scan_url, {
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
        console.log(error)
        setData({
          isLoading: false,
          errorMessage: "Sorry! Login failed"
        });
      });
  }

  const handleScan = () => {
    const scan_url = state.scan_url;

    fetch(`${scan_url}?wallet=${state.wallet}&username=${state.user?.login}`)
      .then(response => response.json())
      .then(data => {
        setData({
          ...data[0],
          isLoading: false,
        });
      })
      .catch(error => {
        console.log("23error323", error)
        setData({
          isLoading: false,
          errorMessage: "Sorry! Login failed"
        });
      });
  }

  return !data.username ? (
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
            onClick={() => state.isLoggedIn && state.isConnected ? handleStore() : {}}
          >
            <DatabaseAddIcon />
            <span>Store DataBase</span>
          </a>
        )}
      </div>
    </Wrapper>
  ) : (
    <Wrapper>
      <div className="section">
        <div className="database-info">
          <span>{data.username ? "correlated on back-end" : ""}</span>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = Styled.section`
.database-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
`;
