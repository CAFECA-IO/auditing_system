const { timeStamp } = require('console');
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
);
const contractABIPath = path.resolve(__dirname, '../../auditingABI.json');
const contractABI = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const reportContractAddress = process.env.REPORT_CONTRACT_ADDRESS;

const contractInstance = new ethers.Contract(
  reportContractAddress,
  contractABI,
  provider,
);
const reports = contractInstance;

const reportID = 'first_report';
const regulated_digits = 1;

async function getContractValue(reportID, reportType, reportColumn) {
  try {
    const value = await reports.getValue(reportID, reportType, reportColumn);
    const formattedValue = ethers.utils.formatUnits(value, 18);
    return formattedValue;
  } catch (error) {
    console.error(error);
  }
}

async function fetchData() {
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

  //balanceSheet API 沒有startDate, endDate
  //B078~B085 的名稱rebateExpenses 與API中的 commissionRebates 名字不一樣（暫時用B078~B085的名稱代替）
  //所有的fairValue與totalAmountFairValue除了B10都沒有（暫時將除了B10以外的這些欄位刪除）
  //B028 "otherGainsLosses_details_cryptocurrencyGains" 應該還有更多階層
  //B020應該有更多階層
  //B086~B093 沒有breakdown
  //其他沒影響的欄位暫時補“0”

  const data = {
    success: true,
    code: '00000000',
    reason: 'ERROR_MESSAGE.SUCCESS',
    data: {
      id: reportID,
      startDate: '?',
      endDate: '?',
      income: {
        weightedAverageCost: income_weightedAverageCost,
        details: {
          transactionFee: {
            weightedAverageCost:
              income_details_transactionFee_weightedAverageCost,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: income_details_transactionFee_breakdown_ETH_amount,
                weightedAverageCost:
                  income_details_transactionFee_breakdown_ETH_weightedAverageCost,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: income_details_transactionFee_breakdown_BTC_amount,
                weightedAverageCost:
                  income_details_transactionFee_breakdown_BTC_weightedAverageCost,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount: income_details_transactionFee_breakdown_USDT_amount,
                weightedAverageCost:
                  income_details_transactionFee_breakdown_USDT_weightedAverageCost,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount: income_details_transactionFee_breakdown_USD_amount,
                weightedAverageCost:
                  income_details_transactionFee_breakdown_USD_weightedAverageCost,
              },
            },
          },
          spreadFee: {
            weightedAverageCost: income_details_spreadFee_weightedAverageCost,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: income_details_spreadFee_breakdown_ETH_amount,
                weightedAverageCost:
                  income_details_spreadFee_breakdown_ETH_weightedAverageCost,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: income_details_spreadFee_breakdown_BTC_amount,
                weightedAverageCost:
                  income_details_spreadFee_breakdown_BTC_weightedAverageCost,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount: income_details_spreadFee_breakdown_USDT_amount,
                weightedAverageCost:
                  income_details_spreadFee_breakdown_USDT_weightedAverageCost,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount: income_details_spreadFee_breakdown_USD_amount,
                weightedAverageCost:
                  income_details_spreadFee_breakdown_USD_weightedAverageCost,
              },
            },
          },
          guaranteedStopFee: {
            weightedAverageCost:
              income_details_guaranteedStopFee_weightedAverageCost,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: income_details_guaranteedStopFee_breakdown_ETH_amount,
                weightedAverageCost:
                  income_details_guaranteedStopFee_breakdown_ETH_weightedAverageCost,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: income_details_guaranteedStopFee_breakdown_BTC_amount,
                weightedAverageCost:
                  income_details_guaranteedStopFee_breakdown_BTC_weightedAverageCost,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount: income_details_guaranteedStopFee_breakdown_USDT_amount,
                weightedAverageCost:
                  income_details_guaranteedStopFee_breakdown_USDT_weightedAverageCost,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount: income_details_guaranteedStopFee_breakdown_USD_amount,
                weightedAverageCost:
                  income_details_guaranteedStopFee_breakdown_USD_weightedAverageCost,
              },
            },
          },
          liquidationFee: {
            weightedAverageCost:
              income_details_liquidationFee_weightedAverageCost,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: income_details_liquidationFee_breakdown_ETH_amount,
                weightedAverageCost:
                  income_details_liquidationFee_breakdown_ETH_weightedAverageCost,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: income_details_liquidationFee_breakdown_BTC_amount,
                weightedAverageCost:
                  income_details_liquidationFee_breakdown_BTC_weightedAverageCost,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount: income_details_liquidationFee_breakdown_USDT_amount,
                weightedAverageCost:
                  income_details_liquidationFee_breakdown_USDT_weightedAverageCost,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount: income_details_liquidationFee_breakdown_USD_amount,
                weightedAverageCost:
                  income_details_liquidationFee_breakdown_USD_weightedAverageCost,
              },
            },
          },
          withdrawalFee: {
            weightedAverageCost:
              income_details_withdrawalFee_weightedAverageCost,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: income_details_withdrawalFee_breakdown_ETH_amount,
                weightedAverageCost:
                  income_details_withdrawalFee_breakdown_ETH_weightedAverageCost,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: income_details_withdrawalFee_breakdown_BTC_amount,
                weightedAverageCost:
                  income_details_withdrawalFee_breakdown_BTC_weightedAverageCost,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount: income_details_withdrawalFee_breakdown_USDT_amount,
                weightedAverageCost:
                  income_details_withdrawalFee_breakdown_USDT_weightedAverageCost,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount: income_details_withdrawalFee_breakdown_USD_amount,
                weightedAverageCost:
                  income_details_withdrawalFee_breakdown_USD_weightedAverageCost,
              },
            },
          },
          depositFee: {
            weightedAverageCost: income_details_depositFee_weightedAverageCost,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: income_details_depositFee_breakdown_ETH_amount,
                weightedAverageCost:
                  income_details_depositFee_breakdown_ETH_weightedAverageCost,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: income_details_depositFee_breakdown_BTC_amount,
                weightedAverageCost:
                  income_details_depositFee_breakdown_BTC_weightedAverageCost,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount: income_details_depositFee_breakdown_USDT_amount,
                weightedAverageCost:
                  income_details_depositFee_breakdown_USDT_weightedAverageCost,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount: income_details_depositFee_breakdown_USD_amount,
                weightedAverageCost:
                  income_details_depositFee_breakdown_USD_weightedAverageCost,
              },
            },
          },
        },
      },
      costs: {
        weightedAverageCost: costs_weightedAverageCost,
        details: {
          technicalProviderFee: {
            weightedAverageCost:
              costs_details_technicalProviderFee_weightedAverageCost,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: costs_details_technicalProviderFee_breakdown_ETH_amount,
                weightedAverageCost: 0,
                fairValue:
                  costs_details_technicalProviderFee_breakdown_ETH_fairValue,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: costs_details_technicalProviderFee_breakdown_BTC_amount,
                weightedAverageCost:
                  costs_details_technicalProviderFee_breakdown_BTC_weightedAverageCost,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount:
                  costs_details_technicalProviderFee_breakdown_USDT_amount,
                weightedAverageCost:
                  costs_details_technicalProviderFee_breakdown_USDT_weightedAverageCost,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount: costs_details_technicalProviderFee_breakdown_USD_amount,
                weightedAverageCost:
                  costs_details_technicalProviderFee_breakdown_USD_weightedAverageCost,
              },
            },
          },
          marketDataProviderFee: {
            weightedAverageCost:
              costs_details_marketDataProviderFee_weightedAverageCost,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: 0,
                weightedAverageCost: 0,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: 0,
                weightedAverageCost: 0,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount: 0,
                weightedAverageCost: 0,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount: 0,
                weightedAverageCost: 0,
              },
            },
          },
          newCoinListingCost: {
            weightedAverageCost:
              costs_details_newCoinListingCost_weightedAverageCost,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: 0,
                weightedAverageCost: 0,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: 0,
                weightedAverageCost: 0,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount: 0,
                weightedAverageCost: 0,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount: 0,
                weightedAverageCost: 0,
              },
            },
          },
        },
      },
      operatingExpenses: {
        weightedAverageCost: operatingExpenses_weightedAverageCost,
        details: {
          salaries: operatingExpenses_details_salaries,
          rent: operatingExpenses_details_rent,
          marketing: operatingExpenses_details_marketing,
          commissionRebates: {
            weightedAverageCost: 0,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount:
                  operatingExpenses_details_rebateExpenses_breakdown_ETH_amount,
                weightedAverageCost:
                  operatingExpenses_details_rebateExpenses_breakdown_ETH_weightedAverageCost,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount:
                  operatingExpenses_details_rebateExpenses_breakdown_BTC_amount,
                weightedAverageCost:
                  operatingExpenses_details_rebateExpenses_breakdown_BTC_weightedAverageCost,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount:
                  operatingExpenses_details_rebateExpenses_breakdown_USDT_amount,
                weightedAverageCost:
                  operatingExpenses_details_rebateExpenses_breakdown_USDT_weightedAverageCost,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount:
                  operatingExpenses_details_rebateExpenses_breakdown_USD_amount,
                weightedAverageCost:
                  operatingExpenses_details_rebateExpenses_breakdown_USD_weightedAverageCost,
              },
            },
          },
        },
      },
      financialCosts: {
        weightedAverageCost: financialCosts_weightedAverageCost,
        details: {
          interestExpense: financialCosts_details_interestExpense,
          cryptocurrencyForexLosses:
            financialCosts_details_cryptocurrencyForexLosses,
          fiatToCryptocurrencyConversionLosses:
            financialCosts_details_fiatToCryptocurrencyConversionLosses,
          cryptocurrencyToFiatConversionLosses:
            financialCosts_details_cryptocurrencyToFiatConversionLosses,
          fiatToFiatConversionLosses:
            financialCosts_details_fiatToFiatConversionLosses,
        },
      },
      otherGainsLosses: {
        weightedAverageCost: otherGainsLosses_weightedAverageCost,
        details: {
          investmentGains: otherGainsLosses_details_investmentGains,
          forexGains: otherGainsLosses_details_forexGains,
          cryptocurrencyGains: {
            weightedAverageCost: 0,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount:
                  otherGainsLosses_details_cryptocurrencyGains_breakdown_ETH_amount,
                weightedAverageCost:
                  otherGainsLosses_details_cryptocurrencyGains_breakdown_ETH_weightedAverageCost,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount:
                  otherGainsLosses_details_cryptocurrencyGains_breakdown_BTC_amount,
                weightedAverageCost:
                  otherGainsLosses_details_cryptocurrencyGains_breakdown_BTC_weightedAverageCost,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount:
                  otherGainsLosses_details_cryptocurrencyGains_breakdown_USDT_amount,
                weightedAverageCost:
                  otherGainsLosses_details_cryptocurrencyGains_breakdown_USDT_weightedAverageCost,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount: 0,
                weightedAverageCost: 0,
              },
            },
          },
        },
      },
      netProfit: netProfit,
    },
  };

  console.log(JSON.stringify(data, null, 2));
}

fetchData();
