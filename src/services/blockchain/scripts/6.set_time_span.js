const { timeStamp } = require('console');
require('events').EventEmitter.defaultMaxListeners = 20;
const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { start } = require('repl');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//
const contractABIPath = path.resolve(
  __dirname,
  '../../blockchain/artifacts/artifacts/src/services/blockchain/contracts/router.sol/RouterContract.json',
);
const contractJSON = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const contractABI = contractJSON.abi;
const routerContractAddress = process.env.ROUTER_ADDRESS;
//
const nftABIPath = path.resolve(
  __dirname,
  '../../../../src/services/blockchain/artifacts/artifacts/src/services/blockchain/contracts/report_nft.sol/ReportNFT.json',
);
const nftContractJSON = JSON.parse(fs.readFileSync(nftABIPath, 'utf8'));
const nftcontractABI = nftContractJSON.abi;
const nftContractAddress = process.env.NFT_ADDRESS;

// 執行交易
async function generateReport(startTime, endTime, report_Name, _ispublic) {
  const [signer] = await ethers.getSigners();
  const contractWithSigner = new ethers.Contract(
    routerContractAddress,
    contractABI,
    signer,
  );
  const nftContractWithSigner = new ethers.Contract(
    nftContractAddress,
    nftcontractABI,
    signer,
  );

  try {
    const tx = await contractWithSigner.generateReport(
      startTime,
      endTime,
      report_Name,
      _ispublic,
    );
    const transaction_hash = tx.hash;
    console.log('Transaction hash:', transaction_hash);

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

  const recipientAddress = '0x2390B5b1DA7a78266111143D503D50c4636F5680';
  try {
    console.log('start minting NFT');
    const tx = await nftContractWithSigner.mintReportNFT(
      recipientAddress,
      startTime,
      endTime,
      report_Name,
    );
    const transaction_hash = tx.hash;
    console.log('Minting NFT Transaction hash:', transaction_hash);
    const receipt = await tx.wait();
    console.log('Transaction confirmed, details:');
    console.log('Block Number:', receipt.blockNumber);
    console.log('Gas Used:', receipt.gasUsed.toString());

    console.log('start getting latestTokenID');
    const latestTokenId = await nftContractWithSigner.getLatestTokenID();
    console.log('Latest Token ID:', latestTokenId.toString());

    fs.appendFileSync('.env', `REPORT_ID=${latestTokenId.toString()}\n`);
    console.log('.env file updated');
  } catch (error) {
    console.error('Error minting NFT:', error);
  }
}

rl.question(
  'Please enter reportName(bytes32)(startTime, EndTime, ispublic have already set default value to do auto test): ',
  async (input) => {
    const [signer] = await ethers.getSigners();
    const contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
    const router = contractWithSigner;
    const latestTransactionTime = await router.getLatestTransactionTime();
    let transactionTime = Number(latestTransactionTime);
    if (transactionTime > Number.MAX_SAFE_INTEGER) {
      transactionTime = BigInt(latestTransactionTime);
      console.log('latestTransactionTime:', transactionTime.toString());
      console.log(
        'latestTransactionTime - 1',
        (transactionTime - 1n).toString(),
      );
      console.log(
        'latestTransactionTime + 1',
        (transactionTime + 1n).toString(),
      );
      generateReport(transactionTime - 1n, transactionTime + 1n, input, 0);
    } else {
      console.log('latestTransactionTime:', transactionTime);
      console.log('latestTransactionTime - 1', transactionTime - 1);
      console.log('latestTransactionTime + 1', transactionTime + 1);
      generateReport(transactionTime - 1, transactionTime + 1, input, 0);
    }

    rl.close();
  },
);
