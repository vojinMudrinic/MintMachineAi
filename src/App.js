import { useContext, useState } from "react";
import "./App.css";

import GeneratorContainer from "./components/GeneratorContainer/GeneratorContainer";
import ConnectWallet from "./components/ConnectWallet/ConnectWallet";
import CogSvg from "./svg/CogSvg";
import ProfileSvg from "./svg/ProfileSvg";
import QuestionMarkSvg from "./svg/QuestionMarkSvg";
import Drawer from "./components/UI/Drawer/Drawer";
import { Context } from "./AppContext/AppContext";
import ErrorPopup from "./components/UI/ErrorPopup/ErrorPopup";

function App() {
  const { account, correctChain, metamaskInstalled } = useContext(Context);
  const [drawer, setDrawer] = useState(false);

  const closeDrawer = () => {
    setDrawer(false);
  };

  const openDrawer = () => {
    setDrawer(true);
  };

  return (
    <div className="App">
      <Drawer drawer={drawer} closeDrawer={closeDrawer} />
      <ErrorPopup />
      <div className="title">
        <QuestionMarkSvg className="hint" onClick={openDrawer} />
        <h1>MintMachine</h1>
        <CogSvg />
      </div>
      {metamaskInstalled ? (
        <>
          {account ? (
            <>
              {correctChain ? (
                <>
                  <div className="profile">
                    <ProfileSvg />
                    <span>{`${account.substring(0, 6)}...${account.substring(
                      38
                    )}`}</span>
                  </div>
                </>
              ) : (
                <h1 className="wrong-network">
                  Please select Sepolia test network in you MetaMask settings
                </h1>
              )}
            </>
          ) : null}
          <div className={["content", drawer ? "block" : ""].join(" ")}>
            {!account ? (
              <ConnectWallet />
            ) : (
              <>{correctChain ? <GeneratorContainer /> : null}</>
            )}
          </div>
        </>
      ) : (
        <div className="no-metamask">
          <a
            className="metamask-install"
            href="https://metamask.io/download/"
            target="_blank"
            rel="noreferrer"
          >
            <span>Install metamask</span>
          </a>
          <span>
            Metamask wallet extension is required for this Dapp. Install and
            reload the page
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
