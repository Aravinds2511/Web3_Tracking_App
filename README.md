# Tracking DApp

## Overview

This decentralized application (DApp) allows users to create, start, and complete shipments on the Ethereum blockchain using Solidity smart contracts. The application is built with Next.js for the frontend, Solidity for the smart contracts, Tailwind CSS for styling, and ethers.js for Ethereum interactions.

## Features

- **Create Shipment:** Users can create a new shipment by providing necessary details such as sender, recipient, item description, etc.

- **Start Shipment:** Shipment creators can initiate the shipment, marking it as 'in progress'.

- **Complete Shipment:** Once the shipment is delivered, the sender can mark the shipment as 'completed'.

## Prerequisites

- Node.js installed on your local machine
- Ethereum wallet (e.g., MetaMask) installed in your browser

## Getting Started

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd shipment-tracking-dapp
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Visit `http://localhost:3000` in your browser to access the application.

## Smart Contracts

The smart contracts are written in Solidity and can be found in the `contracts/` directory. To deploy the smart contracts to the Ethereum blockchain, run:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Make sure to configure your Ethereum network settings in the `hardhat.config.js` file.

## Technologies Used

- **Next.js:** A React framework for building server-rendered applications.
- **Solidity:** A smart contract programming language for Ethereum.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **ethers.js:** A library for interacting with Ethereum.

## License

This project is licensed under the [MIT License](LICENSE).

---
