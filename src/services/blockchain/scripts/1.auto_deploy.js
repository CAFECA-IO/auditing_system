require('dotenv').config();
const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');
const contractABIPath = path.resolve(
  __dirname,
  '../../blockchain/artifacts/artifacts/src/services/blockchain/contracts/router.sol/RouterContract.json',
);
const contractJSON = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const contractABI = contractJSON.abi;

let PARSER_ADDRESS;
let REPORTS_ADDRESS;
let TRANSACTION_ADDRESS;
let TIMESPAN_ADDRESS;
let ROUTER_ADDRESS;
let NFT_ADDRESS;

const handlerCodes = [
  'E00010001',
  'E00010002',
  'E00010003',
  'E00010004',
  'E00010005',
  'E00010006',
  'E00010007',
  'E00010008',
  'E00020001',
  'E00020002',
  'E00020003',
  'E00020004',
  'E00020005',
  'E00020006',
  'E00020007',
  'E00020008',
  'E00020009',
  'E00020010',
  'E00020011',
  'E00020012',
  'E00030001',
  'E00030002',
  'E00030003',
  'E00030004',
  'E00030005',
  'E00030006',
  'E00030007',
  'E00030008',
  'E00040001',
  'E00040002',
  'E00040003',
  'E00040004',
  'E00040005',
  'E00040006',
];
const handlers = {};

/** deployHandlerAndAppendToEnv */
async function deployHandlerAndAppendToEnv(code) {
  if (
    !TRANSACTION_ADDRESS ||
    !PARSER_ADDRESS ||
    !REPORTS_ADDRESS
  ) {
    throw new Error(
      'The necessary contract address is not set in the .env file.',
    );
  }

  const contract = await ethers.deployContract(`${code}Handler`, [
    TRANSACTION_ADDRESS,
    PARSER_ADDRESS,
    REPORTS_ADDRESS,
  ]);
  const contractAddress = await contract.getAddress();
  const envPath = '.env';
  const newEnvContent = `${code}_ADDRESS=${contractAddress}\n`;
  const key = convertToSolidityString(code);
  handlers[key] = contractAddress;
  fs.appendFileSync(envPath, newEnvContent);
  console.log(`${code}_ADDRESS=`, contractAddress);
}

/** convertToSolidityString */
function convertToSolidityString(text) {
  let result = "0x";
  for (let i = 0; i < text.length; i++) {
      // 將每個字符轉換成十六進制表示
      let hex = text.charCodeAt(i).toString(16);
      // 確保每個字符都是兩位數的十六進制表示
      if (hex.length < 2) {
          hex = "0" + hex;
      }
      // 將每個字符的十六進制表示添加到結果中
      result += hex;
  }
  // 如果結果長度不足 64，則在前面填充零
  while (result.length < 66) {
      result += "0";
  }
  return result;
}

/** convertToSolidityUint */
async function deployContracts() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  // Deploy contracts

  const parser = await ethers.deployContract('Parser');
  PARSER_ADDRESS = await parser.getAddress();

  const reports = await ethers.deployContract('Reports');
  REPORTS_ADDRESS = await reports.getAddress();

  const nft = await ethers.deployContract('ReportNFT', [
    'ReportNFT',
    'RPT',
    REPORTS_ADDRESS,
  ]);
  NFT_ADDRESS = await nft.getAddress();

  const transactionContract = await ethers.deployContract(
    'TransactionContract',
    [PARSER_ADDRESS],
  );
  TRANSACTION_ADDRESS = await transactionContract.getAddress();

  const getTimespan = await ethers.deployContract('GetTransactionTimeSpan', [
    TRANSACTION_ADDRESS,
    PARSER_ADDRESS,
    REPORTS_ADDRESS,
  ]);
  TIMESPAN_ADDRESS = await getTimespan.getAddress();

  const router = await ethers.deployContract('RouterContract', [
    TRANSACTION_ADDRESS,
    TIMESPAN_ADDRESS,
    REPORTS_ADDRESS,
  ]);

  ROUTER_ADDRESS = await router.getAddress();

  // Get addresses
  const addresses = {
    PARSER_ADDRESS,
    REPORTS_ADDRESS,
    TRANSACTION_ADDRESS,
    TIMESPAN_ADDRESS,
    ROUTER_ADDRESS,
    NFT_ADDRESS,
  };

  // Log addresses
  console.log('--------addresses have been recorded as follows:---------');
  console.log('PARSER_ADDRESS=', PARSER_ADDRESS);
  console.log('REPORTS_ADDRESS=', REPORTS_ADDRESS);
  console.log('TRANSACTION_ADDRESS=', TRANSACTION_ADDRESS);
  console.log('TIMESPAN_ADDRESS=', TIMESPAN_ADDRESS);
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

/** deployHandlers */
async function deployHandlers() {
  for (const code of handlerCodes) {
    await deployHandlerAndAppendToEnv(code);
  }
}

/** registerHandlers */
async function registerHandlers() {
  const [signer] = await ethers.getSigners();
  const contractWithSigner = new ethers.Contract(
    ROUTER_ADDRESS,
    contractABI,
    signer,
  );
  for (const key in handlers) {
    try {
      const tx = await contractWithSigner.registerHandler(
        key,
        handlers[key],
      );
      const receipt = await tx.wait();
      // Log registration handler
      console.log('Handler registered:', key);
    } catch (error) {
      console.log('error:', error);
    }
  }
}

/** main */
async function main() {
  await deployContracts();
  await deployHandlers();
  await registerHandlers();
}
main();
