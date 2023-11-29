const { ethers } = require('hardhat');
const fs = require('fs');
require('dotenv').config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  // Deploy contracts
  const parser = await ethers.deployContract('Parser');
  const PARSER_ADDRESS = await parser.getAddress();

  const reports = await ethers.deployContract('Reports');
  const REPORT_ADDRESS = await reports.getAddress();

  const transactionContract = await ethers.deployContract(
    'TransactionContract',
    [PARSER_ADDRESS],
  );
  const transaction_ADDress = await transactionContract.getAddress();

  const getTimespan = await ethers.deployContract('GetTransactionTimeSpan', [
    transaction_ADDress,
    PARSER_ADDRESS,
  ]);
  const getTimespan_address = await getTimespan.getAddress();

  const router = await ethers.deployContract('RouterContract', [
    transaction_ADDress,
    getTimespan_address,
  ]);
  const ROUTER_ADDRESS = await router.getAddress();

  // Get addresses
  const addresses = {
    PARSER_ADDRESS: PARSER_ADDRESS,
    REPORT_ADDRESS: REPORT_ADDRESS,
    TRANSACTION_ADDRESS: transaction_ADDress,
    TIMESPAN_ADDRESS: getTimespan_address,
    ROUTER_ADDRESS: ROUTER_ADDRESS,
  };

  // Log addresses
  console.log('PARSER_ADDRESS=', PARSER_ADDRESS);
  console.log('REPORT_ADDRESS=', REPORT_ADDRESS);
  console.log('TRANSACTION_ADDRESS=', TRANSACTION_ADDRESS);
  console.log('TIMESPAN_ADDRESS=', TIMESPAN_ADDRESS);
  console.log('ROUTER_ADDRESS=', ROUTER_ADDRESS);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
