import React from "react";
import Styled from "styled-components";
import Blockchain from "./Blockchain";
import Database from "./Database";
import Github from "./Github";
import Wallet from "./Wallet";

export default function Home() {
  return (
    <Wrapper>
      <div className="container">
        <Github />
        <Wallet />
        <Database />
        <Blockchain />
      </div>
    </Wrapper>
  );
}

const Wrapper = Styled.section`
.container{
  display: flex;
  flex-direction: column;

  .section{
    margin: 40px 40px 0 40px;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 20px 15px;
  
    .login-link {
      text-decoration: none;
      border-radius: 3px;
      justify-content: center;
      background: #000;
      color: #fff;
      text-transform: uppercase;
      cursor: default;
      display: flex;
      align-items: center;          
      height: 40px;
  
      > span:nth-child(2) {
        margin-left: 5px;
      }

      &.disabled {
        background: grey;
      }
    }
    
    .loader-container {
      display: flex;
      justify-content: center;
      align-items: center;          
      height: 40px;
      background: #000;
      border-radius: 3px;
  
      .loader {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        animation: spin 2s linear infinite;
      }
  
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}
`;
