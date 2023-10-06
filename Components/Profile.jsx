
import Image from "next/image";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

import images from "../Images/index";
import { Str1 } from "../Components/index";

export default ({
    openProfile,
    setOpenProfile,
    currentUser,
    getShipmentsCount,
}) => {
    const [count, setCount] = useState();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        // Function to fetch the user's Ethereum balance using MetaMask provider
        const fetchBalance = async () => {
          if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            const userAddress = accounts[0];
            const userBalance = await provider.getBalance(userAddress);
            const formattedBalance = ethers.utils.formatEther(userBalance);
            setBalance(formattedBalance);
          } else {
            // Handle the case where MetaMask is not installed or not connected
            console.error("MetaMask is not installed or not connected");
          }
        };
    
        if (openProfile) {
          fetchBalance(); // Fetch balance when the modal is open
        }
      }, [openProfile]);


    useEffect(() => {
        const getShipmentsData = getShipmentsCount();

        return async () => {
            const allData = await getShipmentsData;
            setCount(allData);
        }
    }, [])
    return openProfile ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="fixed inset-0 w-full bg-black opacity-40"
             onClick={() => setOpenProfile(false)}>

        </div>
        <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="flex justify-end">
                    <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                            onClick={() => setOpenProfile(false)}>
                             <Str1 />
                    </button>
                </div>
                <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                    <div class="flex flex-col items-center pb-10">
                        <Image
                          class="w-24 h-24 mb-3 rounded-full shadow-lg"
                          src={images.avatar}
                          alt="Bonnie image"
                        />
                        <h5 class="mb-1 text-xl font-medium text-gray-900 ">
                            Welcome Trader
                        </h5>  

                    <span class="text-sm text-gray-500 dark:text-gray-400">
                        {currentUser}
                    </span>

                    <div class="flex mt-4 space-x-3 md:mt-6">

                        {balance && (
                      <a href="#"
                         class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2">
                         Balance: {balance.slice(0, 8)}... ETH
                      </a>
                    )}

                        {/* <a
                          href="#"
                          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2">
                            Balance: ETH
                          </a> */}
                          <a
                          href="#"
                          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2">
                            Total Shipment: {count}
                          </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
) : (
    ""
)
    
}