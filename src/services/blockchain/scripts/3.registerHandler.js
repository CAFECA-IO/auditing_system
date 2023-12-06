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
async function registerHandler(transactionType, handlerAddress) {
  try {
    const tx = await contractWithSigner.registerHandler(
      transactionType,
      handlerAddress,
    );
    console.log('Transaction hash:', tx.hash);

    // 等待交易被確認
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt);
  } catch (error) {
    console.error('Error:', error);
  }
}

rl.question(
  'Please enter the transaction type and handler address (as a comma-separated list of bytes32 values): ',
  (input) => {
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
    };

    const inputWithAddress = `${input},${
      addresses[input] || 'default_address'
    }`;

    console.log('inputWithAddress:', inputWithAddress);
    const data = inputWithAddress.split(',');
    console.log('data[0],data[1]:', data[0], data[1]);
    registerHandler(data[0], data[1]);
    rl.close();
  },
);
