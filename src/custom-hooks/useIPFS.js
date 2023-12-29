import { useState } from "react";
import { useContext } from "react";
import { Context } from "../AppContext/AppContext";
import { createJSONfile, imgToFile } from "../helpers/helpers";

export const useIPFS = () => {
  const JWT = process.env.REACT_APP_PINATA_JWT;
  const ipfsURL = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const { setError } = useContext(Context);

  const [ipfsLoading, setIpfsLoading] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const upload = async (imgUrl) => {
    try {
      setLoadingText("Uploading img to IPFS");
      const formData = new FormData();
      const file = imgToFile(imgUrl);
      formData.append("file", file, {
        filename: file.name,
      });

      const res = await fetch(ipfsURL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: formData,
      });
      const json = await res.json();

      const { IpfsHash } = json;
      return IpfsHash;
    } catch (e) {
      console.log(e);
      alert("Trouble uploading file");
      setIpfsLoading(false);
    }
  };

  const uploadJSON = async (name, description, cid) => {
    try {
      setLoadingText("Uploading JSON data to IPFS");
      const data = {
        name,
        description,
        image: `https://gateway.pinata.cloud/ipfs/${cid}`,
      };
      const formData = new FormData();
      const file = createJSONfile(data);
      formData.append("file", file, {
        filename: data.name,
      });

      const res = await fetch(ipfsURL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: formData,
      });
      const json = await res.json();

      const { IpfsHash } = json;
      return IpfsHash;
    } catch (e) {
      console.log(e);
      alert("Trouble uploading file");
      setIpfsLoading(false);
    }
  };

  const unpinDataFromIPFS = async (cid) => {
    const url = `https://api.pinata.cloud/pinning/unpin/${cid}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JWT}`,
        accept: "application/json",
      },
    });
  };

  const mint = async (imgFile, name, description, contract, account) => {
    if (!name || !description) {
      alert("Input fields must be filled!");
      return;
    }
    setIpfsLoading(true);
    const cid = await upload(imgFile);
    const jsonCid = await uploadJSON(name, description, cid);
    try {
      setLoadingText("Waiting for wallet connection");
      await contract?.methods.mint(account, jsonCid).send({ from: account });
      setMintSuccess(true);
      setIpfsLoading(false);
      setLoadingText("");
    } catch (err) {
      console.error(err);
      setError(err);
      await unpinDataFromIPFS(cid);
      await unpinDataFromIPFS(jsonCid);
      setIpfsLoading(false);
      setMintSuccess(false);
      setLoadingText("");
    }
  };

  return [mint, ipfsLoading, loadingText, mintSuccess];
};
