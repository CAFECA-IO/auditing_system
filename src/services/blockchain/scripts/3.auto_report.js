const { ethers } = require('hardhat');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const contractArgsABIPath = path.resolve(
  __dirname,
  '../../blockchain/artifacts/artifacts/src/services/blockchain/contracts/router.sol/RouterContract.json',
);
const contractNFTABIPath = path.resolve(
  __dirname,
  '../../blockchain/artifacts/artifacts/src/services/blockchain/contracts/report_nft.sol/ReportNFT.json',
);
const contractArgsJSON = JSON.parse(fs.readFileSync(contractArgsABIPath, 'utf8'));
const contractNFTJSON = JSON.parse(fs.readFileSync(contractNFTABIPath, 'utf8'));
const contractArgsABI = contractArgsJSON.abi;
const contractNFTABI = contractNFTJSON.abi;
const routerContractAddress = process.env.ROUTER_ADDRESS;

const reportPath = 'reportId.txt';
const beginPath = 'beginId.txt';
const defaultTimestamp = 1498176000;
const period = 24 * 60 * 60;

async function getReportId() {
  try {
    const reportId = await fs.promises.readFile(reportPath, 'utf8');
    return reportId;
  } catch (error) {
    return 0;
  }
}

async function updateReportId(timestamp) {
  // update reportId file, use promise
  const reportId = timestamp.toString();
  await fs.promises.writeFile(reportPath, reportId);
}

async function getBeginId() {
  const beginId = await fs.promises.readFile(beginPath, 'utf8');
  return beginId;
}

function convertToSolidityString(text) {
  let result = "0x";
  for (let i = 0; i < text.length; i++) {
      // 將每個字符轉換成十六進制表示
      let hex = text.charCodeAt(i).toString(16);
      // 確保每個字符都是兩位數的十六進制表示
      if (hex.length < 2) {
          hex = "0" + hex;
      }
      // 將每個字符的十六進制表示添加到結果中
      result += hex;
  }
  // 如果結果長度不足 64，則在前面填充零
  while (result.length < 66) {
      result += "0";
  }
  return result;
}

function convertToSolidityUint(value) {
  const hex = value.toString(16);
  return '0x' + hex.padStart(64, '0');
}

function getReportNumber(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return year * 10000 + month * 100 + day;
}

function getReportName(timestamp) {
  const reportNumber = getReportNumber(timestamp);
  return `TideBit_Daily_${reportNumber}`;
}

function getReportArgs(timestamp) {
  const reportName = getReportName(timestamp);
  // console.log('reportName', reportName);
  const reportArgs = [
    '0x0000000000000000000000000000000000000000000000000dbd2fc137a30000',
    '0x000000000000000000000000000000000000000000000056bc75e2d631000000',
    '0x000000000000000000000000000000000000000000000581767ba6189c400000',
    convertToSolidityString(reportName),
  ]
  return reportArgs;
}

async function fetchEventTimestamp() {
  try {
    const beginId = await getBeginId();
    const response = await axios.get(`https://tidebit.baifa.io/api/v1/events?beginId=${beginId}&limit=100`);
    const timestamp = response.data?.data[0]?.occurredAt || defaultTimestamp;
    return timestamp;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return null;
  }
}

async function fetchReportTimestamp() {
  const reportId = await getReportId();
  // console.log('reportId', reportId);
  const reportTimestamp = parseInt(reportId) | 0;
  // console.log('reportTimestamp', reportTimestamp);
  return reportTimestamp;
}

async function getNewReportTimestamp() {
  const lastEventTimestamp = await fetchEventTimestamp();
  const lastReportTimestamp = await fetchReportTimestamp();
  // console.log('lastEventTimestamp', lastEventTimestamp);
  // console.log('lastReportTimestamp', lastReportTimestamp);
  let newReportTimestamp = 0
  if (lastReportTimestamp === 0) {
    newReportTimestamp = defaultTimestamp;
    // console.log('newReportTimestamp', newReportTimestamp);
    return newReportTimestamp
  }
  if (lastEventTimestamp - lastReportTimestamp > period) {
    newReportTimestamp = lastReportTimestamp + period;
    // console.log('newReportTimestamp', newReportTimestamp);
    return newReportTimestamp;
  }
}

async function fillReportArgs(timestamp, contractWithSigner, reportArgs) {
  if (timestamp > 0) {
    try {
      const tx = await contractWithSigner.setRate(
        ...reportArgs,
      );
      
      console.log('Transaction hash:', tx.hash);

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        console.error('Transaction failed');
        throw new Error('Transaction failed');
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
      if (error.message.includes('Report ID already used')) {
        throw error
      } else {
        console.error('Error:', error);
      }
    }
  }
}

async function mintReportNFT(timestamp) {
  if (timestamp > 0) {
    const reportName = getReportName(timestamp);
    const [signer] = await ethers.getSigners();
    const nftContractWithSigner = new ethers.Contract(
      process.env.NFT_ADDRESS,
      contractNFTABI,
      signer,
    );

    const recipientAddress = '0x2390B5b1DA7a78266111143D503D50c4636F5680';
    const _ispublic = 0;
    try {
      const startTime = timestamp;
      const endTime = startTime + period;
      const tx = await nftContractWithSigner.mintReportNFT(
        recipientAddress,
        startTime,
        endTime,
        reportName,
        _ispublic,
      );
      const transactionHash = tx.hash;
      console.log('Minting NFT Transaction hash:', transactionHash);
      const receipt = await tx.wait();
      console.log('Transaction confirmed, details:');
      console.log('Block Number:', receipt.blockNumber);
      console.log('Gas Used:', receipt.gasUsed.toString());

      console.log('start getting latestTokenID');
      const latestTokenId = await nftContractWithSigner.getLatestTokenID();
      console.log('Latest Token ID:', latestTokenId.toString());
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

async function generateReport() {
  const newReportTimestamp = await getNewReportTimestamp();
  if (newReportTimestamp > 0) {
    try {
      const reportArgs = getReportArgs(newReportTimestamp);
      const [signer] = await ethers.getSigners();
      const contractWithSigner = new ethers.Contract(
        routerContractAddress,
        contractArgsABI,
        signer,
      );
      await fillReportArgs(newReportTimestamp, contractWithSigner, reportArgs);
      await generateChainReport(newReportTimestamp, contractWithSigner);
      await mintReportNFT(newReportTimestamp);
      await updateReportId(newReportTimestamp);
    } catch(error) {
      // if Report already mint, update Report ID and skip this report
      if (error.message.includes('Report ID already used')) {
        await updateReportId(newReportTimestamp);
      } else {
        console.error('Error:', error);
      }
    }
  } else {
    // end of the day, sleep for 1 hour
    console.log('Sleep for 1 hour');
    await new Promise(resolve => setTimeout(resolve, 3600000));
  }
}

async function generateChainReport(timestamp, contractWithSigner) {
  try {
    const startTime = timestamp;
    const endTime = startTime + period;
    const reportName = getReportName(timestamp);
    const reportNameHex = convertToSolidityString(reportName)
    const tx = await contractWithSigner.generateReport(
      startTime,
      endTime,
      reportNameHex,
    );
    // console.log("generateChainReport");
    // console.log("srartTime", startTime, "endTime", endTime, "reportName", reportName); 
    const transaction_hash = tx.hash;
    console.log('Transaction hash:', transaction_hash);

    const receipt = await tx.wait();

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

async function infinityLoop() {
  await generateReport();
  await infinityLoop();
}

infinityLoop();