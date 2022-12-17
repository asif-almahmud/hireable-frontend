import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import Logout from "../logout";
import useUserContext from "../../hooks/useUserContext";

const Navbar = () => {
  const { user, dispatch } = useUserContext();
  useEffect(() => {
    let localValue = localStorage.getItem("hireable_user");
    localValue &&
      dispatch({
        type: "LOGIN",
        payload: JSON.parse(localStorage.getItem("hireable_user")),
      });
  }, []);
  return (
    <>
      <nav className={styles.navbar + " " + "primary"}>
        <div className={styles.container + " " + styles.toolbar}>
          <Link href="/" className={styles.logo + " "}>
            Hireable
          </Link>
          <div className={styles.nav_options}>
            {!user && (
              <Link href="/login" className={styles.nav_option}>
                Login
              </Link>
            )}

            {!user && (
              <Link href="/signup" className={styles.nav_option}>
                Signup
              </Link>
            )}

            {user && <Logout />}
          </div>
        </div>
      </nav>
      <div style={{ width: "100%", height: "70px" }}></div>
    </>
  );
};

export default Navbar;
