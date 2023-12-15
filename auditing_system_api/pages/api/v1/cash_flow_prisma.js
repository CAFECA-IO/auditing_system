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
    const cashFlow = await prisma.cashFlow.create({
      data: data,
    });
    console.log('Report saved to database:', balanceSheet);
  } catch (error) {
    console.error('Error saving data to database:', error);
  }
}

async function main() {
  /*C001*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.weightedAverageCost',
    );
  /*C002*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.amount',
    );
  /*C003*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.weightedAverageCost',
    );
  /*C004*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost',
    );
  /*C005*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.amount',
    );
  /*C006*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.weightedAverageCost',
    );
  /*C007*/ const supplementalScheduleOfNonCashOperatingActivities_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost',
    );
  /*C008*/ const otherSupplementaryItems_details_relatedToNonCash_cryptocurrenciesEndOfPeriod_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost',
    );
  /*C009*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      ' supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost',
    );
  /*C010*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.USDT.amount',
    );
  /*C011*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.USDT.weightedAverageCost',
    );
  /*C012*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost',
    );
  /*C013*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.amount',
    );
  /*C014*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.weightedAverageCost',
    );
  /*C015*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyInflows.weightedAverageCost',
    );
  /*C016*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyOutflows.weightedAverageCost',
    );
  /*C023*/ const supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.purchaseOfCryptocurrenciesWithNonCashConsideration.weightedAverageCost',
    );
  /*C024*/ const supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.disposalOfCryptocurrenciesForNonCashConsideration.weightedAverageCost',
    );
  /*C025*/ const otherSupplementaryItems_details_relatedToNonCash_cryptocurrenciesBeginningOfPeriod_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesBeginningOfPeriod.weightedAverageCost',
    );
  /*C027*/ const operatingActivities_details_cashDepositedByCustomers_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.cashDepositedByCustomers.weightedAverageCost',
    );
  /*C028*/ const operatingActivities_details_cashWithdrawnByCustomers_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.cashWithdrawnByCustomers.weightedAverageCost',
    );
  /*C029*/ const operatingActivities_details_purchaseOfCryptocurrencies_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.purchaseOfCryptocurrencies.weightedAverageCost',
    );
  /*C030*/ const operatingActivities_details_disposalOfCryptocurrencies_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.disposalOfCryptocurrencies.weightedAverageCost',
    );
  /*C031*/ const operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.weightedAverageCost',
    );
  /*C034*/ const operatingActivities_details_cashPaidToSuppliersForExpenses_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.cashPaidToSuppliersForExpenses.weightedAverageCost',
    );
  /*C037*/ const operatingActivities_details_insuranceFundForPerpetualContracts_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.insuranceFundForPerpetualContracts.weightedAverageCost',
    );
  /*C041*/ const operatingActivities_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.weightedAverageCost',
    );
  /*C042*/ const investingActivities_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'investingActivities.weightedAverageCost',
    );
  /*C043*/ const financingActivities_details_proceedsFromIssuanceOfCommonStock_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'financingActivities.details.proceedsFromIssuanceOfCommonStock.weightedAverageCost',
    );
  /*C044*/ const financingActivities_details_longTermDebt_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'financingActivities.details.longTermDebt.weightedAverageCost',
    );
  /*C045*/ const financingActivities_details_shortTermBorrowings_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'financingActivities.details.shortTermBorrowings.weightedAverageCost',
    );
  /*C046*/ const financingActivities_details_paymentsOfDividends_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'financingActivities.details.paymentsOfDividends.weightedAverageCost',
    );
  /*C047*/ const financingActivities_details_treasuryStock_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'financingActivities.details.treasuryStock.weightedAverageCost',
    );
  /*C048*/ const financingActivities_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'financingActivities.weightedAverageCost',
    );
  /*C049*/ const otherSupplementaryItems_details_relatedToCash_netIncreaseDecreaseInCashCashEquivalentsAndRestrictedCash_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'otherSupplementaryItems.details.relatedToCash.netIncreaseDecreaseInCashCashEquivalentsAndRestrictedCash.weightedAverageCost',
    );
  /*C050*/ const otherSupplementaryItems_details_relatedToCash_cryptocurrenciesBeginningOfPeriod_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'otherSupplementaryItems.details.relatedToCash.cryptocurrenciesBeginningOfPeriod.weightedAverageCost',
    );

  /*C051*/ const otherSupplementaryItems_details_relatedToCash_cryptocurrenciesEndOfPeriod_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'otherSupplementaryItems.details.relatedToCash.cryptocurrenciesEndOfPeriod.weightedAverageCost',
    );

  /*C052*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.ETH.amount',
    );
  /*C053*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.ETH.weightedAverageCost',
    );
  /*C054*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.BTC.amount',
    );
  /*C055*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.BTC.weightedAverageCost',
    );
  /*C056*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.amount',
    );
  /*C057*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.weightedAverageCost',
    );
  /*C058*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.BTC.amount',
    );
  /*C059*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyInflows.breakdown.ETH.amount',
    );
  /*C060*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.weightedAverageCost',
    );
  /*C061*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyInflows.breakdown.ETH.weightedAverageCost',
    );
  /*C062*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyInflows.breakdown.BTC.amount',
    );
  /*C063*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyInflows.breakdown.BTC.weightedAverageCost',
    );
  /*C064*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyInflows.breakdown.USDT.amount',
    );
  /*C065*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyInflows.breakdown.USDT.weightedAverageCost',
    );
  /*C066*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyOutflows.breakdown.ETH.amount',
    );
  /*C067*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyOutflows.breakdown.ETH.weightedAverageCost',
    );
  /*C068*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyOutflows.breakdown.BTC.amount',
    );
  /*C069*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyOutflows.breakdown.BTC.weightedAverageCost',
    );
  /*C070*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyOutflows.breakdown.USDT.amount',
    );
  /*C071*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrencyOutflows.breakdown.USDT.weightedAverageCost',
    );
  /*C072*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.amount',
    );
  /*C073*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.weightedAverageCost',
    );
  /*C074*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.BTC.amount',
    );
  /*C075*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.BTC.weightedAverageCost',
    );
  /*C088*/ const supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.purchaseOfCryptocurrenciesWithNonCashConsideration.breakdown.ETH.amount',
    );
  /*C089*/ const supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.purchaseOfCryptocurrenciesWithNonCashConsideration.breakdown.ETH.weightedAverageCost',
    );
  /*C090*/ const supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.purchaseOfCryptocurrenciesWithNonCashConsideration.breakdown.BTC.amount',
    );
  /*C091*/ const supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.purchaseOfCryptocurrenciesWithNonCashConsideration.breakdown.BTC.weightedAverageCost',
    );
  /*C092*/ const supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.purchaseOfCryptocurrenciesWithNonCashConsideration.breakdown.USDT.amount',
    );
  /*C093*/ const supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.purchaseOfCryptocurrenciesWithNonCashConsideration.breakdown.USDT.weightedAverageCost',
    );
  /*C094*/ const supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.disposalOfCryptocurrenciesForNonCashConsideration.breakdown.ETH.amount',
    );
  /*C095*/ const supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_ETH_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.disposalOfCryptocurrenciesForNonCashConsideration.breakdown.ETH.weightedAverageCost',
    );
  /*C096*/ const supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.disposalOfCryptocurrenciesForNonCashConsideration.breakdown.BTC.amount',
    );
  /*C097*/ const supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.disposalOfCryptocurrenciesForNonCashConsideration.breakdown.BTC.weightedAverageCost',
    );
  /*C098*/ const supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.disposalOfCryptocurrenciesForNonCashConsideration.breakdown.USDT.amount',
    );
  /*C099*/ const supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.disposalOfCryptocurrenciesForNonCashConsideration.breakdown.USDT.weightedAverageCost',
    );
  /*C106*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.USDT.amount',
    );
  /*C107*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_USDT_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.USDT.weightedAverageCost',
    );
  /*C108*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.BTC.amount',
    );
  /*C109*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_BTC_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      ' supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.BTC.weightedAverageCost',
    );
  /*C134*/ const operatingActivities_details_cashDepositedByCustomers_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.cashDepositedByCustomers.breakdown.USD.amount',
    );
  /*C135*/ const operatingActivities_details_cashDepositedByCustomers_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.cashDepositedByCustomers.breakdown.USD.weightedAverageCost',
    );
  /*C136*/ const operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.amount',
    );
  /*C137*/ const operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.weightedAverageCost',
    );
  /*C138*/ const operatingActivities_details_cashPaidToSuppliersForExpenses_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.cashPaidToSuppliersForExpenses.breakdown.USD.amount',
    );
  /*C139*/ const operatingActivities_details_cashPaidToSuppliersForExpenses_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.cashPaidToSuppliersForExpenses.breakdown.USD.weightedAverageCost',
    );
  /*C140*/ const operatingActivities_details_cashWithdrawnByCustomers_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.amount',
    );
  /*C141*/ const operatingActivities_details_cashWithdrawnByCustomers_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.weightedAverageCost',
    );
  /*C142*/ const operatingActivities_details_purchaseOfCryptocurrencies_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.purchaseOfCryptocurrencies.breakdown.USD.amount',
    );
  /*C143*/ const operatingActivities_details_purchaseOfCryptocurrencies_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.purchaseOfCryptocurrencies.breakdown.USD.weightedAverageCost',
    );
  /*C144*/ const operatingActivities_details_disposalOfCryptocurrencies_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.disposalOfCryptocurrencies.breakdown.USD.amount',
    );
  /*C145*/ const operatingActivities_details_disposalOfCryptocurrencies_breakdown_USD_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'operatingActivities.details.disposalOfCryptocurrencies.breakdown.USD.weightedAverageCost',
    );
  /*C146*/ const supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToCustomersForPerpetualContractProfits_weightedAverageCost =
    await getContractValue(
      reportID,
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToCustomersForPerpetualContractProfits.weightedAverageCost',
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
  await insertDataToDB(data);
}

main().catch((e) => console.error(e));
