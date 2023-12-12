import { get } from 'http';
import { report } from 'process';

// pages/api/report.js
const { timeStamp } = require('console');
require('events').EventEmitter.defaultMaxListeners = 15;
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
);
const contractABIPath = path.resolve(
  __dirname,
  '../../../../../src/services/routerABI.json',
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

    const formattedValue = ethers.utils.formatUnits(value, 18);

    return formattedValue;
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    //C025 and C050 依樣 8&51
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
    ///*C050*/const otherSupplementaryItems_details_relatedToNonCash_cryptocurrenciesBeginningOfPeriod_weightedAverageCost = await getContractValue(reportID, "cashFlow", "otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesBeginningOfPeriod.weightedAverageCost");
    ///*C051*/const otherSupplementaryItems_details_relatedToNonCash_cryptocurrenciesEndOfPeriod_weightedAverageCost = await getContractValue(reportID, "cashFlow", "otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost");
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
      id: reportID,
      reportStartTime: startTime,
      reportEndTime: endTime,
      supplementalScheduleOfNonCashOperatingActivities: {
        weightedAverageCost:
          supplementalScheduleOfNonCashOperatingActivities_weightedAverageCost, //C007
        details: {
          cryptocurrenciesPaidToCustomersForPerpetualContractProfits: {
            weightedAverageCost: 0,
          },
          cryptocurrenciesDepositedByCustomers: {
            weightedAverageCost:
              supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_weightedAverageCost, //C001
            breakdown: {
              USDT: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_USDT_amount, //C002
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_USDT_weightedAverageCost, //C003
              },
              ETH: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_ETH_amount, //C052
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_ETH_weightedAverageCost, //C053
              },
              BTC: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_BTC_amount, //C054
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_BTC_weightedAverageCost, //C055
              },
            },
          },
          cryptocurrenciesWithdrawnByCustomers: {
            weightedAverageCost:
              supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_weightedAverageCost, //C009
            breakdown: {
              USDT: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_USDT_amount, //C010
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_USDT_weightedAverageCost, //C011
              },
              ETH: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_ETH_amount, //C056
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_ETH_weightedAverageCost, //C057
              },
              BTC: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_BTC_amount, //C058
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_BTC_weightedAverageCost, //C059
              },
            },
          },
          cryptocurrenciesPaidToSuppliersForExpenses: {
            weightedAverageCost:
              supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_weightedAverageCost, //C012
            breakdown: {
              ETH: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_ETH_amount, //C013
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_ETH_weightedAverageCost, //C014
              },
              USDT: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_USDT_amount, //C106
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_USDT_weightedAverageCost, //C107
              },
              BTC: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_BTC_amount, //C108
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_BTC_weightedAverageCost, //C109
              },
            },
          },
          cryptocurrencyInflows: {
            weightedAverageCost:
              supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_weightedAverageCost, //C015
            breakdown: {
              ETH: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_ETH_amount, //C060
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_ETH_weightedAverageCost, //C061
              },
              BTC: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_BTC_amount, //C062
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_BTC_weightedAverageCost, //C063
              },
              USDT: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_USDT_amount, //C064
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_USDT_weightedAverageCost, //C065
              },
            },
          },
          cryptocurrencyOutflows: {
            weightedAverageCost:
              supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_weightedAverageCost, //C016
            breakdown: {
              ETH: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_ETH_amount, //C066
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_ETH_weightedAverageCost, //C067
              },
              BTC: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_BTC_amount, //C068
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_BTC_weightedAverageCost, //C069
              },
              USDT: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_USDT_amount, //C070
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_USDT_weightedAverageCost, //C071
              },
            },
          },
          purchaseOfCryptocurrenciesWithNonCashConsideration: {
            weightedAverageCost:
              supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_weightedAverageCost, //C023
            breakdown: {
              ETH: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_amount, //C088
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_weightedAverageCost, //C089
              },
              BTC: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_amount, //C090
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_weightedAverageCost, //C091
              },
              USDT: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_USDT_amount, //C092
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_USDT_weightedAverageCost, //C093
              },
            },
          },
          disposalOfCryptocurrenciesForNonCashConsideration: {
            weightedAverageCost:
              supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_weightedAverageCost, //C024
            breakdown: {
              ETH: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_ETH_amount, //C094
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_ETH_weightedAverageCost, //C095
              },
              BTC: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_BTC_amount, //C096
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_BTC_weightedAverageCost, //C097
              },
              USDT: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_USDT_amount, //C098
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_USDT_weightedAverageCost, //C099
              },
            },
          },
          cryptocurrenciesReceivedFromCustomersAsTransactionFees: {
            weightedAverageCost:
              supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_weightedAverageCost, //C025
            breakdown: {
              USDT: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_USDT_amount, //C072
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_weightedAverageCost, //C073
              },
              ETH: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_amount, //C074
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_weightedAverageCost, //C075
              },
              BTC: {
                amount:
                  supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_amount, //C076
                weightedAverageCost:
                  supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_weightedAverageCost, //C077
              },
            },
          },
        },
      },

      otherSupplementaryItems: {
        details: {
          relatedToNonCash: {
            cryptocurrenciesEndOfPeriod: {
              weightedAverageCost:
                otherSupplementaryItems_details_relatedToNonCash_cryptocurrenciesEndOfPeriod_weightedAverageCost, //C051
            },
            cryptocurrenciesBeginningOfPeriod: {
              weightedAverageCost:
                otherSupplementaryItems_details_relatedToNonCash_cryptocurrenciesBeginningOfPeriod_weightedAverageCost, //C050
            },
          },
          relatedToCash: {
            netIncreaseDecreaseInCashCashEquivalentsAndRestrictedCash: {
              weightedAverageCost:
                otherSupplementaryItems_details_relatedToCash_netIncreaseDecreaseInCashCashEquivalentsAndRestrictedCash_weightedAverageCost, //C049
            },
            cryptocurrenciesBeginningOfPeriod: {
              weightedAverageCost: 0,
            },
            cryptocurrenciesEndOfPeriod: {
              weightedAverageCost: 0,
            },
          },
        },
      },

      operatingActivities: {
        weightedAverageCost: operatingActivities_weightedAverageCost, //C041
        details: {
          cashDepositedByCustomers: {
            weightedAverageCost:
              operatingActivities_details_cashDepositedByCustomers_weightedAverageCost, //C027
            breakdown: {
              USD: {
                amount:
                  operatingActivities_details_cashDepositedByCustomers_breakdown_USD_amount, //C134
                weightedAverageCost:
                  operatingActivities_details_cashDepositedByCustomers_breakdown_USD_weightedAverageCost, //C135
              },
            },
          },
          cashWithdrawnByCustomers: {
            weightedAverageCost:
              operatingActivities_details_cashWithdrawnByCustomers_weightedAverageCost, //C028
            breakdown: {
              USD: {
                amount:
                  operatingActivities_details_cashDepositedByCustomers_breakdown_USD_amount, //C136
                weightedAverageCost:
                  operatingActivities_details_cashDepositedByCustomers_breakdown_USD_weightedAverageCost, //C137
              },
            },
          },
          purchaseOfCryptocurrencies: {
            weightedAverageCost:
              operatingActivities_details_purchaseOfCryptocurrencies_weightedAverageCost, //C029
          },
          disposalOfCryptocurrencies: {
            weightedAverageCost:
              operatingActivities_details_disposalOfCryptocurrencies_weightedAverageCost, //C030
          },
          cashReceivedFromCustomersAsTransactionFee: {
            weightedAverageCost:
              operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_weightedAverageCost, //C031
            breakdown: {
              USD: {
                amount:
                  operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_breakdown_USD_amount, //C138
                weightedAverageCost:
                  operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_breakdown_USD_weightedAverageCost, //C139
              },
            },
          },
          cashPaidToSuppliersForExpenses: {
            weightedAverageCost:
              operatingActivities_details_cashPaidToSuppliersForExpenses_weightedAverageCost, //C034
            breakdown: {
              USD: {
                amount:
                  operatingActivities_details_cashPaidToSuppliersForExpenses_breakdown_USD_amount, //C140
                weightedAverageCost:
                  operatingActivities_details_cashPaidToSuppliersForExpenses_breakdown_USD_weightedAverageCost, //C141
              },
            },
          },
        },
      },

      investingActivities: {
        weightedAverageCost: investingActivities_weightedAverageCost, //C042
      },

      financingActivities: {
        weightedAverageCost: financingActivities_weightedAverageCost, //C048
        details: {
          proceedsFromIssuanceOfCommonStock: {
            weightedAverageCost:
              financingActivities_details_proceedsFromIssuanceOfCommonStock_weightedAverageCost, //C043
          },
          longTermDebt: {
            weightedAverageCost:
              financingActivities_details_longTermDebt_weightedAverageCost, //C044
          },
          shortTermBorrowings: {
            weightedAverageCost:
              financingActivities_details_shortTermBorrowings_weightedAverageCost, //C045
          },
          paymentsOfDividends: {
            weightedAverageCost:
              financingActivities_details_paymentsOfDividends_weightedAverageCost, //C046
          },
          treasuryStock: {
            weightedAverageCost:
              financingActivities_details_treasuryStock_weightedAverageCost, //C047
          },
        },
      },
    };

    res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
