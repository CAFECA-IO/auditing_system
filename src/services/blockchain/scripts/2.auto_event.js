const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');
const { ethers } = require('hardhat');
const path = require('path');
const readline = require('readline');
const contractABIPath = path.resolve(
  __dirname,
  '../../blockchain/artifacts/artifacts/src/services/blockchain/contracts/router.sol/RouterContract.json',
);
const contractJSON = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const contractABI = contractJSON.abi;
const routerContractAddress = process.env.ROUTER_ADDRESS;

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
    /*
    if (receipt.status === 0) {
      console.error('Transaction failed');
      throw new Error('Transaction failed'); // 拋出錯誤，中斷函數執行
    }
     */

    console.log('Block Number:', receipt.blockNumber);
  } catch (error) {
    // console.error('Error:', error);
  }
}


async function fetchData(beginId = 1) {
  try {
    const response = await axios.get(`https://tidebit.baifa.io/api/v1/events?beginId=${beginId}&limit=100`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return null;
  }
}

function isTimestamp(value) {
  const timestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return timestampPattern.test(value);
}

function stringToBytes32(text) {
  let buffer = Buffer.from(text);
  if (buffer.length < 32) {
    buffer = Buffer.concat([buffer, Buffer.alloc(32 - buffer.length)]);
  }
  return '0x' + buffer.toString('hex');
}

async function runCommand(command, input) {
  return new Promise((resolve, reject) => {
    const process = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve(stdout);
    });

    if (input) {
      process.stdin.write(input + '\n');
      process.stdin.end();
    }
  });
}

async function processData() {
  const startTimestamp = new Date().getTime();
  // read beaginId from file, use await fs.promises.readFile
  const rawId = await fs.promises.readFile('beginId.txt', 'utf8');
  const beginId = parseInt(rawId) || 1;
  const fetchedData = await fetchData(beginId);
  if (!fetchedData || !fetchedData.data) {
    console.log('No data available or wrong data structure');
    return;
  }

  for (const event of fetchedData.data) {
    const index = stringToBytes32(event.id.toString());
    const code = stringToBytes32(event.eventCode);
    let valuesArray = [index, code];
    let valuesArrayOriginal = [event.id, event.eventCode];

    Object.keys(event.details).forEach((key) => {
      let value = event.details[key];

      if (typeof value === 'number') {
        value = BigInt(Math.floor(value * 10 ** 18)).toString(16);
        // let padding with 0 to 64 bytes
        value = "0x" + value.padStart(64, '0');
      } else if (isTimestamp(value)) {
        // value = new Date(value).getTime().toString(16);
        value = Math.floor(new Date(value).getTime() / 1000).toString(16);
        value = "0x" + value.padStart(64, '0');
      }

      valuesArrayOriginal.push(value);
      // value = stringToBytes32(value);
      valuesArray.push(value);
    });

    /*
    console.log('---------------new transaction---------------');
    console.log('Values Array:', valuesArray);
    console.log('Values Array Original:', valuesArrayOriginal);
    console.log('-------------------------------');
     */

    await addTransactionRecord(valuesArray);
  }
  const newBeginId = (beginId + fetchedData.data.length).toString();
  await fs.promises.writeFile('beginId.txt', newBeginId);

  // console log used time
  const endTimestamp = new Date().getTime();
  const usedTime = (endTimestamp - startTimestamp) / 1000;
  console.log(`Event ${beginId} to ${newBeginId - 1}`)
  console.log(`Used time: ${usedTime} seconds`);
}

async function infiniteProcessData() {
  while (true) {
    try {
      await processData();
    } catch (error) {
      console.error(`Error processing data: ${error.message}`);
    }
  }
}

infiniteProcessData();