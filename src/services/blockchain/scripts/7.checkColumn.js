const { timeStamp } = require('console');
require('events').EventEmitter.defaultMaxListeners = 15;
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
);
const privateKey = process.env.SEPOLIA_PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);
const contractABIPath = path.resolve(__dirname, '../../auditingABI.json');
const contractABI = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const reportsContractAddress = process.env.REPORTS_ADDRESS;
const contractInstance = new ethers.Contract(
  reportsContractAddress,
  contractABI,
  provider,
);
const router = contractInstance;
const contractWithSigner = new ethers.Contract(
  reportsContractAddress,
  contractABI,
  signer,
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 執行交易
async function getValue(reportID, reportType, reportColumn) {
  try {
    const result = await contractWithSigner.getValue(
      reportID,
      reportType,
      reportColumn,
    );
    console.log('Value:', result.toString()); // 打印返回的值
  } catch (error) {
    console.error('Error:', error);
  }
}

// Prompt the user for input
rl.question(
  'Please enter the reportID, reportType, and reportColumn: ',
  (input) => {
    const data = input.split(',');
    getValue(data[0], data[1], data[2]);
    rl.close();
  },
);
