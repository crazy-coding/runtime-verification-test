import React, { createContext, useReducer } from 'react';
import Home from "./components/Home";
import { initialState, reducer } from "./store/reducer";

export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Home />
    </AuthContext.Provider>
  );
}

export default App;
