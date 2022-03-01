export const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  isConnected: JSON.parse(localStorage.getItem("isConnected")) || false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  wallet: localStorage.getItem("wallet") || null,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  proxy_url: process.env.REACT_APP_PROXY_URL,
  scan_url: process.env.REACT_APP_SCAN_URL,
  blockchain_url: process.env.REACT_APP_BLOCKCHAIN_URL,
  web3: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("isLoggedIn", action.payload.isLoggedIn)
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user
      };
    }
    case "LOGOUT": {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    case "CONNECT": {
      localStorage.setItem("isConnected", action.payload.isConnected)
      localStorage.setItem("wallet", action.payload.wallet)
      return {
        ...state,
        isConnected: action.payload.isConnected,
        wallet: action.payload.wallet
      };
    }
    case "DISCONNECT": {
      localStorage.removeItem("isConnected");
      localStorage.removeItem("wallet");
      return {
        ...state,
        isConnected: false,
        wallet: null
      };
    }
    case "WEB3": {
      return {
        ...state,
        web3: action.payload.web3,
      };
    }
    default:
      return state;
  }
};
