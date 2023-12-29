import React, { useCallback, useEffect, useState } from "react";
import { checkIfConnected, connectContract, connectWallet } from "../constants";

export const Context = React.createContext();

export const AppComponentContext = ({ children }) => {
  const metamaskInstalled = typeof window.ethereum !== "undefined";
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [correctChain, setCorrectChain] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const account = await connectWallet(setError);
      const contract = await connectContract();
      setAccount(account);
      setContract(contract);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const account = await checkIfConnected();
      if (account) {
        setAccount(account);
        const contract = await connectContract();
        setContract(contract);
      }
    })();
  }, []);

  useEffect(() => {
    // Add listeners to top Application level
    const onChangeWalletListener = () => {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });
    };

    const onChangeNetworkListener = () => {
      window.ethereum.on("chainChanged", (networkId) => {
        const chainId = Number(networkId);
        if (chainId === 11155111) {
          setCorrectChain(true);
        } else {
          setCorrectChain(false);
        }
      });
    };

    if (metamaskInstalled) {
      onChangeWalletListener();
      onChangeNetworkListener();
    } else {
      setAccount(null);
    }
  }, [metamaskInstalled]);

  useEffect(() => {
    (async () => {
      if (account) {
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        if (Number(networkId) === 11155111) {
          setCorrectChain(true);
        }
      }
    })();
  }, [account]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <Context.Provider
      value={{
        error,
        setError,
        account,
        contract,
        correctChain,
        metamaskInstalled,
        fetchData,
      }}
    >
      {children}
    </Context.Provider>
  );
};
