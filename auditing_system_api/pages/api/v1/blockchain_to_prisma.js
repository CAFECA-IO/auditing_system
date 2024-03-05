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

async function insertDataToDBBalanceSheet(data) {
  try {
    const balanceSheet = await prisma.balanceSheet.create({
      data: data,
    });
    console.log('BalReport saved to database:', balanceSheet);
  } catch (error) {
    console.error('Error saving data to database:', error);
  }
}

async function insertDataToDBComprehensive(data) {
  try {
    const comprehensiveIncome = await prisma.comprehensiveIncome.create({
      data: data,
    });
    console.log('Report saved to database:', comprehensiveIncome);
  } catch (error) {
    console.error('Error saving data to database:', error);
  }
}

async function insertDataToDBCashFlow(data) {
  try {
    const cashFlow = await prisma.cashFlow.create({
      data: data,
    });
    console.log('Report saved to database:', cashFlow);
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
  /*B001*/ const income_details_depositFee_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.depositFee.weightedAverageCost',
    );
  /*B002*/ const income_details_depositFee_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.USDT.amount',
    );
  /*B003*/ const income_details_depositFee_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.USDT.weightedAverageCost',
    );
  /*B004*/ const netProfit = await getContractValue(
    reportName,
    'comprehensiveIncome',
    'netProfit',
  );
  /*B005*/ const income_details_withdrawalFee_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.withdrawalFee.weightedAverageCost',
    );
  /*B006*/ const income_details_withdrawalFee_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.USDT.amount',
    );
  /*B007*/ const income_details_withdrawalFee_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.USDT.weightedAverageCost',
    );
  /*B008*/ const costs_details_technicalProviderFee_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.weightedAverageCost',
    );
  /*B009*/ const costs_details_technicalProviderFee_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.ETH.amount',
    );
  /*B010*/ const costs_details_technicalProviderFee_breakdown_ETH_fairValue =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.ETH.fairValue',
    );
  /*B011*/ const income_details_transactionFee_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.transactionFee.weightedAverageCost',
    );
  /*B012*/ const income_details_spreadFee_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.spreadFee.weightedAverageCost',
    );
  /*B013*/ const income_details_liquidationFee_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.liquidationFee.weightedAverageCost',
    );
  /*B014*/ const income_details_guaranteedStopFee_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.weightedAverageCost',
    );
  /*B015*/ const costs_details_marketDataProviderFee_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'costs.details.marketDataProviderFee.weightedAverageCost',
    );
  /*B016*/ const costs_details_newCoinListingCost_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'costs.details.newCoinListingCost.weightedAverageCost',
    );
  /*B017*/ const operatingExpenses_details_salaries = await getContractValue(
    reportName,
    'comprehensiveIncome',
    'operatingExpenses.details.salaries',
  );
  /*B018*/ const operatingExpenses_details_rent = await getContractValue(
    reportName,
    'comprehensiveIncome',
    'operatingExpenses.details.rent',
  );
  /*B019*/ const operatingExpenses_details_marketing = await getContractValue(
    reportName,
    'comprehensiveIncome',
    'operatingExpenses.details.marketing',
  );
  /*B020*/ const operatingExpenses_details_rebateExpenses_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.weightedAverageCost',
    );

  /*B021*/ const financialCosts_details_interestExpense =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'financialCosts.details.interestExpense',
    );
  /*B022*/ const financialCosts_details_cryptocurrencyForexLosses =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses',
    );
  /*B023*/ const financialCosts_details_fiatToCryptocurrencyConversionLosses =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'financialCosts.details.fiatToCryptocurrencyConversionLosses',
    );
  /*B024*/ const financialCosts_details_cryptocurrencyToFiatConversionLosses =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyToFiatConversionLosses',
    );
  /*B025*/ const financialCosts_details_fiatToFiatConversionLosses =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'financialCosts.details.fiatToFiatConversionLosses',
    );
  /*B026*/ const otherGainsLosses_details_investmentGains =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'otherGainsLosses.details.investmentGains',
    );
  /*B027*/ const otherGainsLosses_details_forexGains = await getContractValue(
    reportName,
    'comprehensiveIncome',
    'otherGainsLosses.details.forexGains',
  );
  /*B028*/ const otherGainsLosses_details_cryptocurrencyGains_weightedAverageCosts =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.weightedAverageCosts',
    );

  /*B029*/ const income_weightedAverageCost = await getContractValue(
    reportName,
    'comprehensiveIncome',
    'income.weightedAverageCost',
  );
  /*B030*/ const costs_weightedAverageCost = await getContractValue(
    reportName,
    'comprehensiveIncome',
    'costs.weightedAverageCost',
  );
  /*B031*/ const operatingExpenses_weightedAverageCost = await getContractValue(
    reportName,
    'comprehensiveIncome',
    'operatingExpenses.weightedAverageCost',
  );
  /*B032*/ const financialCosts_weightedAverageCost = await getContractValue(
    reportName,
    'comprehensiveIncome',
    'financialCosts.weightedAverageCost',
  );
  /*B033*/ const otherGainsLosses_weightedAverageCost = await getContractValue(
    reportName,
    'comprehensiveIncome',
    'otherGainsLosses.weightedAverageCost',
  );
  /*B034*/ const income_details_depositFee_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.ETH.amount',
    );
  /*B035*/ const income_details_depositFee_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.ETH.weightedAverageCost',
    );
  /*B036*/ const income_details_depositFee_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.BTC.amount',
    );
  /*B037*/ const income_details_depositFee_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.BTC.weightedAverageCost',
    );
  /*B038*/ const income_details_depositFee_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.USD.amount',
    );
  /*B039*/ const income_details_depositFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.USD.weightedAverageCost',
    );
  /*B040*/ const income_details_withdrawalFee_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.ETH.amount',
    );
  /*B041*/ const income_details_withdrawalFee_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.ETH.weightedAverageCost',
    );
  /*B042*/ const income_details_withdrawalFee_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.BTC.amount',
    );
  /*B043*/ const income_details_withdrawalFee_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.BTC.weightedAverageCost',
    );
  /*B044*/ const income_details_withdrawalFee_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.USD.amount',
    );
  /*B045*/ const income_details_withdrawalFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.USD.weightedAverageCost',
    );
  /*B046*/ const income_details_transactionFee_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.ETH.amount',
    );
  /*B047*/ const income_details_transactionFee_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.ETH.weightedAverageCost',
    );
  /*B048*/ const income_details_transactionFee_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.BTC.amount',
    );
  /*B049*/ const income_details_transactionFee_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.BTC.weightedAverageCost',
    );
  /*B050*/ const income_details_transactionFee_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.USDT.amount',
    );
  /*B051*/ const income_details_transactionFee_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.USDT.weightedAverageCost',
    );
  /*B052*/ const income_details_transactionFee_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.USD.amount',
    );
  /*B053*/ const income_details_transactionFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.USD.weightedAverageCost',
    );
  /*B054*/ const income_details_spreadFee_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      ' income.details.spreadFee.breakdown.ETH.amount',
    );
  /*B055*/ const income_details_spreadFee_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.spreadFee.breakdown.ETH.weightedAverageCost',
    );
  /*B056*/ const income_details_spreadFee_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.spreadFee.breakdown.BTC.amount',
    );
  /*B057*/ const income_details_spreadFee_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.spreadFee.breakdown.BTC.weightedAverageCost',
    );
  /*B058*/ const income_details_spreadFee_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.spreadFee.breakdown.USDT.amount',
    );
  /*B059*/ const income_details_spreadFee_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.spreadFee.breakdown.USDT.weightedAverageCost',
    );
  /*B060*/ const income_details_spreadFee_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.spreadFee.breakdown.USD.amount',
    );
  /*B061*/ const income_details_spreadFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.spreadFee.breakdown.USD.weightedAverageCost',
    );
  /*B062*/ const income_details_liquidationFee_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.ETH.amount',
    );
  /*B063*/ const income_details_liquidationFee_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.ETH.weightedAverageCost',
    );
  /*B064*/ const income_details_liquidationFee_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.BTC.amount',
    );
  /*B065*/ const income_details_liquidationFee_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.BTC.weightedAverageCost',
    );
  /*B066*/ const income_details_liquidationFee_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.USDT.amount',
    );
  /*B067*/ const income_details_liquidationFee_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      ' income.details.liquidationFee.breakdown.USDT.weightedAverageCost',
    );
  /*B068*/ const income_details_liquidationFee_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.USD.amount',
    );
  /*B069*/ const income_details_liquidationFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.USD.weightedAverageCost',
    );
  /*B070*/ const income_details_guaranteedStopFee_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.breakdown.ETH.amount',
    );
  /*B071*/ const income_details_guaranteedStopFee_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.breakdown.ETH.weightedAverageCost',
    );
  /*B072*/ const income_details_guaranteedStopFee_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.breakdown.BTC.amount',
    );
  /*B073*/ const income_details_guaranteedStopFee_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.breakdown.BTC.weightedAverageCost',
    );
  /*B074*/ const income_details_guaranteedStopFee_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      ' income.details.guaranteedStopFee.breakdown.USDT.amount',
    );
  /*B075*/ const income_details_guaranteedStopFee_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.breakdown.USDT.weightedAverageCost',
    );
  /*B076*/ const income_details_guaranteedStopFee_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.breakdown.USD.amount',
    );
  /*B077*/ const income_details_guaranteedStopFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.breakdown.USD.weightedAverageCost',
    );
  /*B078*/ const operatingExpenses_details_rebateExpenses_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.ETH.amount',
    );
  /*B079*/ const operatingExpenses_details_rebateExpenses_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.ETH.weightedAverageCost',
    );
  /*B080*/ const operatingExpenses_details_rebateExpenses_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.BTC.amount',
    );
  /*B081*/ const operatingExpenses_details_rebateExpenses_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.BTC.weightedAverageCost',
    );
  /*B082*/ const operatingExpenses_details_rebateExpenses_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.USDT.amount',
    );
  /*B083*/ const operatingExpenses_details_rebateExpenses_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.USDT.weightedAverageCost',
    );
  /*B084*/ const operatingExpenses_details_rebateExpenses_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.USD.amount',
    );
  /*B085*/ const operatingExpenses_details_rebateExpenses_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.USD.weightedAverageCost',
    );
  /*B086*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.ETH.amount',
    );
  /*B087*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.ETH.weightedAverageCost',
    );
  /*B088*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.BTC.amount',
    );
  /*B089*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.BTC.weightedAverageCost,',
    );
  /*B090*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.USDT.amount',
    );
  /*B091*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.USDT.weightedAverageCost',
    );
  /*B092*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.USD.amount',
    );
  /*B093*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.USD.weightedAverageCost',
    );
  /*B094*/ const costs_details_technicalProviderFee_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.BTC.amount',
    );
  /*B095*/ const costs_details_technicalProviderFee_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.BTC.weightedAverageCost',
    );
  /*B096*/ const costs_details_technicalProviderFee_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.USDT.amount',
    );
  /*B097*/ const costs_details_technicalProviderFee_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.USDT.weightedAverageCost',
    );
  /*B098*/ const costs_details_technicalProviderFee_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.USD.amount',
    );
  /*B099*/ const costs_details_technicalProviderFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.USD.weightedAverageCost',
    );
  /*B100*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.USDT.amount',
    );
  /*B101*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.USDT.weightedAverageCost',
    );
  /*B102*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.ETH.amount',
    );
  /*B103*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.ETH.weightedAverageCost',
    );
  /*B104*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.BTC.amount',
    );
  /*B105*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.BTC.weightedAverageCost',
    );
  /*B106*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.USD.amount',
    );
  /*B107*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.USD.weightedAverageCost',
    );

  /*C001*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.weightedAverageCost',
    );
  /*C002*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.amount',
    );
  /*C003*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.weightedAverageCost',
    );
  /*C004*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost',
    );
  /*C005*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.amount',
    );
  /*C006*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.weightedAverageCost',
    );
  /*C007*/ const supplementalScheduleOfNonCashOperatingActivities_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost',
    );
  /*C008*/ const otherSupplementaryItems_details_relatedToNonCash_cryptocurrenciesEndOfPeriod_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost',
    );
  /*C009*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      ' supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost',
    );
  /*C010*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.USDT.amount',
    );
  /*C011*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.USDT.weightedAverageCost',
    );
  /*C012*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost',
    );
  /*C013*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.amount',
    );
  /*C014*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.weightedAverageCost',
    );
  /*C015*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyInflows.weightedAverageCost',
    );
  /*C016*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyOutflows.weightedAverageCost',
    );
  /*C023*/ const supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.purchaseOfCryptocurrenciesWithNonCashConsideration.weightedAverageCost',
    );
  /*C024*/ const supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.disposalOfCryptocurrenciesForNonCashConsideration.weightedAverageCost',
    );
  /*C025*/ const otherSupplementaryItems_details_relatedToNonCash_cryptocurrenciesBeginningOfPeriod_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesBeginningOfPeriod.weightedAverageCost',
    );
  /*C027*/ const operatingActivities_details_cashDepositedByCustomers_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.cashDepositedByCustomers.weightedAverageCost',
    );
  /*C028*/ const operatingActivities_details_cashWithdrawnByCustomers_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.cashWithdrawnByCustomers.weightedAverageCost',
    );
  /*C029*/ const operatingActivities_details_purchaseOfCryptocurrencies_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.purchaseOfCryptocurrencies.weightedAverageCost',
    );
  /*C030*/ const operatingActivities_details_disposalOfCryptocurrencies_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.disposalOfCryptocurrencies.weightedAverageCost',
    );
  /*C031*/ const operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.weightedAverageCost',
    );
  /*C034*/ const operatingActivities_details_cashPaidToSuppliersForExpenses_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.cashPaidToSuppliersForExpenses.weightedAverageCost',
    );
  /*C037*/ const operatingActivities_details_insuranceFundForPerpetualContracts_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.insuranceFundForPerpetualContracts.weightedAverageCost',
    );
  /*C041*/ const operatingActivities_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.weightedAverageCost',
    );
  /*C042*/ const investingActivities_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'investingActivities.weightedAverageCost',
    );
  /*C043*/ const financingActivities_details_proceedsFromIssuanceOfCommonStock_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'financingActivities.details.proceedsFromIssuanceOfCommonStock.weightedAverageCost',
    );
  /*C044*/ const financingActivities_details_longTermDebt_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'financingActivities.details.longTermDebt.weightedAverageCost',
    );
  /*C045*/ const financingActivities_details_shortTermBorrowings_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'financingActivities.details.shortTermBorrowings.weightedAverageCost',
    );
  /*C046*/ const financingActivities_details_paymentsOfDividends_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'financingActivities.details.paymentsOfDividends.weightedAverageCost',
    );
  /*C047*/ const financingActivities_details_treasuryStock_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'financingActivities.details.treasuryStock.weightedAverageCost',
    );
  /*C048*/ const financingActivities_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'financingActivities.weightedAverageCost',
    );
  /*C049*/ const otherSupplementaryItems_details_relatedToCash_netIncreaseDecreaseInCashCashEquivalentsAndRestrictedCash_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'otherSupplementaryItems.details.relatedToCash.netIncreaseDecreaseInCashCashEquivalentsAndRestrictedCash.weightedAverageCost',
    );
  /*C050*/ const otherSupplementaryItems_details_relatedToCash_cryptocurrenciesBeginningOfPeriod_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'otherSupplementaryItems.details.relatedToCash.cryptocurrenciesBeginningOfPeriod.weightedAverageCost',
    );

  /*C051*/ const otherSupplementaryItems_details_relatedToCash_cryptocurrenciesEndOfPeriod_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'otherSupplementaryItems.details.relatedToCash.cryptocurrenciesEndOfPeriod.weightedAverageCost',
    );

  /*C052*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.ETH.amount',
    );
  /*C053*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.ETH.weightedAverageCost',
    );
  /*C054*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.BTC.amount',
    );
  /*C055*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.BTC.weightedAverageCost',
    );
  /*C056*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.amount',
    );
  /*C057*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.weightedAverageCost',
    );
  /*C058*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.BTC.amount',
    );
  /*C059*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyInflows.breakdown.ETH.amount',
    );
  /*C060*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.weightedAverageCost',
    );
  /*C061*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyInflows.breakdown.ETH.weightedAverageCost',
    );
  /*C062*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyInflows.breakdown.BTC.amount',
    );
  /*C063*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyInflows.breakdown.BTC.weightedAverageCost',
    );
  /*C064*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyInflows.breakdown.USDT.amount',
    );
  /*C065*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyInflows.breakdown.USDT.weightedAverageCost',
    );
  /*C066*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyOutflows.breakdown.ETH.amount',
    );
  /*C067*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyOutflows.breakdown.ETH.weightedAverageCost',
    );
  /*C068*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyOutflows.breakdown.BTC.amount',
    );
  /*C069*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyOutflows.breakdown.BTC.weightedAverageCost',
    );
  /*C070*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyOutflows.breakdown.USDT.amount',
    );
  /*C071*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyOutflows.breakdown.USDT.weightedAverageCost',
    );
  /*C072*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.amount',
    );
  /*C073*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.weightedAverageCost',
    );
  /*C074*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.BTC.amount',
    );
  /*C075*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.BTC.weightedAverageCost',
    );
  /*C088*/ const supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.purchaseOfCryptocurrenciesWithNonCashConsideration.breakdown.ETH.amount',
    );
  /*C089*/ const supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.purchaseOfCryptocurrenciesWithNonCashConsideration.breakdown.ETH.weightedAverageCost',
    );
  /*C090*/ const supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.purchaseOfCryptocurrenciesWithNonCashConsideration.breakdown.BTC.amount',
    );
  /*C091*/ const supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.purchaseOfCryptocurrenciesWithNonCashConsideration.breakdown.BTC.weightedAverageCost',
    );
  /*C092*/ const supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.purchaseOfCryptocurrenciesWithNonCashConsideration.breakdown.USDT.amount',
    );
  /*C093*/ const supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.purchaseOfCryptocurrenciesWithNonCashConsideration.breakdown.USDT.weightedAverageCost',
    );
  /*C094*/ const supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_ETH_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.disposalOfCryptocurrenciesForNonCashConsideration.breakdown.ETH.amount',
    );
  /*C095*/ const supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.disposalOfCryptocurrenciesForNonCashConsideration.breakdown.ETH.weightedAverageCost',
    );
  /*C096*/ const supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.disposalOfCryptocurrenciesForNonCashConsideration.breakdown.BTC.amount',
    );
  /*C097*/ const supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.disposalOfCryptocurrenciesForNonCashConsideration.breakdown.BTC.weightedAverageCost',
    );
  /*C098*/ const supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.disposalOfCryptocurrenciesForNonCashConsideration.breakdown.USDT.amount',
    );
  /*C099*/ const supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.disposalOfCryptocurrenciesForNonCashConsideration.breakdown.USDT.weightedAverageCost',
    );
  /*C106*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_USDT_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.USDT.amount',
    );
  /*C107*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.USDT.weightedAverageCost',
    );
  /*C108*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_BTC_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.BTC.amount',
    );
  /*C109*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      ' supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.BTC.weightedAverageCost',
    );
  /*C134*/ const operatingActivities_details_cashDepositedByCustomers_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.cashDepositedByCustomers.breakdown.USD.amount',
    );
  /*C135*/ const operatingActivities_details_cashDepositedByCustomers_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.cashDepositedByCustomers.breakdown.USD.weightedAverageCost',
    );
  /*C136*/ const operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.amount',
    );
  /*C137*/ const operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.weightedAverageCost',
    );
  /*C138*/ const operatingActivities_details_cashPaidToSuppliersForExpenses_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.cashPaidToSuppliersForExpenses.breakdown.USD.amount',
    );
  /*C139*/ const operatingActivities_details_cashPaidToSuppliersForExpenses_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.cashPaidToSuppliersForExpenses.breakdown.USD.weightedAverageCost',
    );
  /*C140*/ const operatingActivities_details_cashWithdrawnByCustomers_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.amount',
    );
  /*C141*/ const operatingActivities_details_cashWithdrawnByCustomers_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.weightedAverageCost',
    );
  /*C142*/ const operatingActivities_details_purchaseOfCryptocurrencies_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.purchaseOfCryptocurrencies.breakdown.USD.amount',
    );
  /*C143*/ const operatingActivities_details_purchaseOfCryptocurrencies_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.purchaseOfCryptocurrencies.breakdown.USD.weightedAverageCost',
    );
  /*C144*/ const operatingActivities_details_disposalOfCryptocurrencies_breakdown_USD_amount =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.disposalOfCryptocurrencies.breakdown.USD.amount',
    );
  /*C145*/ const operatingActivities_details_disposalOfCryptocurrencies_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'operatingActivities.details.disposalOfCryptocurrencies.breakdown.USD.weightedAverageCost',
    );
  /*C146*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToCustomersForPerpetualContractProfits_weightedAverageCost =
    await getContractValue(
      reportName,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToCustomersForPerpetualContractProfits.weightedAverageCost',
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
  await insertDataToDBBalanceSheet(data);

  const data2 = {
    reportID: reportID,
    reportName: reportName,
    income_details_depositFee_weightedAverageCost:
      income_details_depositFee_weightedAverageCost,
    income_details_depositFee_breakdown_USDT_amount:
      income_details_depositFee_breakdown_USDT_amount,
    income_details_depositFee_breakdown_USDT_weightedAverageCost:
      income_details_depositFee_breakdown_USDT_weightedAverageCost,
    netProfit: netProfit,
    income_details_withdrawalFee_weightedAverageCost:
      income_details_withdrawalFee_weightedAverageCost,
    income_details_withdrawalFee_breakdown_USDT_amount:
      income_details_withdrawalFee_breakdown_USDT_amount,
    income_details_withdrawalFee_breakdown_USDT_weightedAverageCost:
      income_details_withdrawalFee_breakdown_USDT_weightedAverageCost,
    costs_details_technicalProviderFee_weightedAverageCost:
      costs_details_technicalProviderFee_weightedAverageCost,
    costs_details_technicalProviderFee_breakdown_ETH_amount:
      costs_details_technicalProviderFee_breakdown_ETH_amount,
    costs_details_technicalProviderFee_breakdown_ETH_fairValue:
      costs_details_technicalProviderFee_breakdown_ETH_fairValue,
    income_details_transactionFee_weightedAverageCost:
      income_details_transactionFee_weightedAverageCost,
    income_details_spreadFee_weightedAverageCost:
      income_details_spreadFee_weightedAverageCost,
    income_details_liquidationFee_weightedAverageCost:
      income_details_liquidationFee_weightedAverageCost,
    income_details_guaranteedStopFee_weightedAverageCost:
      income_details_guaranteedStopFee_weightedAverageCost,
    costs_details_marketDataProviderFee_weightedAverageCost:
      costs_details_marketDataProviderFee_weightedAverageCost,
    costs_details_newCoinListingCost_weightedAverageCost:
      costs_details_newCoinListingCost_weightedAverageCost,
    operatingExpenses_details_salaries: operatingExpenses_details_salaries,
    operatingExpenses_details_rent: operatingExpenses_details_rent,
    operatingExpenses_details_marketing: operatingExpenses_details_marketing,
    operatingExpenses_details_rebateExpenses_weightedAverageCost:
      operatingExpenses_details_rebateExpenses_weightedAverageCost,
    financialCosts_details_interestExpense:
      financialCosts_details_interestExpense,
    financialCosts_details_cryptocurrencyForexLosses:
      financialCosts_details_cryptocurrencyForexLosses,
    financialCosts_details_fiatToCryptocurrencyConversionLosses:
      financialCosts_details_fiatToCryptocurrencyConversionLosses,
    financialCosts_details_cryptocurrencyToFiatConversionLosses:
      financialCosts_details_cryptocurrencyToFiatConversionLosses,
    financialCosts_details_fiatToFiatConversionLosses:
      financialCosts_details_fiatToFiatConversionLosses,
    otherGainsLosses_details_investmentGains:
      otherGainsLosses_details_investmentGains,
    otherGainsLosses_details_forexGains: otherGainsLosses_details_forexGains,
    otherGainsLosses_details_cryptocurrencyGains_weightedAverageCosts:
      otherGainsLosses_details_cryptocurrencyGains_weightedAverageCosts,
    income_weightedAverageCost: income_weightedAverageCost,
    costs_weightedAverageCost: costs_weightedAverageCost,
    operatingExpenses_weightedAverageCost:
      operatingExpenses_weightedAverageCost,
    financialCosts_weightedAverageCost: financialCosts_weightedAverageCost,
    otherGainsLosses_weightedAverageCost: otherGainsLosses_weightedAverageCost,
    income_details_depositFee_breakdown_ETH_amount:
      income_details_depositFee_breakdown_ETH_amount,
    income_details_depositFee_breakdown_ETH_weightedAverageCost:
      income_details_depositFee_breakdown_ETH_weightedAverageCost,
    income_details_depositFee_breakdown_BTC_amount:
      income_details_depositFee_breakdown_BTC_amount,
    income_details_depositFee_breakdown_BTC_weightedAverageCost:
      income_details_depositFee_breakdown_BTC_weightedAverageCost,
    income_details_depositFee_breakdown_USD_amount:
      income_details_depositFee_breakdown_USD_amount,
    income_details_depositFee_breakdown_USD_weightedAverageCost:
      income_details_depositFee_breakdown_USD_weightedAverageCost,
    income_details_withdrawalFee_breakdown_ETH_amount:
      income_details_withdrawalFee_breakdown_ETH_amount,
    income_details_withdrawalFee_breakdown_ETH_weightedAverageCost:
      income_details_withdrawalFee_breakdown_ETH_weightedAverageCost,
    income_details_withdrawalFee_breakdown_BTC_amount:
      income_details_withdrawalFee_breakdown_BTC_amount,
    income_details_withdrawalFee_breakdown_BTC_weightedAverageCost:
      income_details_withdrawalFee_breakdown_BTC_weightedAverageCost,
    income_details_withdrawalFee_breakdown_USD_amount:
      income_details_withdrawalFee_breakdown_USD_amount,
    income_details_withdrawalFee_breakdown_USD_weightedAverageCost:
      income_details_withdrawalFee_breakdown_USD_weightedAverageCost,
    income_details_transactionFee_breakdown_ETH_amount:
      income_details_transactionFee_breakdown_ETH_amount,
    income_details_transactionFee_breakdown_ETH_weightedAverageCost:
      income_details_transactionFee_breakdown_ETH_weightedAverageCost,
    income_details_transactionFee_breakdown_BTC_amount:
      income_details_transactionFee_breakdown_BTC_amount,
    income_details_transactionFee_breakdown_BTC_weightedAverageCost:
      income_details_transactionFee_breakdown_BTC_weightedAverageCost,
    income_details_transactionFee_breakdown_USDT_amount:
      income_details_transactionFee_breakdown_USDT_amount,
    income_details_transactionFee_breakdown_USDT_weightedAverageCost:
      income_details_transactionFee_breakdown_USDT_weightedAverageCost,
    income_details_transactionFee_breakdown_USD_amount:
      income_details_transactionFee_breakdown_USD_amount,
    income_details_transactionFee_breakdown_USD_weightedAverageCost:
      income_details_transactionFee_breakdown_USD_weightedAverageCost,
    income_details_spreadFee_breakdown_ETH_amount:
      income_details_spreadFee_breakdown_ETH_amount,
    income_details_spreadFee_breakdown_ETH_weightedAverageCost:
      income_details_spreadFee_breakdown_ETH_weightedAverageCost,
    income_details_spreadFee_breakdown_BTC_amount:
      income_details_spreadFee_breakdown_BTC_amount,
    income_details_spreadFee_breakdown_BTC_weightedAverageCost:
      income_details_spreadFee_breakdown_BTC_weightedAverageCost,
    income_details_spreadFee_breakdown_USDT_amount:
      income_details_spreadFee_breakdown_USDT_amount,
    income_details_spreadFee_breakdown_USDT_weightedAverageCost:
      income_details_spreadFee_breakdown_USDT_weightedAverageCost,
    income_details_spreadFee_breakdown_USD_amount:
      income_details_spreadFee_breakdown_USD_amount,
    income_details_spreadFee_breakdown_USD_weightedAverageCost:
      income_details_spreadFee_breakdown_USD_weightedAverageCost,
    income_details_liquidationFee_breakdown_ETH_amount:
      income_details_liquidationFee_breakdown_ETH_amount,
    income_details_liquidationFee_breakdown_ETH_weightedAverageCost:
      income_details_liquidationFee_breakdown_ETH_weightedAverageCost,
    income_details_liquidationFee_breakdown_BTC_amount:
      income_details_liquidationFee_breakdown_BTC_amount,
    income_details_liquidationFee_breakdown_BTC_weightedAverageCost:
      income_details_liquidationFee_breakdown_BTC_weightedAverageCost,
    income_details_liquidationFee_breakdown_USDT_amount:
      income_details_liquidationFee_breakdown_USDT_amount,
    income_details_liquidationFee_breakdown_USDT_weightedAverageCost:
      income_details_liquidationFee_breakdown_USDT_weightedAverageCost,
    income_details_liquidationFee_breakdown_USD_amount:
      income_details_liquidationFee_breakdown_USD_amount,
    income_details_liquidationFee_breakdown_USD_weightedAverageCost:
      income_details_liquidationFee_breakdown_USD_weightedAverageCost,
    income_details_guaranteedStopFee_breakdown_ETH_amount:
      income_details_guaranteedStopFee_breakdown_ETH_amount,
    income_details_guaranteedStopFee_breakdown_ETH_weightedAverageCost:
      income_details_guaranteedStopFee_breakdown_ETH_weightedAverageCost,
    income_details_guaranteedStopFee_breakdown_BTC_amount:
      income_details_guaranteedStopFee_breakdown_BTC_amount,
    income_details_guaranteedStopFee_breakdown_BTC_weightedAverageCost:
      income_details_guaranteedStopFee_breakdown_BTC_weightedAverageCost,
    income_details_guaranteedStopFee_breakdown_USDT_amount:
      income_details_guaranteedStopFee_breakdown_USDT_amount,
    income_details_guaranteedStopFee_breakdown_USDT_weightedAverageCost:
      income_details_guaranteedStopFee_breakdown_USDT_weightedAverageCost,
    income_details_guaranteedStopFee_breakdown_USD_amount:
      income_details_guaranteedStopFee_breakdown_USD_amount,
    income_details_guaranteedStopFee_breakdown_USD_weightedAverageCost:
      income_details_guaranteedStopFee_breakdown_USD_weightedAverageCost,
    operatingExpenses_details_rebateExpenses_breakdown_ETH_amount:
      operatingExpenses_details_rebateExpenses_breakdown_ETH_amount,
    operatingExpenses_details_rebateExpenses_breakdown_ETH_weightedAverageCost:
      operatingExpenses_details_rebateExpenses_breakdown_ETH_weightedAverageCost,
    operatingExpenses_details_rebateExpenses_breakdown_BTC_amount:
      operatingExpenses_details_rebateExpenses_breakdown_BTC_amount,
    operatingExpenses_details_rebateExpenses_breakdown_BTC_weightedAverageCost:
      operatingExpenses_details_rebateExpenses_breakdown_BTC_weightedAverageCost,
    operatingExpenses_details_rebateExpenses_breakdown_USDT_amount:
      operatingExpenses_details_rebateExpenses_breakdown_USDT_amount,
    operatingExpenses_details_rebateExpenses_breakdown_USDT_weightedAverageCost:
      operatingExpenses_details_rebateExpenses_breakdown_USDT_weightedAverageCost,
    operatingExpenses_details_rebateExpenses_breakdown_USD_amount:
      operatingExpenses_details_rebateExpenses_breakdown_USD_amount,
    operatingExpenses_details_rebateExpenses_breakdown_USD_weightedAverageCost:
      operatingExpenses_details_rebateExpenses_breakdown_USD_weightedAverageCost,
    financialCosts_details_cryptocurrencyForexLosses_breakdown_ETH_amount:
      financialCosts_details_cryptocurrencyForexLosses_breakdown_ETH_amount,
    financialCosts_details_cryptocurrencyForexLosses_breakdown_ETH_weightedAverageCost:
      financialCosts_details_cryptocurrencyForexLosses_breakdown_ETH_weightedAverageCost,
    financialCosts_details_cryptocurrencyForexLosses_breakdown_BTC_amount:
      financialCosts_details_cryptocurrencyForexLosses_breakdown_BTC_amount,
    financialCosts_details_cryptocurrencyForexLosses_breakdown_BTC_weightedAverageCost:
      financialCosts_details_cryptocurrencyForexLosses_breakdown_BTC_weightedAverageCost,
    financialCosts_details_cryptocurrencyForexLosses_breakdown_USDT_amount:
      financialCosts_details_cryptocurrencyForexLosses_breakdown_USDT_amount,
    financialCosts_details_cryptocurrencyForexLosses_breakdown_USDT_weightedAverageCost:
      financialCosts_details_cryptocurrencyForexLosses_breakdown_USDT_weightedAverageCost,
    financialCosts_details_cryptocurrencyForexLosses_breakdown_USD_amount:
      financialCosts_details_cryptocurrencyForexLosses_breakdown_USD_amount,
    financialCosts_details_cryptocurrencyForexLosses_breakdown_USD_weightedAverageCost:
      financialCosts_details_cryptocurrencyForexLosses_breakdown_USD_weightedAverageCost,
    costs_details_technicalProviderFee_breakdown_BTC_amount:
      costs_details_technicalProviderFee_breakdown_BTC_amount,
    costs_details_technicalProviderFee_breakdown_BTC_weightedAverageCost:
      costs_details_technicalProviderFee_breakdown_BTC_weightedAverageCost,
    costs_details_technicalProviderFee_breakdown_USDT_amount:
      costs_details_technicalProviderFee_breakdown_USDT_amount,
    costs_details_technicalProviderFee_breakdown_USDT_weightedAverageCost:
      costs_details_technicalProviderFee_breakdown_USDT_weightedAverageCost,
    costs_details_technicalProviderFee_breakdown_USD_amount:
      costs_details_technicalProviderFee_breakdown_USD_amount,
    costs_details_technicalProviderFee_breakdown_USD_weightedAverageCost:
      costs_details_technicalProviderFee_breakdown_USD_weightedAverageCost,
    otherGainsLosses_details_cryptocurrencyGains_breakdown_USDT_amount:
      otherGainsLosses_details_cryptocurrencyGains_breakdown_USDT_amount,
    otherGainsLosses_details_cryptocurrencyGains_breakdown_USDT_weightedAverageCost:
      otherGainsLosses_details_cryptocurrencyGains_breakdown_USDT_weightedAverageCost,
    otherGainsLosses_details_cryptocurrencyGains_breakdown_ETH_amount:
      otherGainsLosses_details_cryptocurrencyGains_breakdown_ETH_amount,
    otherGainsLosses_details_cryptocurrencyGains_breakdown_ETH_weightedAverageCost:
      otherGainsLosses_details_cryptocurrencyGains_breakdown_ETH_weightedAverageCost,
    otherGainsLosses_details_cryptocurrencyGains_breakdown_BTC_amount:
      otherGainsLosses_details_cryptocurrencyGains_breakdown_BTC_amount,
    otherGainsLosses_details_cryptocurrencyGains_breakdown_BTC_weightedAverageCost:
      otherGainsLosses_details_cryptocurrencyGains_breakdown_BTC_weightedAverageCost,
    otherGainsLosses_details_cryptocurrencyGains_breakdown_USD_amount:
      otherGainsLosses_details_cryptocurrencyGains_breakdown_USD_amount,
    otherGainsLosses_details_cryptocurrencyGains_breakdown_USD_weightedAverageCost:
      otherGainsLosses_details_cryptocurrencyGains_breakdown_USD_weightedAverageCost,
    startTime: startTime,
    endTime: endTime,
  };
  await insertDataToDBComprehensive(data2);

  const data3 = {
    reportID: reportID,
    reportName: reportName,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_USDT_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_USDT_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_USDT_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_USDT_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_USDT_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_USDT_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_USDT_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_USDT_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_weightedAverageCost,
    otherSupplementaryItems_details_relatedToNonCash_cryptocurrenciesEndOfPeriod_weightedAverageCost:
      otherSupplementaryItems_details_relatedToNonCash_cryptocurrenciesEndOfPeriod_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_USDT_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_USDT_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_USDT_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_USDT_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_ETH_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_ETH_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_ETH_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_ETH_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_weightedAverageCost,
    otherSupplementaryItems_details_relatedToNonCash_cryptocurrenciesBeginningOfPeriod_weightedAverageCost:
      otherSupplementaryItems_details_relatedToNonCash_cryptocurrenciesBeginningOfPeriod_weightedAverageCost,
    operatingActivities_details_cashDepositedByCustomers_weightedAverageCost:
      operatingActivities_details_cashDepositedByCustomers_weightedAverageCost,
    operatingActivities_details_cashWithdrawnByCustomers_weightedAverageCost:
      operatingActivities_details_cashWithdrawnByCustomers_weightedAverageCost,
    operatingActivities_details_purchaseOfCryptocurrencies_weightedAverageCost:
      operatingActivities_details_purchaseOfCryptocurrencies_weightedAverageCost,
    operatingActivities_details_disposalOfCryptocurrencies_weightedAverageCost:
      operatingActivities_details_disposalOfCryptocurrencies_weightedAverageCost,
    operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_weightedAverageCost:
      operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_weightedAverageCost,
    operatingActivities_details_cashPaidToSuppliersForExpenses_weightedAverageCost:
      operatingActivities_details_cashPaidToSuppliersForExpenses_weightedAverageCost,
    operatingActivities_details_insuranceFundForPerpetualContracts_weightedAverageCost:
      operatingActivities_details_insuranceFundForPerpetualContracts_weightedAverageCost,
    operatingActivities_weightedAverageCost:
      operatingActivities_weightedAverageCost,
    investingActivities_weightedAverageCost:
      investingActivities_weightedAverageCost,
    financingActivities_details_proceedsFromIssuanceOfCommonStock_weightedAverageCost:
      financingActivities_details_proceedsFromIssuanceOfCommonStock_weightedAverageCost,
    financingActivities_details_longTermDebt_weightedAverageCost:
      financingActivities_details_longTermDebt_weightedAverageCost,
    financingActivities_details_shortTermBorrowings_weightedAverageCost:
      financingActivities_details_shortTermBorrowings_weightedAverageCost,
    financingActivities_details_paymentsOfDividends_weightedAverageCost:
      financingActivities_details_paymentsOfDividends_weightedAverageCost,
    financingActivities_details_treasuryStock_weightedAverageCost:
      financingActivities_details_treasuryStock_weightedAverageCost,
    financingActivities_weightedAverageCost:
      financingActivities_weightedAverageCost,
    otherSupplementaryItems_details_relatedToCash_netIncreaseDecreaseInCashCashEquivalentsAndRestrictedCash_weightedAverageCost:
      otherSupplementaryItems_details_relatedToCash_netIncreaseDecreaseInCashCashEquivalentsAndRestrictedCash_weightedAverageCost,
    otherSupplementaryItems_details_relatedToCash_cryptocurrenciesBeginningOfPeriod_weightedAverageCost:
      otherSupplementaryItems_details_relatedToCash_cryptocurrenciesBeginningOfPeriod_weightedAverageCost,
    otherSupplementaryItems_details_relatedToCash_cryptocurrenciesEndOfPeriod_weightedAverageCost:
      otherSupplementaryItems_details_relatedToCash_cryptocurrenciesEndOfPeriod_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_ETH_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_ETH_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_ETH_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_ETH_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_BTC_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_BTC_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_BTC_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_BTC_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_ETH_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_ETH_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_ETH_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_ETH_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_BTC_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_BTC_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_BTC_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_BTC_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_ETH_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_ETH_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_ETH_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_ETH_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_BTC_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_BTC_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_BTC_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_BTC_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_USDT_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_USDT_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_USDT_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_USDT_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_ETH_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_ETH_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_ETH_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_ETH_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_BTC_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_BTC_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_BTC_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_BTC_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_USDT_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_USDT_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_USDT_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_USDT_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_ETH_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_ETH_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_ETH_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_ETH_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_BTC_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_BTC_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_BTC_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_BTC_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_USDT_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_USDT_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_USDT_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_USDT_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_ETH_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_ETH_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_ETH_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_ETH_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_BTC_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_BTC_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_BTC_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_BTC_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_USDT_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_USDT_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_USDT_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_USDT_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_USDT_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_USDT_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_USDT_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_USDT_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_BTC_amount:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_BTC_amount,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_BTC_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_BTC_weightedAverageCost,
    operatingActivities_details_cashDepositedByCustomers_breakdown_USD_amount:
      operatingActivities_details_cashDepositedByCustomers_breakdown_USD_amount,
    operatingActivities_details_cashDepositedByCustomers_breakdown_USD_weightedAverageCost:
      operatingActivities_details_cashDepositedByCustomers_breakdown_USD_weightedAverageCost,
    operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_breakdown_USD_amount:
      operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_breakdown_USD_amount,
    operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_breakdown_USD_weightedAverageCost:
      operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_breakdown_USD_weightedAverageCost,
    operatingActivities_details_cashPaidToSuppliersForExpenses_breakdown_USD_amount:
      operatingActivities_details_cashPaidToSuppliersForExpenses_breakdown_USD_amount,
    operatingActivities_details_cashPaidToSuppliersForExpenses_breakdown_USD_weightedAverageCost:
      operatingActivities_details_cashPaidToSuppliersForExpenses_breakdown_USD_weightedAverageCost,
    operatingActivities_details_cashWithdrawnByCustomers_breakdown_USD_amount:
      operatingActivities_details_cashWithdrawnByCustomers_breakdown_USD_amount,
    operatingActivities_details_cashWithdrawnByCustomers_breakdown_USD_weightedAverageCost:
      operatingActivities_details_cashWithdrawnByCustomers_breakdown_USD_weightedAverageCost,
    operatingActivities_details_purchaseOfCryptocurrencies_breakdown_USD_amount:
      operatingActivities_details_purchaseOfCryptocurrencies_breakdown_USD_amount,
    operatingActivities_details_purchaseOfCryptocurrencies_breakdown_USD_weightedAverageCost:
      operatingActivities_details_purchaseOfCryptocurrencies_breakdown_USD_weightedAverageCost,
    operatingActivities_details_disposalOfCryptocurrencies_breakdown_USD_amount:
      operatingActivities_details_disposalOfCryptocurrencies_breakdown_USD_amount,
    operatingActivities_details_disposalOfCryptocurrencies_breakdown_USD_weightedAverageCost:
      operatingActivities_details_disposalOfCryptocurrencies_breakdown_USD_weightedAverageCost,
    supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToCustomersForPerpetualContractProfits_weightedAverageCost:
      supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToCustomersForPerpetualContractProfits_weightedAverageCost,
    startTime: startTime,
    endTime: endTime,
  };
  await insertDataToDBCashFlow(data3);
}

main().catch((e) => console.error(e));
