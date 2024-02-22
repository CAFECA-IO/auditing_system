const { timeStamp } = require('console');
require('events').EventEmitter.defaultMaxListeners = 15;
const { ethers } = require('ethers');
const fs = require('fs');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const { report } = require('process');
const prisma = new PrismaClient();
const provider = new ethers.providers.JsonRpcProvider(
  `https://isuncoin.baifa.io`,
);

const contractABIPath = path.resolve(
  __dirname,
  '../../../../src/services/blockchain/artifacts/artifacts/src/services/blockchain/contracts/router.sol/RouterContract.json',
);
const contractABI = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const routerContractAddress = process.env.ROUTER_ADDRESS;
console.log('routerContractAddress', routerContractAddress);
const contractInstance = new ethers.Contract(
  routerContractAddress,
  contractABI.abi,
  provider,
);

const parser = process.env.PARSER_ADDRESS;
console.log('parser address:', parser);
const reports = contractInstance;
const reportName = process.env.REPORT_NAME;
console.log('reportName:', reportName);

/*const nftABIPath = path.resolve(
  __dirname,
  '../../../../src/services/blockchain/artifacts/artifacts/src/services/blockchain/contracts/report_nft.sol/ReportNFT.json',
);
const nftContractABI = JSON.parse(fs.readFileSync(nftABIPath, 'utf8'));
const nftContractAddress = process.env.NFT_ADDRESS;
console.log('nftContract', nftContractAddress);
const walletPrivateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(walletPrivateKey, provider);
const nftInstance = new ethers.Contract(
  nftContractAddress,
  nftContractABI.abi,
  wallet,
);

const nft = nftInstance;*/

/*async function mintNFT(recipientAddress, reportData) {
  try {
    const tx = await nft.mintReportNFT(recipientAddress, reportData);
    await tx.wait();
    console.log('NFT Minted, transaction hash:', tx.hash);
  } catch (error) {
    console.error('Error minting NFT:', error);
  }
}*/

async function getContractValue(reportName, reportType, reportColumn) {
  try {
    const value = await reports.getValue(reportName, reportType, reportColumn);
    console.log('value', value);

    formattedValue = ethers.utils.formatUnits(value, 18);

    return formattedValue;
  } catch (error) {
    console.error(error);
  }
}

async function insertDataToDB(data) {
  try {
    const balanceSheet = await prisma.balanceSheet.create({
      data: data,
    });
    console.log('Report saved to database:', balanceSheet);
  } catch (error) {
    console.error('Error saving data to database:', error);
  }
}

async function main() {
  /*REPORT_ID*/ const reportID = process.env.REPORT_ID;
  /*A001*/ const assets_details_cryptocurrency_totalAmountFairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );
  /*A002*/ const assets_details_cryptocurrency_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.amount',
    );
  /*A003*/ const assets_details_cryptocurrency_breakdown_USDT_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.fairValue',
    );
  /*A004*/ const assets_totalAmountFairValue = await getContractValue(
    reportName,
    'balanceSheet',
    'assets.totalAmountFairValue',
  );
  /*A005*/ const totalAssetsFairValue = await getContractValue(
    reportName,
    'balanceSheet',
    'totalAssetsFairValue',
  );
  /*A006*/ const liabilities_details_userDeposit_totalAmountFairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
  /*A007*/ const liabilities_details_userDeposit_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.amount',
    );
  /*A008*/ const liabilities_details_userDeposit_breakdown_USDT_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.fairValue',
    );
  /*A009*/ const liabilities_totalAmountFairValue = await getContractValue(
    reportName,
    'balanceSheet',
    'liabilities.totalAmountFairValue',
  );
  /*A010*/ const equity_details_retainedEarnings_totalAmountFairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );
  /*A011*/ const equity_details_retainedEarnings_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.amount',
    );
  /*A012*/ const equity_details_retainedEarnings_breakdown_USDT_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.fairValue',
    );
  /*A013*/ const equity_totalAmountFairValue = await getContractValue(
    reportName,
    'balanceSheet',
    'equity.totalAmountFairValue',
  );
  /*A014*/ const totalLiabilitiesAndEquityFairValue = await getContractValue(
    reportName,
    'balanceSheet',
    'totalLiabilitiesAndEquityFairValue',
  );
  /*A015*/ const assets_details_cryptocurrency_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.ETH.amount',
    );
  /*A016*/ const assets_details_cryptocurrency_breakdown_ETH_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.ETH.fairValue',
    );
  /*A017*/ const equity_details_retainedEarnings_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.ETH.amount',
    );
  /*A018*/ const equity_details_retainedEarnings_breakdown_ETH_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.ETH.fairValue',
    );
  /*A019*/ const assets_details_cashAndCashEquivalent_totalAmountFairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.totalAmountFairValue',
    );
  /*A020*/ const assets_details_accountsReceivable_totalAmountFairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.accountsReceivable.totalAmountFairValue',
    );

  /*A022*/

  /*A025*/ const assets_details_accountsReceivable_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.USDT.amount',
    );
  /*A026*/ const assets_details_accountsReceivable_breakdown_USDT_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.USDT.fairValue',
    );
  /*A027*/ const assets_details_accountsReceivable_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.BTC.amount',
    );
  /*A028*/ const assets_details_accountsReceivable_breakdown_BTC_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.BTC.fairValue',
    );
  /*A029*/ const assets_details_accountsReceivable_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.ETH.amount',
    );
  /*A030*/ const assets_details_accountsReceivable_breakdown_ETH_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.ETH.fairValue',
    );
  /*A031*/ const liabilities_details_accountsPayable_totalAmountFairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.accountsPayable.totalAmountFairValue',
    );
  /*A032*/ const liabilities_details_accountsPayable_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      ' liabilities.details.accountsPayable.breakdown.USD.amount',
    );
  /*A033*/ const liabilities_details_accountsPayable_breakdown_USD_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.USD.fairValue',
    );
  /*A034*/ const liabilities_details_accountsPayable_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.USDT.amount',
    );
  /*A035*/ const liabilities_details_accountsPayable_breakdown_USDT_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.USDT.fairValue',
    );
  /*A036*/ const liabilities_details_accountsPayable_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.BTC.amount',
    );
  /*A037*/ const liabilities_details_accountsPayable_breakdown_BTC_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.BTC.fairValue',
    );
  /*A038*/ const liabilities_details_accountsPayable_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.ETH.amount',
    );
  /*A039*/ const liabilities_details_accountsPayable_breakdown_ETH_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.ETH.fairValue',
    );
  /*A040*/ const liabilities_details_userDeposit_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USD.amount',
    );
  /*A041*/ const liabilities_details_userDeposit_breakdown_USD_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USD.fairValue',
    );
  /*A042*/ const liabilities_details_userDeposit_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.ETH.amount',
    );
  /*A043*/ const liabilities_details_userDeposit_breakdown_ETH_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.ETH.fairValue',
    );
  /*A044*/ const liabilities_details_userDeposit_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.BTC.amount',
    );
  /*A045*/ const liabilities_details_userDeposit_breakdown_BTC_airValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.BTC.fairValue',
    );
  /*A046*/ const assets_details_cryptocurrency_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.BTC.amount',
    );
  /*A047*/ const assets_details_cryptocurrency_breakdown_BTC_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.BTC.fairValue',
    );
  /*A048*/ const equity_details_retainedEarnings_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.BTC.amount',
    );
  /*A049*/ const equity_details_retainedEarnings_breakdown_BTC_fiarValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.BTC.fairValue',
    );
  /*A050*/ const equity_details_retainedEarnings_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USD.amount',
    );
  /*A051*/ const equity_details_retainedEarnings_breakdown_USD_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USD.fairValue',
    );
  /*A052*/ const equity_details_otherCapitalReserve_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.otherCapitalReserve.fairValue',
    );
  /*A053*/ const equity_details_otherCapitalReserve_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.USD.amount',
    );
  /*A054*/ const equity_details_otherCapitalReserve_breakdown_USD_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.USD.fairValue',
    );
  /*A055*/ const equity_details_otherCapitalReserve_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.USDT.amount',
    );
  /*A056*/ const equity_details_otherCapitalReserve_breakdown_USDT_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.USDT.fairValue',
    );
  /*A057*/ const equity_details_otherCapitalReserve_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.ETH.amount',
    );
  /*A058*/ const equity_details_otherCapitalReserve_breakdown_ETH_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.ETH.fairValue',
    );
  /*A059*/ const equity_details_otherCapitalReserve_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.BTC.amount',
    );
  /*A060*/ const equity_details_otherCapitalReserve_breakdown_BTC_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.BTC.fairValue',
    );
  /*A061*/ const assets_details_cashAndCashEquivalent_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.breakdown.USD.amount',
    );
  /*A062*/ const assets_details_cashAndCashEquivalent_breakdown_USD_fairValue =
    await getContractValue(
      reportName,
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.breakdown.USD.fairValue',
    );
  /*startTime*/ const startTime = await getContractValue(
    reportName,
    'time',
    'startTime',
  );
  /*endTime*/ const endTime = await getContractValue(
    reportName,
    'time',
    'endTime',
  );

  const data = {
    reportID: reportID,
    reportName: reportName,
    assetsDetailsCryptocurrencyTotalAmountFairValue:
      assets_details_cryptocurrency_totalAmountFairValue,
    assets_details_cryptocurrency_breakdown_USDT_amount:
      assets_details_cryptocurrency_breakdown_USDT_amount,
    assets_details_cryptocurrency_breakdown_USDT_fairValue:
      assets_details_cryptocurrency_breakdown_USDT_fairValue,
    assets_totalAmountFairValue: assets_totalAmountFairValue,
    totalAssetsFairValue: totalAssetsFairValue,
    liabilities_details_userDeposit_totalAmountFairValue:
      liabilities_details_userDeposit_totalAmountFairValue,
    liabilities_details_userDeposit_breakdown_USDT_amount:
      liabilities_details_userDeposit_breakdown_USDT_amount,
    liabilities_details_userDeposit_breakdown_USDT_fairValue:
      liabilities_details_userDeposit_breakdown_USDT_fairValue,
    liabilities_totalAmountFairValue: liabilities_totalAmountFairValue,
    equity_details_retainedEarnings_totalAmountFairValue:
      equity_details_retainedEarnings_totalAmountFairValue,
    equity_details_retainedEarnings_breakdown_USDT_amount:
      equity_details_retainedEarnings_breakdown_USDT_amount,
    equity_details_retainedEarnings_breakdown_USDT_fairValue:
      equity_details_retainedEarnings_breakdown_USDT_fairValue,
    equity_totalAmountFairValue: equity_totalAmountFairValue,
    totalLiabilitiesAndEquityFairValue: totalLiabilitiesAndEquityFairValue,
    assets_details_cryptocurrency_breakdown_ETH_amount:
      assets_details_cryptocurrency_breakdown_ETH_amount,
    assets_details_cryptocurrency_breakdown_ETH_fairValue:
      assets_details_cryptocurrency_breakdown_ETH_fairValue,
    equity_details_retainedEarnings_breakdown_ETH_amount:
      equity_details_retainedEarnings_breakdown_ETH_amount,
    equity_details_retainedEarnings_breakdown_ETH_fairValue:
      equity_details_retainedEarnings_breakdown_ETH_fairValue,
    assets_details_cashAndCashEquivalent_totalAmountFairValue:
      assets_details_cashAndCashEquivalent_totalAmountFairValue,
    assets_details_accountsReceivable_totalAmountFairValue:
      assets_details_accountsReceivable_totalAmountFairValue,
    assets_details_accountsReceivable_breakdown_USDT_amount:
      assets_details_accountsReceivable_breakdown_USDT_amount,
    assets_details_accountsReceivable_breakdown_USDT_fairValue:
      assets_details_accountsReceivable_breakdown_USDT_fairValue,
    assets_details_accountsReceivable_breakdown_BTC_amount:
      assets_details_accountsReceivable_breakdown_BTC_amount,
    assets_details_accountsReceivable_breakdown_BTC_fairValue:
      assets_details_accountsReceivable_breakdown_BTC_fairValue,
    assets_details_accountsReceivable_breakdown_ETH_amount:
      assets_details_accountsReceivable_breakdown_ETH_amount,
    assets_details_accountsReceivable_breakdown_ETH_fairValue:
      assets_details_accountsReceivable_breakdown_ETH_fairValue,
    liabilities_details_accountsPayable_totalAmountFairValue:
      liabilities_details_accountsPayable_totalAmountFairValue,
    liabilities_details_accountsPayable_breakdown_USD_amount:
      liabilities_details_accountsPayable_breakdown_USD_amount,
    liabilities_details_accountsPayable_breakdown_USD_fairValue:
      liabilities_details_accountsPayable_breakdown_USD_fairValue,
    liabilities_details_accountsPayable_breakdown_USDT_amount:
      liabilities_details_accountsPayable_breakdown_USDT_amount,
    liabilities_details_accountsPayable_breakdown_USDT_fairValue:
      liabilities_details_accountsPayable_breakdown_USDT_fairValue,
    liabilities_details_accountsPayable_breakdown_BTC_amount:
      liabilities_details_accountsPayable_breakdown_BTC_amount,
    liabilities_details_accountsPayable_breakdown_BTC_fairValue:
      liabilities_details_accountsPayable_breakdown_BTC_fairValue,
    liabilities_details_accountsPayable_breakdown_ETH_amount:
      liabilities_details_accountsPayable_breakdown_ETH_amount,
    liabilities_details_accountsPayable_breakdown_ETH_fairValue:
      liabilities_details_accountsPayable_breakdown_ETH_fairValue,
    liabilities_details_userDeposit_breakdown_USD_amount:
      liabilities_details_userDeposit_breakdown_USD_amount,
    liabilities_details_userDeposit_breakdown_USD_fairValue:
      liabilities_details_userDeposit_breakdown_USD_fairValue,
    liabilities_details_userDeposit_breakdown_ETH_amount:
      liabilities_details_userDeposit_breakdown_ETH_amount,
    liabilities_details_userDeposit_breakdown_ETH_fairValue:
      liabilities_details_userDeposit_breakdown_ETH_fairValue,
    liabilities_details_userDeposit_breakdown_BTC_amount:
      liabilities_details_userDeposit_breakdown_BTC_amount,
    liabilities_details_userDeposit_breakdown_BTC_airValue:
      liabilities_details_userDeposit_breakdown_BTC_airValue,
    assets_details_cryptocurrency_breakdown_BTC_amount:
      assets_details_cryptocurrency_breakdown_BTC_amount,
    assets_details_cryptocurrency_breakdown_BTC_fairValue:
      assets_details_cryptocurrency_breakdown_BTC_fairValue,
    equity_details_retainedEarnings_breakdown_BTC_amount:
      equity_details_retainedEarnings_breakdown_BTC_amount,
    equity_details_retainedEarnings_breakdown_BTC_fiarValue:
      equity_details_retainedEarnings_breakdown_BTC_fiarValue,
    equity_details_retainedEarnings_breakdown_USD_amount:
      equity_details_retainedEarnings_breakdown_USD_amount,
    equity_details_retainedEarnings_breakdown_USD_fairValue:
      equity_details_retainedEarnings_breakdown_USD_fairValue,
    equity_details_otherCapitalReserve_fairValue:
      equity_details_otherCapitalReserve_fairValue,
    equity_details_otherCapitalReserve_breakdown_USD_amount:
      equity_details_otherCapitalReserve_breakdown_USD_amount,
    equity_details_otherCapitalReserve_breakdown_USD_fairValue:
      equity_details_otherCapitalReserve_breakdown_USD_fairValue,
    equity_details_otherCapitalReserve_breakdown_USDT_amount:
      equity_details_otherCapitalReserve_breakdown_USDT_amount,
    equity_details_otherCapitalReserve_breakdown_USDT_fairValue:
      equity_details_otherCapitalReserve_breakdown_USDT_fairValue,
    equity_details_otherCapitalReserve_breakdown_ETH_amount:
      equity_details_otherCapitalReserve_breakdown_ETH_amount,
    equity_details_otherCapitalReserve_breakdown_ETH_fairValue:
      equity_details_otherCapitalReserve_breakdown_ETH_fairValue,
    equity_details_otherCapitalReserve_breakdown_BTC_amount:
      equity_details_otherCapitalReserve_breakdown_BTC_amount,
    equity_details_otherCapitalReserve_breakdown_BTC_fairValue:
      equity_details_otherCapitalReserve_breakdown_BTC_fairValue,
    assets_details_cashAndCashEquivalent_breakdown_USD_amount:
      assets_details_cashAndCashEquivalent_breakdown_USD_amount,
    assets_details_cashAndCashEquivalent_breakdown_USD_fairValue:
      assets_details_cashAndCashEquivalent_breakdown_USD_fairValue,
    startTime: startTime,
    endTime: endTime,
  };
  await insertDataToDB(data);
  //const reportData = JSON.stringify(data);
  //const recipientAddress = '0x2390B5b1DA7a78266111143D503D50c4636F5680';
  //await mintNFT(recipientAddress, reportData);
}

main().catch((e) => console.error(e));
