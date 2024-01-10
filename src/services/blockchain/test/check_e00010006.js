const { should } = require('chai');
const { expect } = require('chai');
const { exec } = require('child_process');
const { timeStamp } = require('console');
require('events').EventEmitter.defaultMaxListeners = 20;
const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');

const contractABIPath = path.resolve(
  __dirname,
  '../../blockchain/artifacts/artifacts/src/services/blockchain/contracts/router.sol/RouterContract.json',
);
const contractJSON = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const contractABI = contractJSON.abi;
const routerContractAddress = process.env.ROUTER_ADDRESS;

let contractWithSigner;

describe('checking E00010006 balanceSheet', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
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

  it('totalLiabilitiesAndEquityFairValue should equal 1599220000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );
    expect(value).to.equal('1599220000000000000000');
  });
});

describe('checking E00010006 comprehensive income', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  it('income.details.withdrawalFee.weightedAverageCost should equal 25000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.weightedAverageCost',
    );
    expect(value).to.equal('25000000000000000000');
  });

  it('income.details.withdrawalFee.breakdown.BTC.amount should equal 1000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.BTC.amount',
    );
    expect(value).to.equal('1000000000000000');
  });

  it('income.details.withdrawalFee.breakdown.BTC.weightedAverageCost should equal 25000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.BTC.weightedAverageCost',
    );
    expect(value).to.equal('25000000000000000000');
  });

  it('costs.details.technicalProviderFee.weightedAverageCost should equal -750000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.weightedAverageCost',
    );
    expect(value).to.equal('-750000000000000000');
  });

  it('costs.details.technicalProviderFee.breakdown.BTC.amount  should equal -30000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.BTC.amount',
    );
    expect(value).to.equal('-30000000000000');
  });

  it('costs.details.technicalProviderFee.breakdown.BTC.fairValue  should equal -750000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.BTC.fairValue',
    );
    expect(value).to.equal('-750000000000000000');
  });

  it('costs.weightedAverageCost  should equal -750000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'costs.weightedAverageCost',
    );
    expect(value).to.equal('-750000000000000000');
  });

  it('netProfit  should equal 24250000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'comprehensiveIncome',
      'netProfit',
    );
    expect(value).to.equal('24250000000000000000');
  });
});

describe('checking E00010006 cashFlow', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost   should equal -25000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost',
    );
    expect(value).to.equal('-25000000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.BTC.amount  should equal -1000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.BTC.amount',
    );
    expect(value).to.equal('-1000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.BTC.weightedAverageCost should equal -25000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.BTC.weightedAverageCost',
    );
    expect(value).to.equal('-25000000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost should equal 25000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost',
    );
    expect(value).to.equal('25000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.BTC.amount should equal 1000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.BTC.amount',
    );
    expect(value).to.equal('1000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.BTC.weightedAverageCost should equal 25000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.BTC.weightedAverageCost',
    );
    expect(value).to.equal('25000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost should equal -750000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost',
    );
    expect(value).to.equal('-750000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.BTC.amount  should equal -30000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.BTC.amount',
    );
    expect(value).to.equal('-30000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.BTC.weightedAverageCost should equal  -750000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.BTC.weightedAverageCost',
    );
    expect(value).to.equal('-750000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost should equal   -24975750000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost',
    );
    expect(value).to.equal('-24975750000000000000000');
  });

  it('otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost should equal -24975750000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'sixth_report',
      'cashFlow',
      'otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost',
    );
    expect(value).to.equal('-24975750000000000000000');
  });
});
