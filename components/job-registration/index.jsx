import React, { useState, useEffect } from "react";
import styles from "../../styles/form-styles.module.css";
import usePost from "../../hooks/fetch/usePost";
import SelectSector from "../select-sector";
import useLoadingContext from "../../hooks/useLoadingContext";
import useProfileContext from "../../hooks/useProfileContext";
import useGet from "../../hooks/fetch/useGet";
import usePatch from "../../hooks/fetch/usePatch";

const JobRegistration = () => {
  const { profile, dispatchProfile } = useProfileContext();
  const [name, setName] = useState(profile ? profile.name : "");
  const [sector, setSector] = useState(profile ? profile.sector : "");
  const [agreeToTerms, setAgreeToTerms] = useState(
    profile ? profile.agreeToTerms : false
  );
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    sector: "",
    agreeToTerms: "",
  });
  const [notification, setNotification] = useState("");
  const { postRequest } = usePost();
  const { getRequest } = useGet();
  const { patchRequest } = usePatch();
  const { loading, error } = useLoadingContext();

  const getPreviousProfile = async () => {
    if (!profile) {
      try {
        const res = await getRequest("/profile");
        console.log({ data: res.data });
        const data = res.data;
        if (data) {
          setName(data.name);
          setSector(data.sector);
          setAgreeToTerms(data.agreeToTerms);
          console.log({ profileresponse: res?.data });
          dispatchProfile({ type: "ADD", payload: { ...data } });
        }
      } catch (err) {
        console.log({ err });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      name,
      sector,
      agreeToTerms,
    };

    console.log({ payload });
    console.log({ errorMessage });
    if (name.trim().length === 0 || sector.length === 0 || !agreeToTerms) {
      name.trim().length === 0 &&
        setErrorMessage((errorMessage) => {
          return { ...errorMessage, name: "Required" };
        });
      sector.length === 0 &&
        setErrorMessage((errorMessage) => {
          return { ...errorMessage, sector: "Required" };
        });

      !agreeToTerms &&
        setErrorMessage((errorMessage) => {
          return {
            ...errorMessage,
            agreeToTerms: "You must agree to the terms",
          };
        });
    } else {
      try {
        let res;
        if (!profile) {
          res = await postRequest("/profile", payload, {
            withAuthHeader: true,
          });
          const data = res.data;
          if (data) {
            setNotification("Successfully added");
            setTimeout(() => {
              setNotification("");
            }, 1000);
          }
          console.log({ data });
          dispatchProfile({ type: "ADD", payload: data });
        }
        if (profile) {
          res = await patchRequest(
            "/profile",
            { ...payload, user_id: profile.user_id },
            {
              withAuthHeader: true,
            }
          );
          const data = res.data;
          if (data) {
            setNotification("Successfully updated");
            setTimeout(() => {
              setNotification("");
            }, 1000);
          }
          console.log({ patchData: data });
          dispatchProfile({ type: "ADD", payload: data });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    console.log({ name });
    if (name.trim() !== "") {
      setErrorMessage((prev) => {
        return { ...prev, name: "" };
      });
    }
    if (sector.trim() !== "") {
      setErrorMessage((prev) => {
        return { ...prev, sector: "" };
      });
    }
    if (agreeToTerms) {
      setErrorMessage((prev) => {
        return { ...prev, agreeToTerms: "" };
      });
    }
  }, [name, sector, agreeToTerms]);

  useEffect(() => {
    !profile && getPreviousProfile();
    console.log({ profile });
  }, [profile]);

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form_container + " " + "primary"}
    >
      <div className={styles.notification}>{notification}</div>
      <h4 className={styles.header}>Register to the hireable list</h4>
      <p>
        Please enter your name and pick the sector you are currently involed in.
      </p>
      <div className={styles.input_container}>
        <label>Name :</label>
        <input
          type="string"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          className={styles.input}
        />
        <p className={styles.error_message}>{errorMessage.name}</p>
      </div>

      <div className={styles.input_container}>
        <label>Sectors :</label>
        <SelectSector setSector={setSector} sectorId={sector} />
        <p className={styles.error_message}>{errorMessage.sector}</p>
      </div>
      <div>
        <label className="check_container">
          <input
            type="checkbox"
            onClick={() => setAgreeToTerms((prev) => !prev)}
            checked={agreeToTerms}
          />{" "}
          Agree to terms
        </label>
        <p className={styles.error_message}>{errorMessage.agreeToTerms}</p>
      </div>

      <input
        type="submit"
        value="Save"
        disabled={loading}
        className={styles.submit_btn + " " + "primary"}
      />
    </form>
  );
};

export default JobRegistration;
