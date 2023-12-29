# About MintMachine

This project was created using [React](https://create-react-app.dev/) with [Web3.js](https://web3js.readthedocs.io/en/v1.10.0/) library on the frontend and [Solidity](https://soliditylang.org/) for smart contract development. <br/>
MintMachine is a decentralized application that allows you to generate art with the help of AI that you can turn into an NFT<br/>

## How to start the project

1. Inside the root directory run "npm install" in terminal
2. In same directory create a .env file and copy the content from .env.example.
3. Install the [Metamask](https://metamask.io/) browser extension.
4. In Metamask test networks, select Sepolia.
5. Create a test account.
6. Visit [Infura](https://www.infura.io/faucet/sepolia) or [Alchemy](https://sepoliafaucet.com/) and send "fake ether" to your test account.
7. Visit [Pinata](https://www.pinata.cloud/), you will have to create an account to get the API key. When requesting the API key checkbox everything in the "Pinning" section and click "Generate API key". From the key file you generated copy the JWT code to the REACT_APP_PINATA_JWT variable inside your .env file.
8. Visit [Stability.Ai](https://platform.stability.ai/account/keys), create account and generate the API key that you will copy to the REACT_APP_STABILITY_AI variable inside .env file.
9. Once both variables have value in .env, just run "npm run start" in console.
