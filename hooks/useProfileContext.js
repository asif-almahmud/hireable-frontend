import React, { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";

const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw Error("useProfileContext must be used inside a AppContextProvider");
  }

  return context;
};

export default useProfileContext;
