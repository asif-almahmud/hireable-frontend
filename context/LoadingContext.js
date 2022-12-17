import { createContext, useState, useEffect, useReducer } from "react";

export const LoadingContext = createContext();

let initialState = { loading: false, error: null };

export const userReducer = (prevState, action) => {
  switch (action.type) {
    case "RESET":
      return { ...initialState };
    case "LOADING":
      return { ...prevState, loading: action.payload };
    case "LOADING":
      return { ...prevState, loading: action.payload };
    case "ERROR":
      return { ...prevState, error: action.payload };
    default:
      return prevState;
  }
};

export const LoadingContextProvider = ({ children }) => {
  const [{ loading, error }, dispatchLoadingState] = useReducer(
    userReducer,
    initialState
  );
  console.log("Loading State from LoadingContextProvider: ", {
    loading,
    error,
  });

  return (
    <LoadingContext.Provider value={{ loading, error, dispatchLoadingState }}>
      {children}
    </LoadingContext.Provider>
  );
};
