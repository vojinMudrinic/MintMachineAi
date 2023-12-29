import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./GeneratorContainer.module.css";
import Button from "../UI/Button/Button";
import LoaderSvg from "../../svg/LoaderSvg";
import { Context } from "../../AppContext/AppContext";
import { useIPFS } from "../../custom-hooks/useIPFS";
import { useAI } from "../../custom-hooks/useAI";
import useWindowWidth from "../../custom-hooks/useWindowWidth";

const GeneratorContainer = () => {
  const { contract, account } = useContext(Context);
  const { windowWidth } = useWindowWidth();
  const isResponsive = windowWidth <= 575;
  const [mint, ipfsLoading, loadingText, mintSuccess] = useIPFS();
  const [sendTextToPrompt, imgUrl, aiLoading, removeImage] = useAI();
  const isLoading = ipfsLoading || aiLoading;
  const inputText = useRef();
  const nftName = useRef();
  const nftDescription = useRef();
  const [mintSuccessView, setMintSuccessView] = useState(false);

  const onGenerate = useCallback(() => {
    if (!inputText.current.value) {
      alert("Enter text in input field");
      return;
    }
    sendTextToPrompt(inputText.current.value);
  }, [sendTextToPrompt]);

  const renderButtons = useMemo(() => {
    return imgUrl ? (
      <>
        {!mintSuccessView ? (
          <Button
            text={"Mint"}
            onClick={() =>
              mint(
                imgUrl,
                nftName?.current.value,
                nftDescription?.current.value,
                contract,
                account
              )
            }
          />
        ) : null}

        <Button
          text={!mintSuccessView ? "Remove" : "Generate new"}
          onClick={() => {
            removeImage();
            setMintSuccessView(false);
          }}
        />
      </>
    ) : (
      <Button text={"Generate"} onClick={onGenerate} />
    );
  }, [
    imgUrl,
    onGenerate,
    mint,
    contract,
    account,
    removeImage,
    mintSuccessView,
  ]);

  useEffect(() => {
    if (mintSuccess) {
      setMintSuccessView(true);
    }
  }, [mintSuccess, setMintSuccessView]);

  return (
    <div
      className={[styles.wrapper, isResponsive ? styles.responsive : ""].join(
        " "
      )}
    >
      {isLoading ? (
        <>
          <LoaderSvg className={styles.loader} />
          <div className={styles.footerContainer}>
            <span>{loadingText}</span>
          </div>
        </>
      ) : (
        <>
          {mintSuccessView ? (
            <div className={styles.mintSuccess}>
              <span>NFT successfully minted!</span>
              <a
                href="https://testnets.opensea.io/collection/mintmachinenft"
                target="_blank"
                rel="noreferrer"
              >
                Click here to preview on OpenSea
              </a>
            </div>
          ) : null}
          {imgUrl ? (
            <div className={styles.imgContainer}>
              <img src={imgUrl} alt="ai-nft" />
            </div>
          ) : (
            <div className={styles.inputContainer}>
              <textarea
                placeholder={"Describe your perfect art!"}
                ref={inputText}
                className={isResponsive ? styles.textareResponsive : ""}
              />
            </div>
          )}
          <div className={styles.footerContainer}>
            {imgUrl && !mintSuccessView ? (
              <div
                className={[
                  styles.inputContainer,
                  isResponsive ? styles.inputResponsive : "",
                ].join(" ")}
              >
                <input placeholder="NFT name" ref={nftName} />
                <input placeholder="Description" ref={nftDescription} />
              </div>
            ) : null}

            {renderButtons}
          </div>
        </>
      )}
    </div>
  );
};

export default GeneratorContainer;
