#### DEPLOYMENT STEPS
##### Running on local testnet
1. Clone the repo:\
`$ git clone -b master https://github.com/ggulaman/booking-room.git`

2. Set up the smart contracts
- Install the dependencies:\
`$ cd booking-room`\
`$ npm install`

- Update the .env file with the following variables
You can take some random address from https://privatekeys.pw/keys/ethereum/random:\
`$ touch .env && echo "PRIVATE_KEY=<your private key 1>" > .env &&
echo "PRIVATE_KEY2=<your private key 2>" >> .env &&
echo "KOVAN_RPC_URL=<https://kovan.infura.io/v3/xxxxx>" >> .env &&
 echo "RINKEBY_RPC_URL=<https://rinkeby.infura.io/v3/xxxxx>" >> .env`

- Start Up a local blockchain with hardhat\
`$ npm run local-testnet`

- Deploy the Smart Contract to the local blockchain.
This script will add a env. variable with the SC contract address both on the .env files in colabooking-server and colabooking-ui:\
`$ npm run deploy:local`

3. Set up the Server
-Install the dependencies:\
`$ cd colabooking-server`\
`$ npm install`

- Start up the server:\
`$ npm start`

- Fetch 'http://localhost:4000/addresses' on your browser and check if it returns a json with the SC address.

4. Set Up the UI
- Install the dependencies:\
`$ cd colabooking-ui`\
`$ npm install`

- Add the api URL to fetch the contract address to the UI .env file:\
`$ echo "REACT_APP_FETCHING_SC_ADDRESS_FROM_REMOTE=http://localhost:4000/addresses" >> .env`

- Start up the UI:\
`$ npm start`

- You should fetch Colabooking UI on 'http://localhost:3000'.
