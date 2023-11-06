import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//internal-imports
import tracking from "../artifacts/contracts/Tracking.sol/Tracking.json";
import { contractAddress } from "../config";
const contractABI = tracking.abi;

//fetching smart contract
const fetchContract = (singerOrProvider) =>
  new ethers.Contract(contractAddress, contractABI, singerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  const DappName = "Product tracking Dapp";
  const [currentUser, setCurrentUser] = useState("");

  //creating shipment
  const createShipment = async (items) => {
    console.log(items);
    const { receiver, pickupTime, distance, price } = items;

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        {
          value: ethers.utils.parseUnits(price, 18),
        }
      );
      await createItem.wait();
      console.log(createItem);
      window.location.reload();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  //getting all shipments
  const getAllShipment = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/7Qx1ObkUWFDGLcbThK7KwzvOlRsgqm6x"
      );
      const contract = fetchContract(provider);

      const shipments = await contract.getAllTransactions();
      const allShipments = shipments.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.utils.formatEther(shipment.price.toString()),
        pickupTime: shipment.pickupTime.toNumber(),
        deliveryTime: shipment.deliveryTime.toNumber(),
        distance: shipment.distance.toNumber(),
        isPaid: shipment.isPaid,
        status: shipment.status,
      }));

      return allShipments;
    } catch (error) {
      console.log("error getting shipment data", error);
    }
  };

  //getting shipment count
  const getShipmentsCount = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/7Qx1ObkUWFDGLcbThK7KwzvOlRsgqm6x"
      );
      const contract = fetchContract(provider);
      const shipmentCount = await contract.getShipmentsCount(accounts[0]);
      return shipmentCount.toNumber();
    } catch (error) {
      console.log("error getting shipments", error);
    }
  };

  //complete shipment
  const completeShipment = async (completeShip) => {
    console.log(completeShip);

    const { receiver, index } = completeShip;
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.completeShipment(
        accounts[0],
        receiver,
        index
        // {
        //   gasLimit: 300000,
        // }
      );

      transaction.wait();
      console.log(transaction);
      window.location.reload();
    } catch (error) {
      console.log("error completing shipments", error);
    }
  };

  //get individual shipment
  const getShipment = async (index) => {
    console.log(index * 1);
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/7Qx1ObkUWFDGLcbThK7KwzvOlRsgqm6x"
      );
      const contract = fetchContract(provider);
      const shipment = await contract.getShipment(accounts[0], index * 1);

      const SingleShipment = {
        sender: shipment[0],
        receiver: shipment[1],
        pickupTime: shipment[2].toNumber(),
        deliveryTime: shipment[3].toNumber(),
        distance: shipment[4].toNumber(),
        price: ethers.utils.formatEther(shipment[5].toString()),
        status: shipment[6],
        isPaid: shipment[7],
      };

      return SingleShipment;
    } catch (error) {
      console.log("error showing shipment data", error);
    }
  };

  //for starting shipment
  const startShipment = async (getProduct) => {
    console.log(getProduct);

    const { receiver, index } = getProduct;

    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const shipment = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1
      );

      shipment.wait();
      console.log(shipment);
      window.location.reload();
    } catch (error) {
      console.log("cannot start shipment", error);
    }
  };

  //check wallet connected
  const checkIfWalletConnect = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        return "No account";
      }
    } catch (error) {
      console.log("not connected ", error);
    }
  };

  //connect wallet function (button on screen)
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log("cannot connect to wallet ", error);
    }
  };

  useEffect(() => {
    checkIfWalletConnect();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
        DappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
