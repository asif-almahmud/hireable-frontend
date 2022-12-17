import React from "react";
import useInitialMessageContext from "../../hooks/useInitialMessageContext";
import styles from "./styles.module.css";

const InitialMessage = () => {
  const { hide, dispatchInitialMessageState } = useInitialMessageContext();
  return (
    <div className={styles.container + " " + `${hide ? styles.hide : ""}`}>
      render.com service is used to deploy the backend. The free tier of
      render.com has a 15 minute inactivity policy to spin off the server. This
      is why you may experience some delay on recieving the response for the
      first request from the server.
      <i
        className={styles.icon + " " + "uil uil-times"}
        onClick={() => dispatchInitialMessageState({ type: "HIDE" })}
      ></i>
    </div>
  );
};

export default InitialMessage;
