import React, { useContext } from "react";

import styles from "./ConnectWallet.module.css";
import { Context } from "../../AppContext/AppContext";

const ConnectWallet = () => {
  const { fetchData } = useContext(Context);
  return (
    <div className={styles.wrapper} onClick={fetchData}>
      <h1>Connect with MetaMask</h1>
    </div>
  );
};

export default ConnectWallet;
