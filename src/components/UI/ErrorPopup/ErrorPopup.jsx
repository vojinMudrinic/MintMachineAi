import React, { useContext } from "react";

import styles from "./ErrorPopup.module.css";
import { Context } from "../../../AppContext/AppContext";

const ErrorPopup = () => {
  const { error } = useContext(Context);
  return (
    <div className={[styles.wrapper, error ? styles.active : ""].join(" ")}>
      <span>{error?.message}</span>
    </div>
  );
};

export default ErrorPopup;
