import React from "react";
import { InitialMessageContextProvider } from "../InitialMessageContext";
import { LoadingContextProvider } from "../LoadingContext";
import { ProfileContextProvider } from "../ProfileContext";
import { UserContextProvider } from "../UserContext";

const AppContextProvider = ({ children }) => {
  return (
    <UserContextProvider>
      <LoadingContextProvider>
        <ProfileContextProvider>
          <InitialMessageContextProvider>
            {children}
          </InitialMessageContextProvider>
        </ProfileContextProvider>
      </LoadingContextProvider>
    </UserContextProvider>
  );
};

export default AppContextProvider;
