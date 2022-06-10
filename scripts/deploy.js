const { ethers } = require("hardhat");
const fs = require('fs');

const network = process.env.HARDHAT_NETWORK;

const addVariable = (path, variableName, address) => {
  try {
    fs.unlinkSync(path)
    console.log(`Removing .env file on ${path}`);
  } catch(err) {
    console.log(`It seems ${path} doesn't exists`);
  }
  console.log(`Adding env. variable to ${path}`);
  fs.appendFileSync(path, `${variableName}=${address}\n`);
}
const main = async() => {
    await hre.run('compile');
    const [deployer] = await ethers.getSigners();
    console.log("deployer balance:", (await deployer.getBalance()).toString());

    console.log(`Deploying SocialAwardVaultFactory SC to ${network} network`);
    const ColaBookingFactory = await ethers.getContractFactory("ColaBookingFactory");
    const cbSC = await ColaBookingFactory.deploy();
    console.log(`ColaBookingFactory deployed to the following address ${cbSC.address}`);

    const envFileServerPath = './colabooking-server/.env'
    const envFileUIPath = './colabooking-ui/.env'

    addVariable(envFileServerPath, 'COLADAY_SC_ADDRESS', cbSC.address);
    addVariable(envFileUIPath, 'REACT_APP_COLA_DAY_SC_ADDRESS', cbSC.address);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })