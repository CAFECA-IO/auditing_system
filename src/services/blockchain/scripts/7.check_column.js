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
async function getValue(reportName, reportType, reportColumn) {
  const [signer] = await ethers.getSigners();
  const contractWithSigner = new ethers.Contract(
    routerContractAddress,
    contractABI,
    signer,
  );
  try {
    const result = await contractWithSigner.getValue(
      reportName,
      reportType,
      reportColumn,
    );
    console.log('Value:', result.toString());
  } catch (error) {
    console.error('Error:', error);
  }
}

// Prompt the user for input
rl.question(
  'Please enter the reportName, reportType, and reportColumn: ',
  (input) => {
    const data = input.split(',');
    getValue(data[0], data[1], data[2]);
    rl.close();
  },
);

module.exports = { getValue };
