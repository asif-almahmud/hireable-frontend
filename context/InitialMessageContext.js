import { createContext, useState, useEffect, useReducer } from "react";

export const InitialMessageContext = createContext();

let initialState = { hide: false };

export const userReducer = (prevState, action) => {
  switch (action.type) {
    case "HIDE":
      return { hide: true };
    default:
      return prevState;
  }
};

export const InitialMessageContextProvider = ({ children }) => {
  const [{ hide }, dispatchInitialMessageState] = useReducer(
    userReducer,
    initialState
  );

  return (
    <InitialMessageContext.Provider
      value={{ hide, dispatchInitialMessageState }}
    >
      {children}
    </InitialMessageContext.Provider>
  );
};
