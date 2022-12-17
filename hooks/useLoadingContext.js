import React, { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

const useLoadingContext = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw Error("useLoadingContext must be used inside a AppContextProvider");
  }

  return context;
};

export default useLoadingContext;
