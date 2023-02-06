import React from "react";
import { IoReloadOutline } from "react-icons/io5";
import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles["spinner"]}>
      <IoReloadOutline className={styles.icon}></IoReloadOutline>
    </div>
  );
};

export default Spinner;
