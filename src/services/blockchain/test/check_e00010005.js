const { should } = require('chai');
const { expect } = require('chai');
const { exec } = require('child_process');
const { timeStamp } = require('console');
require('events').EventEmitter.defaultMaxListeners = 20;
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
);
const privateKey = process.env.SEPOLIA_PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);
const contractABIPath = path.resolve(__dirname, '../../routerABI.json');
const contractABI = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const routerContractAddress = process.env.ROUTER_ADDRESS;
const contractWithSigner = new ethers.Contract(
  routerContractAddress,
  contractABI,
  signer,
);

describe('checking E00010005 balanceSheet', function () {
  it('assets.details.cryptocurrency.totalAmountFairValue should equal -15987.2', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-15987.2');
  });

  it('assets.details.cryptocurrency.breakdown.ETH.amount should equal -9.992', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.ETH.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-9.992');
  });

  it('assets.details.cryptocurrency.breakdown.ETH.fairValue should equal -15987.2', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.ETH.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-15987.2');
  });

  it('assets.totalAmountFairValue should equal -15987.2', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-15987.2');
  });

  it('totalAssetsFairValue should equal -15987.2', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-15987.2');
  });

  it('liabilities.details.userDeposit.totalAmountFairValue should equal -16000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-16000');
  });

  it('liabilities.details.userDeposit.breakdown.ETH.amount should equal -10', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.ETH.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-10');
  });

  it('liabilities.details.userDeposit.breakdown.ETH.fairValue should equal -16000 ', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.ETH.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-16000');
  });

  it('liabilities.totalAmountFairValue should equal -16000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-16000');
  });

  it('equity.details.retainedEarnings.totalAmountFairValue should equal 12.8', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('12.8');
  });

  it('totalLiabilitiesAndEquityFairValue should equal 15996.8', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('15996.8');
  });
});

describe('checking E00010005 comprehensive income', function () {
  it('income.details.withdrawalFee.weightedAverageCost should equal 15', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('15');
  });

  it('income.details.withdrawalFee.breakdown.ETH.amount should equal 0.01', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.ETH.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.01');
  });

  it('income.details.withdrawalFee.breakdown.ETH.weightedAverageCost should equal 15', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.ETH.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('15');
  });

  it('costs.details.technicalProviderFee.weightedAverageCost should equal -3', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-3');
  });

  it('costs.details.technicalProviderFee.breakdown.ETH.amount should equal -0.002', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.ETH.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.002');
  });

  it('costs.details.technicalProviderFee.breakdown.ETH.fairValue should equal -3', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.ETH.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-3');
  });

  it('costs.weightedAverageCost should equal -3', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'costs.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-3');
  });

  it('netProfit should equal 12', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'netProfit',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('12');
  });
});

describe('checking E00010005 cashFlow', function () {
  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost should be -15000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-15000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.amount should be -10', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-10');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.weightedAverageCost should be -15000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-15000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost should be 15', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('15');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.amount should be 0.01', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.01');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.weightedAverageCost should be 15', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('15');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost should be -3', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-3');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.amount should be -0.002 ', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.002');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.weightedAverageCost should be -3', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-3');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost should be -14988000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost',
    );
    expect(value).to.equal('-14988000000000000000000');
  });

  it('otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost should be -14988000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost',
    );
    expect(value).to.equal('-14988000000000000000000');
  });
});
