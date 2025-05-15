import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/Constants";

export const TransactionContext = React.createContext();

const getEthereum = () => {
  if (typeof window !== "undefined") {
    return window.ethereum;
  }
  return null;
};

const getEthereumContract = () => {
  const ethereum = getEthereum();
  if (!ethereum) return null;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const handleChange = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const checkIfWalletIsConnected = async () => {
    const ethereum = getEthereum();
    if (!ethereum) {
      console.log("MetaMask is not installed.");
      return;
    }

    try {
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log("Found an authorized account: ", accounts[0]);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log("Error checking wallet:", error.message);
    }
  };

  const connectWallet = async () => {
    const ethereum = getEthereum();
    if (!ethereum) {
      alert("Please install MetaMask.");
      return;
    }

    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log("Wallet connected: ", accounts[0]);
      }
    } catch (error) {
      console.log("Error connecting wallet:", error.message);
    }
  };

  const sendTransaction = async () => {
    const ethereum = getEthereum();
    if (!ethereum) {
      alert("Please install MetaMask.");
      return;
    }

    try {
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();

      if (!transactionContract) {
        alert("Smart contract not found.");
        return;
      }

      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // 21000 GWEI
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        keyword,
        message
      );

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
      localStorage.setItem("transactionCount", transactionCount.toNumber());
    } catch (error) {
      console.log("Transaction failed:", error.message);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
