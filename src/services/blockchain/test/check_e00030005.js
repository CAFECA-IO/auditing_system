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

describe('checking E00030005 balanceSheet', function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });

  it('assets.details.cryptocurrency.totalAmountFairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.cryptocurrency.breakdown.USDT.amount should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.cryptocurrency.breakdown.USDT.fairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.accountsReceivable.totalAmountFairValue should equal -2772000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'assets.details.accountsReceivable.totalAmountFairValue',
    );
    expect(value).to.equal('-2772000000000000000000');
  });
  //
  it('assets.details.accountsReceivable.breakdown.USDT.amount should equal -2800000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.USDT.amount',
    );
    expect(value).to.equal('-2800000000000000000000');
  });
  //
  it('assets.details.accountsReceivable.breakdown.USDT.fairValue should equal -2772000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('-2772000000000000000000');
  });
  //
  it('assets.totalAmountFairValue should equal -2772000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );
    expect(value).to.equal('-2772000000000000000000');
  });
  //
  it('totalAssetsFairValue should equal -2772000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );
    expect(value).to.equal('-2772000000000000000000');
  });
  //
  it('liabilities.details.userDeposit.totalAmountFairValue should equal 554400000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
    expect(value).to.equal('554400000000000000000');
  });
  //
  it('liabilities.details.userDeposit.breakdown.USDT.amount should equal 560000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.amount',
    );
    expect(value).to.equal('560000000000000000000');
  });
  //
  it('liabilities.details.userDeposit.breakdown.USDT.fairValue should equal 554400000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('554400000000000000000');
  });
  //
  it('liabilities.details.accountsPayable.totalAmountFairValue should equal -554400000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.totalAmountFairValue',
    );
    expect(value).to.equal('-554400000000000000000');
  });
  //
  it('liabilities.details.accountsPayable.breakdown.USDT.amount should equal -550000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.USDT.amount',
    );
    expect(value).to.equal('-550000000000000000000');
  });
  //
  it('liabilities.details.accountsPayable.breakdown.USDT.fairValue should equal -544500000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('-544500000000000000000');
  });
  //
  it('liabilities.details.accountsPayable.breakdown.BTC.amount should equal -100000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.BTC.amount',
    );
    expect(value).to.equal('-100000000000000000');
  });
  //
  it('liabilities.details.accountsPayable.breakdown.BTC.fairValue should equal -2600000000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.BTC.fairValue',
    );
    expect(value).to.equal('-2600000000000000000000');
  });
  //
  it('liabilities.totalAmountFairValue  should equal -2590100000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );
    expect(value).to.equal('-2590100000000000000000');
  });
  //
  it('equity.details.retainedEarnings.totalAmountFairValue  should equal 0 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('equity.details.retainedEarnings.breakdown.USDT.amount should equal 0 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('equity.details.retainedEarnings.breakdown.USDT.fairValue should equal 0 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('equity.details.otherCapitalReserve.totalAmountFairValue should equal -181900000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.totalAmountFairValue',
    );
    expect(value).to.equal('-181900000000000000000');
  });
  //
  it('equity.details.otherCapitalReserve.breakdown.USDT.amount should equal -2810000000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.USDT.amount',
    );
    expect(value).to.equal('-2810000000000000000000');
  });
  //
  it('equity.details.otherCapitalReserve.breakdown.USDT.fairValue should equal -2781900000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('-2781900000000000000000');
  });
  //
  it('equity.details.otherCapitalReserve.breakdown.BTC.amount should equal 100000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.BTC.amount',
    );
    expect(value).to.equal('100000000000000000');
  });
  //
  it('equity.details.otherCapitalReserve.breakdown.BTC.fairValue should equal 2600000000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.BTC.fairValue',
    );
    expect(value).to.equal('2600000000000000000000');
  });
  //
  it('equity.totalAmountFairValue should equal -181900000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'equity.totalAmountFairValue',
    );
    expect(value).to.equal('-181900000000000000000');
  });
  //
  it('totalLiabilitiesAndEquityFairValue should equal -2772000000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );
    expect(value).to.equal('-2772000000000000000000');
  });
});

describe('checking E00030005 comprehensive income', function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  //

  it('income.weightedAverageCost should equal -10100000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'comprehensiveIncome',
      'income.weightedAverageCost',
    );
    expect(value).to.equal('-10100000000000000000');
  });
  //
  it('income.details.transactionFee.weightedAverageCost should equal 0 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'comprehensiveIncome',
      'income.details.transactionFee.weightedAverageCost',
    );
    expect(value).to.equal('0');
  });
  //
  it('income.details.transactionFee.breakdown.USDT.amount should equal 0 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('income.details.transactionFee.breakdown.USDT.amount should equal 0 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('income.details.transactionFee.breakdown.USDT.weightedAverageCost should equal 0 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'comprehensiveIncome',
      'income.details.transactionFee.breakdown.USDT.weightedAverageCost',
    );
    expect(value).to.equal('0');
  });
  //
  it('income.details.liquidationFee.weightedAverageCost should equal 0 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'comprehensiveIncome',
      'income.details.liquidationFee.weightedAverageCost',
    );
    expect(value).to.equal('0');
  });
  //
  it('income.details.liquidationFee.breakdown.USDT.amount should equal 0 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('income.details.liquidationFee.breakdown.USDT.weightedAverageCost should equal 0 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.USDT.weightedAverageCost',
    );
    expect(value).to.equal('0');
  });
  //
  it('otherGainsLosses.details.cryptocurrencyGains.weightedAverageCost should equal -10100000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.weightedAverageCost',
    );
    expect(value).to.equal('-10100000000000000000');
  });
  //
  it('otherGainsLosses.details.cryptocurrencyGains.breakdown.USDT.amount should equal -10000000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.USDT.amount',
    );
    expect(value).to.equal('-10000000000000000000');
  });
  //
  it('otherGainsLosses.details.cryptocurrencyGains.breakdown.USDT.weightedAverageCost should equal -10100000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.USDT.weightedAverageCost',
    );
    expect(value).to.equal('-10100000000000000000');
  });
  //
  it(' netProfit should equal -10100000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'twentyfifth_report',
      'comprehensiveIncome',
      'netProfit',
    );
    expect(value).to.equal('-10100000000000000000');
  });
});
