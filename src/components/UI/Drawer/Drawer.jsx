import React from "react";

import styles from "./Drawer.module.css";
import CloseSvg from "../../../svg/CloseSvg";
import useWindowWidth from "../../../custom-hooks/useWindowWidth";

const Drawer = ({ drawer, closeDrawer }) => {
  const { windowWidth } = useWindowWidth();
  const isResponsive = windowWidth <= 925;
  return (
    <div
      className={[
        styles.drawer,
        drawer ? styles.active : "",
        isResponsive ? styles.responsive : "",
      ].join(" ")}
    >
      <div className={styles.drawerTitle}>
        <h1>About MintMachine</h1>
        <CloseSvg onClick={closeDrawer} />
      </div>
      <div className={styles.shortDescription}>
        <p>
          MintMachine is an NFT minting decentralized application (Dapp), that
          utilizes the Stability AI for art generation and Pinata for storing
          data to IPFS.
        </p>
      </div>
      <div className={styles.drawerTitle}>
        <h1>How it works</h1>
      </div>
      <div className={styles.howItWorks}>
        <ul>
          <li>Connect your MetaMask wallet.</li>
          <li>
            Make sure your MetaMask account is on the Sepolia test network.
          </li>
          <li>
            Describe your desired NFT art in the text prompt and click generate.
          </li>
          <li>
            If you dont like the result you can click on the remove button and
            generate again.
          </li>
          <li>
            If you do like the result, you can click on the mint button and
            confirm the transaction. Once the mint is completed you will be
            notified with a link to OpenSea test network where you can preview
            all NFT's that were minted with this Dapp.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
