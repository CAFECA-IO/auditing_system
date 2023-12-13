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
    // 等待交易被確認
    const receipt = await tx.wait();

    // 檢查交易是否成功
    if (receipt.status === 0) {
      console.error('Transaction failed');
      throw new Error('Transaction failed'); // 拋出錯誤，中斷函數執行
    }

    console.log('Transaction confirmed, details:');
    console.log('Block Number:', receipt.blockNumber);
    console.log('Gas Used:', receipt.gasUsed.toString());
    // 如果有事件，也可以記錄事件詳情
    if (receipt.events) {
      receipt.events.forEach((event) => {
        console.log('Event:', event.event, 'with arguments:', event.args);
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Prompt the user for input
rl.question('Please enter reportID: ', async (input) => {
  const latestTransactionTime = await router.getLatestTransactionTime();
  let transactionTime = Number(latestTransactionTime);
  if (transactionTime > Number.MAX_SAFE_INTEGER) {
    transactionTime = BigInt(latestTransactionTime);
    console.log('latestTransactionTime:', transactionTime.toString());
    console.log('latestTransactionTime - 1', (transactionTime - 1n).toString());
    console.log('latestTransactionTime + 1', (transactionTime + 1n).toString());
    generateReport(transactionTime - 1n, transactionTime + 1n, input);
  } else {
    console.log('latestTransactionTime:', transactionTime);
    console.log('latestTransactionTime - 1', transactionTime - 1);
    console.log('latestTransactionTime + 1', transactionTime + 1);
    generateReport(transactionTime - 1, transactionTime + 1, input);
  }

  rl.close();
});
