require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const SEPOLIA_PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/7Qx1ObkUWFDGLcbThK7KwzvOlRsgqm6x",
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
