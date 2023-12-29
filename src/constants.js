import Web3 from "web3";
import { ABI } from "./abi";

const address = "0x239B4b154ee1C406E93D68ceD886E45cB31Ee4C7";

const createContractInstance = (provider) => {
  return new provider.eth.Contract(ABI, address);
};

export const connectContract = async () => {
  try {
    const web3 = new Web3(window.ethereum);
    const contract = createContractInstance(web3);
    return contract;
  } catch (error) {
    console.error(error);
  }
};

export const connectWallet = async (onError) => {
  if (typeof window.ethereum !== "undefined") {
    try {
      if (!window.ethereum) {
        window.alert("Please install metamask");
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      return account;
    } catch (error) {
      onError(error);
      console.error(error);
    }
  } else {
    console.log("Metamask not installed");
  }
};

export const checkIfConnected = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const account = await window.ethereum.request({ method: "eth_accounts" });
      return account[0];
    } catch (err) {
      console.err(err);
    }
  } else {
    console.log("Metamask not installed");
  }
};
