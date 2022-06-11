const { ethers } = require("hardhat");
require('dotenv').config()
const fs = require('fs');

const network = process.env.HARDHAT_NETWORK;
const scAddress = process.env.COLADAY_FACTORY_SC_ADDRESS;

addVariable = (path, variableName, address) => {
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

    console.log(`Attaching ColaBookingFactory SC on ${network} network`);
    const ColaBooking = await ethers.getContractFactory("ColaBookingFactory");
    const cbSC = await ColaBooking.attach(scAddress);
    console.log(`ColaBookingFactory attached to the following address ${cbSC.address}`);

    console.log(`ColaBookingFactory creating a new Colabooking contract...`);
    await cbSC.createColaDay(1651363200, 10);
    const addressOfColaBokingSC = await cbSC.colaBookingDays(0);
    console.log(`ColaBooking SC created at ${addressOfColaBokingSC}`);

    const envFileServerPath = './colabooking-server/.env'
    const envFileUIPath = './colabooking-ui/.env'

    addVariable(envFileServerPath, 'COLADAY_SC_ADDRESS', addressOfColaBokingSC);
    addVariable(envFileUIPath, 'REACT_APP_COLA_DAY_SC_ADDRESS', addressOfColaBokingSC);
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })