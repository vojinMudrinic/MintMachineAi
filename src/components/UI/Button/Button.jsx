import React from "react";

import styles from "./Button.module.css";

const Button = ({ text, onClick, customClass }) => {
  return (
    <div className={[styles.wrapper, customClass].join(" ")} onClick={onClick}>
      <span>{text}</span>
    </div>
  );
};

export default Button;
