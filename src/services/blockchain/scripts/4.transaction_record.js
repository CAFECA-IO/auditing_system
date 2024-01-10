const { timeStamp } = require('console');
require('events').EventEmitter.defaultMaxListeners = 20;
const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const contractABIPath = path.resolve(
  __dirname,
  '../../blockchain/artifacts/artifacts/src/services/blockchain/contracts/router.sol/RouterContract.json',
);
const contractJSON = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const contractABI = contractJSON.abi;
const routerContractAddress = process.env.ROUTER_ADDRESS;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function addTransactionRecord(data) {
  const [signer] = await ethers.getSigners();
  const contractWithSigner = new ethers.Contract(
    routerContractAddress,
    contractABI,
    signer,
  );
  try {
    const tx = await contractWithSigner.addTransactionRecord(data);
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
  } catch (error) {
    console.error('Error:', error);
  }
}

rl.question(
  'Please enter the data (as a comma-separated list of bytes32 values): ',
  (input) => {
    const data = input.split(',');
    console.log('data:', data);
    addTransactionRecord(data);
    rl.close();
  },
);
