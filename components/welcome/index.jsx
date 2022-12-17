import Link from "next/link";
import styles from "./styles.module.css";

export default function Welcome() {
  return (
    <div className={styles.welcome + " " + "body"}>
      <h1 className={styles.header + " primary_dark text_center"}>
        Hello and Welcome to the Hireable job opportunities.
      </h1>
      <p className="text_center">
        Now you can get enlisted in our hireable list for future job hunts.
      </p>
      <div className="text_center">
        Please{" "}
        <Link href="/login" className={styles.link + " " + "primary"}>
          Login
        </Link>{" "}
        or,{" "}
        <Link href="/signup" className={styles.link + " " + "primary"}>
          Signup
        </Link>{" "}
        if you have not signed up yet.
      </div>
    </div>
  );
}
