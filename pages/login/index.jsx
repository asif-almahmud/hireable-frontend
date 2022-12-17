import { useEffect, useState } from "react";
import useLoadingContext from "../../hooks/useLoadingContext";
import useLogin from "../../hooks/useLogin";
import GeneralLayout from "../../layouts/general";
import styles from "../../styles/form-styles.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({ email: "", password: "" });
  const { login } = useLogin();
  const { loading, error } = useLoadingContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      email.trim() === "" &&
        setErrorMessage((prev) => {
          return { ...prev, email: "Required" };
        });
      password.trim() === "" &&
        setErrorMessage((prev) => {
          return { ...prev, password: "Required" };
        });
      return;
    }
    const emailRegEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegEx.test(email)) {
      setErrorMessage((prev) => {
        return { ...prev, email: "Invalid email address" };
      });
      return;
    }
    if (password.length < 6) {
      setErrorMessage((prev) => {
        return {
          ...prev,
          password: "Minimum 6 characters required",
        };
      });
      return;
    }
    try {
      await login({ email, password });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (email.trim() !== "") {
      setErrorMessage((prev) => {
        return { ...prev, email: "" };
      });
    }
    if (password.trim() !== "") {
      setErrorMessage((prev) => {
        return { ...prev, password: "" };
      });
    }
  }, [email, password]);

  useEffect(() => {
    if (error && error.response.data.error === "Incorrect email") {
      setErrorMessage((prev) => {
        return { ...prev, email: error.response.data.error };
      });
      return;
    } else {
      setErrorMessage((prev) => {
        return { ...prev, email: "" };
      });
    }
    if (error && error.response.data.error === "Incorrect password") {
      setErrorMessage((prev) => {
        return { ...prev, password: error.response.data.error };
      });
      return;
    } else {
      setErrorMessage((prev) => {
        return { ...prev, password: "" };
      });
    }
  }, [error]);

  return (
    <GeneralLayout>
      <form
        onSubmit={handleSubmit}
        className={styles.form_container + " " + "primary"}
      >
        <h4 className={styles.header}>Login</h4>

        <div className={styles.input_container}>
          <label>Email :</label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={styles.input}
          />
          <p className={styles.error_message}>{errorMessage.email}</p>
        </div>

        <div className={styles.input_container}>
          <label>Password :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <p className={styles.error_message}>{errorMessage.password}</p>
        </div>

        <input
          type="submit"
          value="Login"
          disabled={loading}
          className={styles.submit_btn + " " + "primary"}
        />
      </form>
    </GeneralLayout>
  );
};

export default Login;
