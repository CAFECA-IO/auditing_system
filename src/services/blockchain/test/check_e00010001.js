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

describe('checking E00010001 balanceSheet', function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });

  it('assets.details.cryptocurrency.totalAmountFairValue should equal 9900990000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );
    expect(value).to.equal('9900990000000000000000');
  });

  it('assets.details.cryptocurrency.breakdown.USDT.amount should equal 10001000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.amount',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('10001000000000000000000');
  });

  it('assets.details.cryptocurrency.breakdown.USDT.fairValue should equal 9900990000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.fairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('9900990000000000000000');
  });

  it('assets.totalAmountFairValue should equal 9900990000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('9900990000000000000000');
  });

  it('totalAssetsFairValue should equal 9900990000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('9900990000000000000000');
  });

  it('liabilities.details.userDeposit.totalAmountFairValue should equal 9890100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('9890100000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.USDT.amount should equal 9990000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.amount',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('9990000000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.USDT.fairValue should equal 9890100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.fairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('9890100000000000000000');
  });

  it('liabilities.totalAmountFairValue should equal 9890100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('9890100000000000000000');
  });

  it('equity.details.retainedEarnings.totalAmountFairValue should equal 10890000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('10890000000000000000');
  });

  it('equity.details.retainedEarnings.breakdown.USDT.amount should equal 11000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.amount',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('11000000000000000000');
  });

  it('equity.details.retainedEarnings.breakdown.USDT.fairValue should equal 10890000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.fairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('10890000000000000000');
  });

  it('equity.totalAmountFairValue should equal 10890000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'equity.totalAmountFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('10890000000000000000');
  });

  it('totalLiabilitiesAndEquityFairValue should equal 9900990000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('9900990000000000000000');
  });
});

describe('checking E00010001 comprehensive income', function () {
  it('income.details.depositFee.weightedAverageCost should equal 11110000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'comprehensiveIncome',
      'income.details.depositFee.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('11110000000000000000');
  });

  it('income.details.depositFee.breakdown.USDT.amount should equal 11000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.USDT.amount',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('11000000000000000000');
  });

  it('income.details.depositFee.breakdown.USDT.weightedAverageCost should equal 11110000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.USDT.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('11110000000000000000');
  });

  it('netProfit should equal 11110000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'comprehensiveIncome',
      'netProfit',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('11110000000000000000');
  });
});

describe('checking E00010001 cashFlow', function () {
  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.weightedAverageCost should equal 10089900000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.weightedAverageCost',
    );
    expect(value).to.equal('10089900000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.amount should equal 9990000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.amount',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('9990000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.weightedAverageCost should equal 10089900000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('10089900000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost should equal 11110000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('11110000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.amount  should equal 11000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.amount',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('11000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.weightedAverageCost  should equal 11110000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('11110000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost  should equal 10101010000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('10101010000000000000000');
  });

  it('otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost  should equal 10101010000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'cashFlow',
      'otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('10101010000000000000000');
  });
});
