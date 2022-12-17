import { createContext, useState, useEffect, useReducer } from "react";

export const UserContext = createContext();

export const userReducer = (prevState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...action.payload };
    case "LOGOUT":
      return null;
    default:
      return prevState;
  }
};

// let initialState = localStorage.getItem("hireable_user")
//   ? JSON.parse(localStorage.getItem("hireable_user"))
//   : null;

let initialState = null;

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initialState);
  console.log("User State from UserContextProvider: ", user);

  useEffect(() => {
    let localValue = localStorage.getItem("hireable_user");
    localValue &&
      dispatch({
        type: "LOGIN",
        payload: JSON.parse(localStorage.getItem("hireable_user")),
      });
  }, []);
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
