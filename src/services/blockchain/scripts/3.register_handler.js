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

async function registerHandler(transactionType, handlerAddress) {
  const [signer] = await ethers.getSigners();
  const contractWithSigner = new ethers.Contract(
    routerContractAddress,
    contractABI,
    signer,
  );
  try {
    console.log('Sending transaction...');
    try {
      const tx = await contractWithSigner.registerHandler(
        transactionType,
        handlerAddress,
      );
      const receipt = await tx.wait();
      console.log('Transaction hash:', tx.hash);
      console.log('Transaction confirmed, details:');
      console.log('Block Number:', receipt.blockNumber);
      console.log('Gas Used:', receipt.gasUsed.toString());
    } catch (error) {
      console.log('error:', error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

rl.question(
  'Please enter the transaction type and handler address (as a comma-separated list of bytes32 values): ',
  async (input) => {
    const addresses = {
      '0x4530303031303030310000000000000000000000000000000000000000000000':
        process.env.E00010001_ADDRESS,
      '0x4530303031303030320000000000000000000000000000000000000000000000':
        process.env.E00010002_ADDRESS,
      '0x4530303031303030330000000000000000000000000000000000000000000000':
        process.env.E00010003_ADDRESS,
      '0x4530303031303030340000000000000000000000000000000000000000000000':
        process.env.E00010004_ADDRESS,
      '0x4530303031303030350000000000000000000000000000000000000000000000':
        process.env.E00010005_ADDRESS,
      '0x4530303031303030360000000000000000000000000000000000000000000000':
        process.env.E00010006_ADDRESS,
      '0x4530303031303030370000000000000000000000000000000000000000000000':
        process.env.E00010007_ADDRESS,
      '0x4530303031303030380000000000000000000000000000000000000000000000':
        process.env.E00010008_ADDRESS,
      '0x4530303032303030310000000000000000000000000000000000000000000000':
        process.env.E00020001_ADDRESS,
      '0x4530303032303030320000000000000000000000000000000000000000000000':
        process.env.E00020002_ADDRESS,
      '0x4530303032303030330000000000000000000000000000000000000000000000':
        process.env.E00020003_ADDRESS,
      '0x4530303032303030340000000000000000000000000000000000000000000000':
        process.env.E00020004_ADDRESS,
      '0x4530303032303030350000000000000000000000000000000000000000000000':
        process.env.E00020005_ADDRESS,
      '0x4530303032303030360000000000000000000000000000000000000000000000':
        process.env.E00020006_ADDRESS,
      '0x4530303032303030370000000000000000000000000000000000000000000000':
        process.env.E00020007_ADDRESS,
      '0x4530303032303030380000000000000000000000000000000000000000000000':
        process.env.E00020008_ADDRESS,
      '0x4530303032303030390000000000000000000000000000000000000000000000':
        process.env.E00020009_ADDRESS,
      '0x4530303032303031300000000000000000000000000000000000000000000000':
        process.env.E00020010_ADDRESS,
      '0x4530303032303031310000000000000000000000000000000000000000000000':
        process.env.E00020011_ADDRESS,
      '0x4530303032303031320000000000000000000000000000000000000000000000':
        process.env.E00020012_ADDRESS,
      '0x4530303033303030310000000000000000000000000000000000000000000000':
        process.env.E00030001_ADDRESS,
      '0x4530303033303030320000000000000000000000000000000000000000000000':
        process.env.E00030002_ADDRESS,
      '0x4530303033303030330000000000000000000000000000000000000000000000':
        process.env.E00030003_ADDRESS,
      '0x4530303033303030340000000000000000000000000000000000000000000000':
        process.env.E00030004_ADDRESS,
      '0x4530303033303030350000000000000000000000000000000000000000000000':
        process.env.E00030005_ADDRESS,
      '0x4530303033303030360000000000000000000000000000000000000000000000':
        process.env.E00030006_ADDRESS,
      '0x4530303033303030370000000000000000000000000000000000000000000000':
        process.env.E00030007_ADDRESS,
      '0x4530303033303030380000000000000000000000000000000000000000000000':
        process.env.E00030008_ADDRESS,
      '0x4530303033303030390000000000000000000000000000000000000000000000':
        process.env.E00030009_ADDRESS,
    };

    const inputWithAddress = `${input},${
      addresses[input] || 'default_address'
    }`;

    console.log('inputWithAddress:', inputWithAddress);
    const data = inputWithAddress.split(',');
    try {
      await registerHandler(data[0], data[1]);
      console.log('data[0]:', data[0]);
    } catch (error) {
      console.error('Error in registerHandler:', error);
    }

    rl.close();
  },
);
