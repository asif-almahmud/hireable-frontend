import { createContext, useState, useEffect, useReducer } from "react";

export const ProfileContext = createContext();

let initialState = null;

export const userReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD":
      return { ...action.payload };
    case "RESET":
      return null;
    default:
      return prevState;
  }
};

export const ProfileContextProvider = ({ children }) => {
  const [profile, dispatchProfile] = useReducer(userReducer, initialState);
  console.log("Loading State from ProfileContextProvider: ", {
    profile,
  });

  return (
    <ProfileContext.Provider value={{ profile, dispatchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
