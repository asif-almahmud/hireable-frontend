import React, { useContext } from "react";
import { InitialMessageContext } from "../context/InitialMessageContext";

const useInitialMessageContext = () => {
  const context = useContext(InitialMessageContext);

  if (!context) {
    throw Error(
      "useInitialMessageContext must be used inside a AppContextProvider"
    );
  }

  return context;
};

export default useInitialMessageContext;
