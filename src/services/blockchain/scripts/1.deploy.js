const { ethers } = require('hardhat');
require('events').EventEmitter.defaultMaxListeners = 20;
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

  const nft = await ethers.deployContract('ReportNFT', [
    'ReportNFT',
    'RPT',
    REPORT_ADDRESS,
  ]);
  const NFT_ADDRESS = await nft.getAddress();

  const transactionContract = await ethers.deployContract(
    'TransactionContract',
    [PARSER_ADDRESS],
  );
  const transaction_ADDress = await transactionContract.getAddress();

  const getTimespan = await ethers.deployContract('GetTransactionTimeSpan', [
    transaction_ADDress,
    PARSER_ADDRESS,
    REPORT_ADDRESS,
  ]);
  const getTimespan_address = await getTimespan.getAddress();

  const router = await ethers.deployContract('RouterContract', [
    transaction_ADDress,
    getTimespan_address,
    REPORT_ADDRESS,
  ]);

  const ROUTER_ADDRESS = await router.getAddress();

  // Get addresses
  const addresses = {
    PARSER_ADDRESS: PARSER_ADDRESS,
    REPORTS_ADDRESS: REPORT_ADDRESS,
    TRANSACTION_ADDRESS: transaction_ADDress,
    TIMESPAN_ADDRESS: getTimespan_address,
    ROUTER_ADDRESS: ROUTER_ADDRESS,
    NFT_ADDRESS: NFT_ADDRESS,
  };

  // Log addresses
  console.log('--------addresses have been recorded as follows:---------');
  console.log('PARSER_ADDRESS=', PARSER_ADDRESS);
  console.log('REPORTS_ADDRESS=', REPORT_ADDRESS);
  console.log('TRANSACTION_ADDRESS=', transaction_ADDress);
  console.log('TIMESPAN_ADDRESS=', getTimespan_address);
  console.log('ROUTER_ADDRESS=', ROUTER_ADDRESS);
  console.log('NFT_ADDRESS=', NFT_ADDRESS);

  const envPath = '.env';
  let existingContent = '';
  if (fs.existsSync(envPath)) {
    existingContent = fs.readFileSync(envPath, 'utf8');
  }

  // Generate new content to be added
  let newEnvContent = '\n';
  for (const key in addresses) {
    newEnvContent += `${key}=${addresses[key]}\n`;
  }

  // Combine existing content with new content
  const finalContent = existingContent + newEnvContent;

  // Write the combined content back to the .env file
  fs.writeFileSync(envPath, finalContent);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
