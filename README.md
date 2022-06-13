# Cola Booking System

Cola Booking System, https://colabooking.netlify.app/, allows Employees of 2 companies which share a bulding, Cocacola and Pepsi, to book their rooms respectivily on Cola building.

Cola Booking System makes use of Kovan Ethereum Testnet, where the Smart Contracts to manage the bookings have been deployed. Users have to use metamask wallet and connect it to Kovan in order to make their bookings.

When a user accesses to https://colabooking.netlify.app/ for the first time, they have to sing-up as CocaCola or Pepsi Employee. After, the ColaBooking System admin has to approve the sign up.

Once the employee has been approved, they can start booking.


## Architecture
![ColaBookingDiagramBitmap drawio](https://user-images.githubusercontent.com/90729367/173258938-23425a8e-0c04-45a3-b31f-b2ba91c3b137.png)

### [Smart Contract](https://github.com/ggulaman/booking-room/tree/master/contracts)
There are two Smart Contracts:
- ColaBookingFactory.sol, which handles the creation of ColaBooking.sol Smart Contracts, passing to ColaBooking.sol the date of ColaBooking date in epoch format, and the number of rooms per company.
- ColaBooking.sol, handles the bookings of Cola Booking date. Its constructor requieres the date of ColaBooking date in epoch format, and the number of rooms per company.

Smart Contracts Stack:
- Solidity, as Smart Contract language.
- Hardhat, to deploy the SCs, run a local testnet, handle test cases once they are set up,...
- JS, to implement scrips for SC deployments, run tests when they are ready,...
- NodeJs, to handle the libraries.

### [Backend Server](https://github.com/ggulaman/booking-room/tree/master/colabooking-server)
Contains an API serving the Smart Contract Address of the next Cola Booking Day.

Server Stack:
- NodeJs, to handle the libraries.
- NestJs, to create the API.

### [User Interface](https://github.com/ggulaman/booking-room/tree/master/colabooking-ui)
Serves the UI.

UI Stack:
- NodeJs, to handle the libraries.
- reactJS, to create the UI.
- materialUI, for the UI components.

### Deployment
Netlify is used for Automatic Deployment, which connects netlify with this github repo.
When a PR is merged on this repo, it triggers a built on Netlify UI container.

## Deployment Steps
##### Running on local testnet
1. Clone the repo:\
`$ git clone -b master https://github.com/ggulaman/booking-room.git`

2. Set up the smart contracts
- Install the dependencies:\
`$ cd booking-room`\
`$ npm install`

- Update the .env file with the following variables\
As this is a local deployment, you can take some random address from https://privatekeys.pw/keys/ethereum/random .\
You'll need to add you keys, with funds, for kovan deployments and tests.
`$ touch .env && echo "PRIVATE_KEY=<your private key 1>" > .env &&
echo "PRIVATE_KEY2=<your private key 2>" >> .env &&
echo "KOVAN_RPC_URL=<https://kovan.infura.io/v3/xxxxx>" >> .env &&
 echo "RINKEBY_RPC_URL=<https://rinkeby.infura.io/v3/xxxxx>" >> .env`

- Start Up a local blockchain with hardhat\
`$ npm run local-testnet`

- Deploy the Smart Contract Factory (ColaBookingFactory.sol) to the local blockchain.
This script will add a env. variable with the factory smart contract address to the .env file at root:\
`$ npm run deploy:local`

- Deploy a Smart Contract for a colabooking day (ColaBooking.sol) to the local blockchain.
This script will add a env. variable with the SC contract address to both the .env files in ./colabooking-server and ./colabooking-ui:\
`$ npm run deploy:local:10rooms`

3. Set up the Server
-Install the dependencies:\
`$ cd colabooking-server`\
`$ npm install`

- Start up the server:\
`$ npm start`

- Fetch http://localhost:4000/addresses on your browser or on command shell to check if it returns a json with the SC address printed out on the previous deployement step\
`$ curl http://localhost:4000/addresses`

4. Set Up the UI
- Install the dependencies:\
`$ cd colabooking-ui`\
`$ npm install`

- Add the api URL to fetch the contract address to the UI .env file:\
`$ echo "REACT_APP_FETCHING_SC_ADDRESS_FROM_REMOTE=http://localhost:4000/addresses" >> .env`

- Start up the UI:\
`$ npm start`

- You should fetch Colabooking UI on http://localhost:3000.

## Future Enhencements
