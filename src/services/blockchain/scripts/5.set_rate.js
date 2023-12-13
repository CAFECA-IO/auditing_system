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
async function setRate(SP002, SP003, SP004, Report_ID) {
  try {
    const tx = await contractWithSigner.setRate(SP002, SP003, SP004, Report_ID);
    console.log('Transaction hash:', tx.hash);

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

rl.question(
  'Please enter the rates (as a comma-separated list of bytes32 values): ',
  (input) => {
    const data = input.split(',');
    setRate(data[0], data[1], data[2], data[3]);
    rl.close();
  },
);
