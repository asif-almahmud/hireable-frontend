import { useEffect, useState } from "react";
import useLoadingContext from "../../hooks/useLoadingContext";
import useSignup from "../../hooks/useSignup";
import GeneralLayout from "../../layouts/general";
import styles from "../../styles/form-styles.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });
  const { signup } = useSignup();
  const { loading, error } = useLoadingContext();

  const handleSubmit = async (e) => {
    console.log({ password });
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
      await signup({ email, password });
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
    console.log({ error });
    if (error && error.response.data.error === "Email already in use") {
      setErrorMessage((prev) => {
        return { ...prev, email: error.response.data.error };
      });
      return;
    } else {
      setErrorMessage((prev) => {
        return { ...prev, email: "" };
      });
    }
  }, [error]);

  return (
    <GeneralLayout>
      <form
        onSubmit={handleSubmit}
        className={styles.form_container + " " + "primary"}
      >
        <h4 className={styles.header}>Signup</h4>

        <div className={styles.input_container}>
          <label>Email :</label>
          <input
            type="string"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className={styles.input}
          />
          <p className={styles.error_message}>{errorMessage.email}</p>
        </div>

        <div className={styles.input_container}>
          <label>Password :</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={styles.input}
          />
          <p className={styles.error_message}>{errorMessage.password}</p>
        </div>

        <input
          type="submit"
          value="Signup"
          disabled={loading}
          className={styles.submit_btn + " " + "primary"}
        />
      </form>
    </GeneralLayout>
  );
};

export default Signup;
