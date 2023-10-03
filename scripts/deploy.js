const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Tracking = await hre.ethers.getContractFactory("Tracking");
  const tracking = await Tracking.deploy();
  await tracking.deployed();

  console.log(`Tracking deployed to ${tracking.address}`);

  fs.writeFileSync(
    "./config.js",
    `
  export const contractAddress = "${tracking.address}"
  export const ownerAddress = "${tracking.signer.address}"
  `
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
