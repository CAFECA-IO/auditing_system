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

// 執行交易
async function setRate(SP002, SP003, SP004, reportName) {
  const [signer] = await ethers.getSigners();
  const contractWithSigner = new ethers.Contract(
    routerContractAddress,
    contractABI,
    signer,
  );
  try {
    const tx = await contractWithSigner.setRate(
      SP002,
      SP003,
      SP004,
      reportName,
    );
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
  'Please enter the rates and reportName (as a comma-separated list of bytes32 values): ',
  (input) => {
    const data = input.split(',');
    setRate(data[0], data[1], data[2], data[3]);
    rl.close();
  },
);
