import { ethers } from "ethers";
import ColaBookingContract from "../../../artifacts/contracts/ColaBooking.sol/ColaBooking.json";

export const networkList = {
  4: {
    chainId: 0x4,
    network: "Rinkeby",
    currency: "RIN"
  },
  42: {
    chainId: 0x2a,
    network: "Kovan",
    currency: "KOV"
  },
  137: {
    chainId: 0x89,
    network: "Polygon Mainnet",
    currency: "MATIC"
  },
  43113: {
    chainId: 0xa869,
    network: "Avalanche Fuji Tesnet",
    currency: "AVAX"
  },
  43114: {
    chainId: 0xa86a,
    network: "Avalanche Mainnet",
    currency: "AVAX"
  },
  80001: {
    chainId: 0x1f41,
    network: "Mumbai",
    currency: "MATIC"
  }
};

const checkWalletIsConnected = () => {
  const {ethereum} = window;

  if (!ethereum) {
    console.log("Make sure you have Metamask installed!");
    return;
  } else {
    console.log("Wallet exists! We're ready to go!");
  }
};

export const connectWalletHandler = async (setUserAccount) => {
  // Check if MetaMask is installed on user's browser
  if(window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const chainId = async () => await window.ethereum.request({ method: "eth_chainId" });

    const chainIdDecimal = parseInt(await chainId(), 16);
    // Check if user is connected to Mainnet
    if (networkList[chainIdDecimal] && networkList[chainIdDecimal].network === "Kovan"){
      console.log("connected to ", networkList[chainIdDecimal].network);
      console.log("Found an account! Address: ", accounts[0]);
      setUserAccount(accounts[0]);
    } else {
      alert(`Please, select Kovan network in your Wallet!. You are currently on ${networkList[chainIdDecimal] ? networkList[chainIdDecimal].network : "the wrong Blockchain"}`);
    }
  } else {
    alert("Please install Mask");
  }
};

export const connectWalletHandler2 = async (setUserAccount) => {
  const { ethereum } = window;

  checkWalletIsConnected();

  const chainId = async () => await ethereum.request({ method: "eth_chainId" });

  console.log(`chain id is ${JSON.stringify(chainId())}`);

  const connectedChain = parseInt(await chainId(), 16);
  if (networkList[connectedChain] && networkList[connectedChain].network === "Kovan"){
    console.log("connected to ", networkList[connectedChain].network);
  } else {
    alert(`Please, select Kovan network in your Wallet!. You are currently on ${networkList[connectedChain] ? networkList[connectedChain].network : "the wrong Blockchain"}`);
    return;
  }

  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log("accounts: ", accounts);
    console.log("Found an account! Address: ", accounts[0]);
    if (accounts) {
      setUserAccount(accounts[0]);
    }
  } catch (err){
    console.error(err);
  }
};

const provider = new ethers.providers.Web3Provider(window.ethereum);

export const getColaBookingSC = () => {
  const ABI = ColaBookingContract.abi;
  const contractAddress = process.env.REACT_APP_COLA_DAY_SC_ADDRESS;
  const network = process.env.REACT_APP_DEFAULT_NETWORK;
  const colaBookingContract = new ethers.Contract(contractAddress, ABI, provider.getSigner());
  console.log("contractAddress: ", contractAddress);
  console.log("network: ", network);
  return colaBookingContract;
};