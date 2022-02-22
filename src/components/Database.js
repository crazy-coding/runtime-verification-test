import React, { useState, useContext } from "react";
import Styled from "styled-components";
import DatabaseAddIcon from "mdi-react/DatabaseAddIcon";
import { AuthContext } from "../App";


export default function Database() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ items: [], errorMessage: "", isLoading: false });

  const handleScan = () => {
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
        console.log(data[0])
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
            onClick={() => state.isLoggedIn && state.isConnected ? handleScan() : {}}
          >
            <DatabaseAddIcon />
            <span>Scan in Database</span>
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
