const { timeStamp } = require('console');
require('events').EventEmitter.defaultMaxListeners = 15;
const { ethers } = require('ethers');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const prisma = new PrismaClient();
const provider = new ethers.providers.JsonRpcProvider(
  `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
);
const contractABIPath = path.resolve(
  __dirname,
  '/Users/yong/SmartContracts/Auditing_system/auditing_system_11_29/src/services/blockchain/artifacts/artifacts/src/services/blockchain/contracts/router.sol/RouterContract.json',
);
const contractABI = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const routerContractAddress = process.env.ROUTER_ADDRESS;
console.log('routerContractAddress', routerContractAddress);
const contractInstance = new ethers.Contract(
  routerContractAddress,
  contractABI,
  provider,
);
const reports = contractInstance;
const reportID = process.env.REPORT_ID;

async function getContractValue(reportID, reportType, reportColumn) {
  try {
    const value = await reports.getValue(reportID, reportType, reportColumn);
    console.log('value', value);

    formattedValue = ethers.utils.formatUnits(value, 18);

    return formattedValue;
  } catch (error) {
    console.error(error);
  }
}

async function insertDataToDB(data) {
  try {
    const comprehensiveIncome = await prisma.comprehensiveIncome.create({
      data: data,
    });
    console.log('Report saved to database:', comprehensiveIncome);
  } catch (error) {
    console.error('Error saving data to database:', error);
  }
}

async function main() {
  /*B001*/ const income_details_depositFee_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.depositFee.weightedAverageCost',
    );
  /*B002*/ const income_details_depositFee_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.USDT.amount',
    );
  /*B003*/ const income_details_depositFee_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.USDT.weightedAverageCost',
    );
  /*B004*/ const netProfit = await getContractValue(
    reportID,
    'comprehensiveIncome',
    'netProfit',
  );
  /*B005*/ const income_details_withdrawalFee_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.withdrawalFee.weightedAverageCost',
    );
  /*B006*/ const income_details_withdrawalFee_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.USDT.amount',
    );
  /*B007*/ const income_details_withdrawalFee_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.USDT.weightedAverageCost',
    );
  /*B008*/ const costs_details_technicalProviderFee_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.weightedAverageCost',
    );
  /*B009*/ const costs_details_technicalProviderFee_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.ETH.amount',
    );
  /*B010*/ const costs_details_technicalProviderFee_breakdown_ETH_fairValue =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.ETH.fairValue',
    );
  /*B011*/ const income_details_transactionFee_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.transactionFee.weightedAverageCost',
    );
  /*B012*/ const income_details_spreadFee_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.spreadFee.weightedAverageCost',
    );
  /*B013*/ const income_details_liquidationFee_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.liquidationFee.weightedAverageCost',
    );
  /*B014*/ const income_details_guaranteedStopFee_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.weightedAverageCost',
    );
  /*B015*/ const costs_details_marketDataProviderFee_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'costs.details.marketDataProviderFee.weightedAverageCost',
    );
  /*B016*/ const costs_details_newCoinListingCost_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'costs.details.newCoinListingCost.weightedAverageCost',
    );
  /*B017*/ const operatingExpenses_details_salaries = await getContractValue(
    reportID,
    'comprehensiveIncome',
    'operatingExpenses.details.salaries',
  );
  /*B018*/ const operatingExpenses_details_rent = await getContractValue(
    reportID,
    'comprehensiveIncome',
    'operatingExpenses.details.rent',
  );
  /*B019*/ const operatingExpenses_details_marketing = await getContractValue(
    reportID,
    'comprehensiveIncome',
    'operatingExpenses.details.marketing',
  );
  /*B020*/ const operatingExpenses_details_rebateExpenses_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.weightedAverageCost',
    );

  /*B021*/ const financialCosts_details_interestExpense =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'financialCosts.details.interestExpense',
    );
  /*B022*/ const financialCosts_details_cryptocurrencyForexLosses =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses',
    );
  /*B023*/ const financialCosts_details_fiatToCryptocurrencyConversionLosses =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'financialCosts.details.fiatToCryptocurrencyConversionLosses',
    );
  /*B024*/ const financialCosts_details_cryptocurrencyToFiatConversionLosses =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyToFiatConversionLosses',
    );
  /*B025*/ const financialCosts_details_fiatToFiatConversionLosses =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'financialCosts.details.fiatToFiatConversionLosses',
    );
  /*B026*/ const otherGainsLosses_details_investmentGains =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'otherGainsLosses.details.investmentGains',
    );
  /*B027*/ const otherGainsLosses_details_forexGains = await getContractValue(
    reportID,
    'comprehensiveIncome',
    'otherGainsLosses.details.forexGains',
  );
  /*B028*/ const otherGainsLosses_details_cryptocurrencyGains_weightedAverageCosts =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.weightedAverageCosts',
    );

  /*B029*/ const income_weightedAverageCost = await getContractValue(
    reportID,
    'comprehensiveIncome',
    'income.weightedAverageCost',
  );
  /*B030*/ const costs_weightedAverageCost = await getContractValue(
    reportID,
    'comprehensiveIncome',
    'costs.weightedAverageCost',
  );
  /*B031*/ const operatingExpenses_weightedAverageCost = await getContractValue(
    reportID,
    'comprehensiveIncome',
    'operatingExpenses.weightedAverageCost',
  );
  /*B032*/ const financialCosts_weightedAverageCost = await getContractValue(
    reportID,
    'comprehensiveIncome',
    'financialCosts.weightedAverageCost',
  );
  /*B033*/ const otherGainsLosses_weightedAverageCost = await getContractValue(
    reportID,
    'comprehensiveIncome',
    'otherGainsLosses.weightedAverageCost',
  );
  /*B034*/ const income_details_depositFee_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.ETH.amount',
    );
  /*B035*/ const income_details_depositFee_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.ETH.weightedAverageCost',
    );
  /*B036*/ const income_details_depositFee_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.BTC.amount',
    );
  /*B037*/ const income_details_depositFee_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.BTC.weightedAverageCost',
    );
  /*B038*/ const income_details_depositFee_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.USD.amount',
    );
  /*B039*/ const income_details_depositFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.USD.weightedAverageCost',
    );
  /*B040*/ const income_details_withdrawalFee_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.ETH.amount',
    );
  /*B041*/ const income_details_withdrawalFee_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.ETH.weightedAverageCost',
    );
  /*B042*/ const income_details_withdrawalFee_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.BTC.amount',
    );
  /*B043*/ const income_details_withdrawalFee_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.BTC.weightedAverageCost',
    );
  /*B044*/ const income_details_withdrawalFee_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.USD.amount',
    );
  /*B045*/ const income_details_withdrawalFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.USD.weightedAverageCost',
    );
  /*B046*/ const income_details_transactionFee_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.ETH.amount',
    );
  /*B047*/ const income_details_transactionFee_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.ETH.weightedAverageCost',
    );
  /*B048*/ const income_details_transactionFee_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.BTC.amount',
    );
  /*B049*/ const income_details_transactionFee_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.BTC.weightedAverageCost',
    );
  /*B050*/ const income_details_transactionFee_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.USDT.amount',
    );
  /*B051*/ const income_details_transactionFee_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.USDT.weightedAverageCost',
    );
  /*B052*/ const income_details_transactionFee_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.USD.amount',
    );
  /*B053*/ const income_details_transactionFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.USD.weightedAverageCost',
    );
  /*B054*/ const income_details_spreadFee_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      ' income.details.spreadFee.breakdown.ETH.amount',
    );
  /*B055*/ const income_details_spreadFee_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.spreadFee.breakdown.ETH.weightedAverageCost',
    );
  /*B056*/ const income_details_spreadFee_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.spreadFee.breakdown.BTC.amount',
    );
  /*B057*/ const income_details_spreadFee_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.spreadFee.breakdown.BTC.weightedAverageCost',
    );
  /*B058*/ const income_details_spreadFee_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.spreadFee.breakdown.USDT.amount',
    );
  /*B059*/ const income_details_spreadFee_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.spreadFee.breakdown.USDT.weightedAverageCost',
    );
  /*B060*/ const income_details_spreadFee_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.spreadFee.breakdown.USD.amount',
    );
  /*B061*/ const income_details_spreadFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.spreadFee.breakdown.USD.weightedAverageCost',
    );
  /*B062*/ const income_details_liquidationFee_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.ETH.amount',
    );
  /*B063*/ const income_details_liquidationFee_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.ETH.weightedAverageCost',
    );
  /*B064*/ const income_details_liquidationFee_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.BTC.amount',
    );
  /*B065*/ const income_details_liquidationFee_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.BTC.weightedAverageCost',
    );
  /*B066*/ const income_details_liquidationFee_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.USDT.amount',
    );
  /*B067*/ const income_details_liquidationFee_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      ' income.details.liquidationFee.breakdown.USDT.weightedAverageCost',
    );
  /*B068*/ const income_details_liquidationFee_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.USD.amount',
    );
  /*B069*/ const income_details_liquidationFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.USD.weightedAverageCost',
    );
  /*B070*/ const income_details_guaranteedStopFee_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.breakdown.ETH.amount',
    );
  /*B071*/ const income_details_guaranteedStopFee_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.breakdown.ETH.weightedAverageCost',
    );
  /*B072*/ const income_details_guaranteedStopFee_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.breakdown.BTC.amount',
    );
  /*B073*/ const income_details_guaranteedStopFee_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.breakdown.BTC.weightedAverageCost',
    );
  /*B074*/ const income_details_guaranteedStopFee_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      ' income.details.guaranteedStopFee.breakdown.USDT.amount',
    );
  /*B075*/ const income_details_guaranteedStopFee_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.breakdown.USDT.weightedAverageCost',
    );
  /*B076*/ const income_details_guaranteedStopFee_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.breakdown.USD.amount',
    );
  /*B077*/ const income_details_guaranteedStopFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'income.details.guaranteedStopFee.breakdown.USD.weightedAverageCost',
    );
  /*B078*/ const operatingExpenses_details_rebateExpenses_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.ETH.amount',
    );
  /*B079*/ const operatingExpenses_details_rebateExpenses_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.ETH.weightedAverageCost',
    );
  /*B080*/ const operatingExpenses_details_rebateExpenses_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.BTC.amount',
    );
  /*B081*/ const operatingExpenses_details_rebateExpenses_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.BTC.weightedAverageCost',
    );
  /*B082*/ const operatingExpenses_details_rebateExpenses_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.USDT.amount',
    );
  /*B083*/ const operatingExpenses_details_rebateExpenses_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.USDT.weightedAverageCost',
    );
  /*B084*/ const operatingExpenses_details_rebateExpenses_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.USD.amount',
    );
  /*B085*/ const operatingExpenses_details_rebateExpenses_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'operatingExpenses.details.rebateExpenses.breakdown.USD.weightedAverageCost',
    );
  /*B086*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.ETH.amount',
    );
  /*B087*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.ETH.weightedAverageCost',
    );
  /*B088*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.BTC.amount',
    );
  /*B089*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.BTC.weightedAverageCost,',
    );
  /*B090*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.USDT.amount',
    );
  /*B091*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.USDT.weightedAverageCost',
    );
  /*B092*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.USD.amount',
    );
  /*B093*/ const financialCosts_details_cryptocurrencyForexLosses_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'financialCosts.details.cryptocurrencyForexLosses.breakdown.USD.weightedAverageCost',
    );
  /*B094*/ const costs_details_technicalProviderFee_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.BTC.amount',
    );
  /*B095*/ const costs_details_technicalProviderFee_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.BTC.weightedAverageCost',
    );
  /*B096*/ const costs_details_technicalProviderFee_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.USDT.amount',
    );
  /*B097*/ const costs_details_technicalProviderFee_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.USDT.weightedAverageCost',
    );
  /*B098*/ const costs_details_technicalProviderFee_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.USD.amount',
    );
  /*B099*/ const costs_details_technicalProviderFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.USD.weightedAverageCost',
    );
  /*B100*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.USDT.amount',
    );
  /*B101*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.USDT.weightedAverageCost',
    );
  /*B102*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.ETH.amount',
    );
  /*B103*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.ETH.weightedAverageCost',
    );
  /*B104*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.BTC.amount',
    );
  /*B105*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.BTC.weightedAverageCost',
    );
  /*B106*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.USD.amount',
    );
  /*B107*/ const otherGainsLosses_details_cryptocurrencyGains_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.USD.weightedAverageCost',
    );

  /*startTime*/ const startTime = await getContractValue(
    reportID,
    'time',
    'startTime',
  );
  /*endTime*/ const endTime = await getContractValue(
    reportID,
    'time',
    'endTime',
  );

  const data = {
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
  await insertDataToDB(data);
}

main().catch((e) => console.error(e));
