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

describe('checking E00010006 balanceSheet', function () {
  it('assets.details.cryptocurrency.totalAmountFairValue should equal -25974780000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );
    expect(value).to.equal('-25974780000000000000000');
  });

  it('assets.details.cryptocurrency.breakdown.BTC.amount should equal -999030000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.BTC.amount',
    );
    expect(value).to.equal('-999030000000000000');
  });

  it('assets.details.cryptocurrency.breakdown.BTC.fairValue should equal -25974780000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.BTC.fairValue',
    );
    expect(value).to.equal('-25974780000000000000000');
  });

  it('assets.totalAmountFairValue should equal -25974780000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );
    expect(value).to.equal('-25974780000000000000000');
  });

  it('totalAssetsFairValue should equal -25974780000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );
    expect(value).to.equal('-25974780000000000000000');
  });

  it('liabilities.details.userDeposit.totalAmountFairValue should equal -26000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
    expect(value).to.equal('-26000000000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.BTC.amount should equal -1000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.BTC.amount',
    );
    expect(value).to.equal('-1000000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.BTC.fairValue should equal -26000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.BTC.fairValue',
    );
    expect(value).to.equal('-26000000000000000000000');
  });

  it(' liabilities.totalAmountFairValue should equal -26000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );
    expect(value).to.equal('-26000000000000000000000');
  });

  it('equity.details.retainedEarnings.totalAmountFairValue should equal 25220000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );
    expect(value).to.equal('25220000000000000000');
  });

  it('equity.details.retainedEarnings.breakdown.BTC.amount should equal 970000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.BTC.amount',
    );
    expect(value).to.equal('970000000000000');
  });

  it('equity.details.retainedEarnings.breakdown.BTC.fairValue should equal 820000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.BTC.fairValue',
    );
    expect(value).to.equal('820000000000000000');
  });

  it('equity.totalAmountFairValue should equal 820000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'equity.totalAmountFairValue',
    );
    expect(value).to.equal('820000000000000000');
  });

  it('totalLiabilitiesAndEquityFairValue should equal -1599220000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );
    expect(value).to.equal('-1599220000000000000000');
  });
});

describe('checking E00010006 comprehensive income', function () {
  it('income.details.withdrawalFee.weightedAverageCost should equal 25', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('25');
  });

  it('income.details.withdrawalFee.breakdown.BTC.amount should equal 0.001', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.BTC.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.001');
  });

  it('income.details.withdrawalFee.breakdown.BTC.weightedAverageCost should equal 25', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.BTC.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('25');
  });

  it('costs.details.technicalProviderFee.weightedAverageCost should equal -0.75', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.75');
  });

  it('costs.details.technicalProviderFee.breakdown.BTC.amount  should equal -0.00003', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.BTC.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.00003');
  });

  it('costs.details.technicalProviderFee.breakdown.BTC.fairValue  should equal -0.75', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.BTC.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.75');
  });

  it('costs.weightedAverageCost  should equal -0.75', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'costs.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.75');
  });

  it('netProfit  should equal 24.25', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'netProfit',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('24.25');
  });
});

describe('checking E00010006 cashFlow', function () {
  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost   should equal -25000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-25000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.BTC.amount  should equal -1', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.BTC.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-1');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.BTC.weightedAverageCost should equal -25000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.BTC.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-25000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost should equal 25', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('25');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.BTC.amount should equal 0.001', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.BTC.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.001');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.BTC.weightedAverageCost should equal 25', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.BTC.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('25');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost should equal -0.75', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.75');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.BTC.amount  should equal -0.00003', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.BTC.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.00003');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.BTC.weightedAverageCost should equal  -0.75', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.BTC.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.75');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost should equal   -24975.75', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-24975.75');
  });

  it('otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost should equal -24975.75', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-24975.75');
  });
});
