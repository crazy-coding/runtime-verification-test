import React, { useContext, useEffect, useState } from "react";
import Styled from "styled-components";
import { AuthContext } from "../App";
import GithubIcon from "mdi-react/GithubIcon";


export default function Github() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const { client_id, redirect_uri } = state;

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        code: newUrl[1]
      };

      const proxy_url = state.proxy_url;

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxy_url, {
        method: "POST",
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: "LOGIN",
            payload: { user: data, isLoggedIn: true }
          });
        })
        .catch(error => {
          setData({
            isLoading: false,
            errorMessage: "Sorry! Login failed"
          });
        });
    }
  }, [state, dispatch, data]);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
    window.location.href = '';
  }

  return !state.isLoggedIn ? (
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
            href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
            onClick={() => {
              setData({ ...data, errorMessage: "" });
            }}
          >
            <GithubIcon />
            <span>Sign in with GitHub</span>
          </a>
        )}
      </div>
    </Wrapper>
  ) : (
    <Wrapper>
      <div className="section">
        <div className="github-info">
          <img src={state.user?.avatar_url} alt="Avatar"/>
          <div className="content">
            <span>{state.user?.login}</span>
            <span>{state.user?.public_repos} Repos</span>
            <span>{state.user?.followers} Followers</span>
            <span>{state.user?.following} Following</span>
          </div>
        </div>
        <a
          className="login-link"
          onClick={()=> handleLogout()}
        >
          <span>Logout</span>
        </a>
      </div>
    </Wrapper>
  );
}

const Wrapper = Styled.section`
.section{
  img {
    width: 100px;
    height: 100px;
  }

  .github-info {
    display: flex;
    margin-bottom: 15px;

    .content {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
    }
  }
}
`;