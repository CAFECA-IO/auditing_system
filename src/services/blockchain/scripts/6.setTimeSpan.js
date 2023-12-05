const { timeStamp } = require('console');
require('events').EventEmitter.defaultMaxListeners = 20;
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
);
const privateKey = process.env.SEPOLIA_PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);
const contractABIPath = path.resolve(__dirname, '../../routerABI.json');
const contractABI = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const routerContractAddress = process.env.ROUTER_ADDRESS;
const contractInstance = new ethers.Contract(
  routerContractAddress,
  contractABI,
  provider,
);
const router = contractInstance;
const contractWithSigner = new ethers.Contract(
  routerContractAddress,
  contractABI,
  signer,
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 執行交易
async function generateReport(startTime, endTime, report_ID) {
  try {
    const tx = await contractWithSigner.generateReport(
      startTime,
      endTime,
      report_ID,
    );
    console.log('Transaction hash:', tx.hash);

    // Wait for the transaction to be confirmed
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Prompt the user for input
rl.question('Please enter reportID: ', async (input) => {
  const latestTransactionTime = await router.getLatestTransactionTime();
  console.log('latestTransactionTime:', latestTransactionTime.toString());
  generateReport(latestTransactionTime - 1, latestTransactionTime + 1, input);
  rl.close();
});
