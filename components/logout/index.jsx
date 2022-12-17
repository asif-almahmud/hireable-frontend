import React from "react";
import Link from "next/link";
import styles from "../navbar/styles.module.css";
import useUserContext from "../../hooks/useUserContext";
import useProfileContext from "../../hooks/useProfileContext";

const Logout = () => {
  const { dispatch } = useUserContext();
  const { dispatchProfile } = useProfileContext();
  const handleLogout = () => {
    localStorage.removeItem("hireable_user");
    dispatchProfile({ type: "RESET" });
    dispatch({ type: "LOGOUT" });
  };
  return (
    <Link href="/login" className={styles.nav_option} onClick={handleLogout}>
      Logout
    </Link>
  );
};

export default Logout;
