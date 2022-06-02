const { ethers } = require("hardhat");

const network = process.env.HARDHAT_NETWORK;
const main = async() => {
    await hre.run('compile');
    const [deployer] = await ethers.getSigners();
    console.log("deployer balance:", (await deployer.getBalance()).toString());

    console.log(`Deploying SocialAwardVaultFactory SC to ${network} network`);
    const ColaBookingFactory = await ethers.getContractFactory("ColaBookingFactory");
    const cbSC = await ColaBookingFactory.deploy();
    console.log(`ColaBookingFactory deployed to the following address ${cbSC.address}`);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })