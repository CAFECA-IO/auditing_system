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

describe('checking E00010007 balanceSheet', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  it('assets.details.cashAndCashEquivalent.totalAmountFairValue should equal 10001000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.totalAmountFairValue',
    );

    expect(value).to.equal('10001000000000000000000');
  });

  it('assets.details.cashAndCashEquivalent.breakdown.USD.amount should equal 10001000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.breakdown.USD.amount',
    );

    expect(value).to.equal('10001000000000000000000');
  });

  it('assets.details.cashAndCashEquivalent.breakdown.USD.fairValue should equal 10001000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.breakdown.USD.fairValue',
    );

    expect(value).to.equal('10001000000000000000000');
  });

  it('assets.totalAmountFairValue should equal 10001000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );

    expect(value).to.equal('10001000000000000000000');
  });

  it('totalAssetsFairValue should equal 10001000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );

    expect(value).to.equal('10001000000000000000000');
  });

  it('liabilities.details.userDeposit.totalAmountFairValue should equal 9990000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );

    expect(value).to.equal('9990000000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.USD.amount should equal 9990000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USD.amount',
    );

    expect(value).to.equal('9990000000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.USD.fairValue should equal 9990000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USD.fairValue',
    );

    expect(value).to.equal('9990000000000000000000');
  });

  it('liabilities.totalAmountFairValue should equal 9990000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );

    expect(value).to.equal('9990000000000000000000');
  });

  it('equity.details.retainedEarnings.totalAmountFairValue should equal 11000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );

    expect(value).to.equal('11000000000000000000');
  });

  it('equity.details.retainedEarnings.breakdown.USD.amount should equal 11000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USD.amount',
    );

    expect(value).to.equal('11000000000000000000');
  });

  it('equity.details.retainedEarnings.breakdown.USD.fairValue should equal 11000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USD.fairValue',
    );

    expect(value).to.equal('11000000000000000000');
  });

  it('equity.totalAmountFairValue should equal 11000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'equity.totalAmountFairValue',
    );

    expect(value).to.equal('11000000000000000000');
  });

  it('totalLiabilitiesAndEquityFairValue should equal 10001000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );

    expect(value).to.equal('10001000000000000000000');
  });
});

describe('checking E00010007 comprehensive income', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  it('income.details.depositFee.weightedAverageCost should equal 11000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'comprehensiveIncome',
      'income.details.depositFee.weightedAverageCost',
    );

    expect(value).to.equal('11000000000000000000');
  });

  it('income.details.depositFee.breakdown.USD.amount should equal 11000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.USD.amount',
    );

    expect(value).to.equal('11000000000000000000');
  });

  it('income.details.depositFee.breakdown.USD.weightedAverageCost should equal 11000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.USD.weightedAverageCost',
    );

    expect(value).to.equal('11000000000000000000');
  });

  it('netProfit should equal 11000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'comprehensiveIncome',
      'netProfit',
    );

    expect(value).to.equal('11000000000000000000');
  });
});

describe('checking E00010007 cashFlow', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  it('operatingActivities.details.cashDepositedByCustomers.weightedAverageCost should equal 9990000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'operatingActivities.details.cashDepositedByCustomers.weightedAverageCost',
    );

    expect(value).to.equal('9990000000000000000000');
  });

  it('operatingActivities.details.cashDepositedByCustomers.breakdown.USD.amount should equal 9990000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'operatingActivities.details.cashDepositedByCustomers.breakdown.USD.amount',
    );

    expect(value).to.equal('9990000000000000000000');
  });

  it('operatingActivities.details.cashDepositedByCustomers.breakdown.USD.weightedAverageCost should equal 9990000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'operatingActivities.details.cashDepositedByCustomers.breakdown.USD.weightedAverageCost',
    );

    expect(value).to.equal('9990000000000000000000');
  });

  it('operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.weightedAverageCost should equal 11000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.weightedAverageCost',
    );

    expect(value).to.equal('11000000000000000000');
  });

  it('operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.amount should equal 11000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.amount',
    );

    expect(value).to.equal('11000000000000000000');
  });

  it('operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.weightedAverageCost should equal 10001000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.weightedAverageCost',
    );

    expect(value).to.equal('10001000000000000000000');
  });

  it('operatingActivities.weightedAverageCost should equal 10001000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'operatingActivities.weightedAverageCost',
    );

    expect(value).to.equal('10001000000000000000000');
  });

  it('otherSupplementaryItems.details.relatedToCash.cashCashEquivalentsAndRestrictedCashEndOfPeriod.weightedAverageCost should equal 10001000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'otherSupplementaryItems.details.relatedToCash.cashCashEquivalentsAndRestrictedCashEndOfPeriod.weightedAverageCost',
    );

    expect(value).to.equal('10001000000000000000000');
  });
});
