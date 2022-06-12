import { ethers } from "ethers";
import ColaBookingContract from "../../../artifacts/contracts/ColaBooking.sol/ColaBooking.json";
import { getAddress } from "../../../app/api";

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
  },
  1337: {
    chainId: 0x539,
    network: "Local Network",
    currency: "ETH"
  }
};

export const connectWalletHandler = async (setUserAccount) => {
  // Check if MetaMask is installed on user's browser
  if(window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const chainId = await provider.send("eth_chainId", []);

    const chainIdDecimal = parseInt(chainId, 16);
    // Check if user is connected to Mainnet
    if (networkList[chainIdDecimal] && (networkList[chainIdDecimal].network === "Kovan" || networkList[chainIdDecimal].network === "Local Network")) {
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

const provider = new ethers.providers.Web3Provider(window.ethereum);

export const getColaBookingSC = () => {
  const ABI = ColaBookingContract.abi;
  const contractAddress = process.env.REACT_APP_COLA_DAY_SC_ADDRESS;
  const network = getAddress() || process.env.REACT_APP_DEFAULT_NETWORK ;
  const colaBookingContract = new ethers.Contract(contractAddress, ABI, provider.getSigner());
  console.log("contractAddress: ", contractAddress);
  console.log("network: ", network);
  return colaBookingContract;
};