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

describe('checking E00030002 balanceSheet', function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });

  it('assets.details.cryptocurrency.totalAmountFairValue should equal 4752000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );
    expect(value).to.equal('4752000000000000000');
  });

  it('assets.details.cryptocurrency.breakdown.USDT.amount should equal 4800000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.amount',
    );
    expect(value).to.equal('4800000000000000000');
  });

  it('assets.details.cryptocurrency.breakdown.USDT.fairValue should equal 4752000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('4752000000000000000');
  });

  it('assets.details.accountsReceivable.totalAmountFairValue should equal 2600000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'assets.details.accountsReceivable.totalAmountFairValue',
    );
    expect(value).to.equal('2600000000000000000000');
  });

  it('assets.details.accountsReceivable.breakdown.BTC.amount should equal 100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.BTC.amount',
    );
    expect(value).to.equal('100000000000000000');
  });

  it('assets.details.accountsReceivable.breakdown.BTC.fairValue should equal 2600000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.BTC.fairValue',
    );
    expect(value).to.equal('2600000000000000000000');
  });

  it('assets.totalAmountFairValue should equal 2604752000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );
    expect(value).to.equal('2604752000000000000000');
  });

  it('totalAssetsFairValue should equal 2604752000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );
    expect(value).to.equal('2604752000000000000000');
  });

  it('liabilities.details.userDeposit.totalAmountFairValue should equal -475200000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
    expect(value).to.equal('-475200000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.USDT.amount should equal -480000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.amount',
    );
    expect(value).to.equal('-480000000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.USDT.fairValue should equal -475200000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('-475200000000000000000');
  });

  it('liabilities.details.accountsPayable.totalAmountFairValue should equal 2851200000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.totalAmountFairValue',
    );
    expect(value).to.equal('2851200000000000000000');
  });

  it('liabilities.details.accountsPayable.breakdown.USDT.amount should equal 2880000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.USDT.amount',
    );
    expect(value).to.equal('2880000000000000000000');
  });

  it('liabilities.details.accountsPayable.breakdown.USDT.fairValue should equal 2851200000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('2851200000000000000000');
  });

  it('liabilities.totalAmountFairValue  should equal 2376000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );
    expect(value).to.equal('2376000000000000000000');
  });

  it('equity.details.retainedEarnings.totalAmountFairValue  should equal  4752000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );
    expect(value).to.equal('4752000000000000000');
  });

  it('equity.details.retainedEarnings.breakdown.USDT.amount  should equal  4800000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.amount',
    );
    expect(value).to.equal('4800000000000000000');
  });

  it('equity.details.retainedEarnings.breakdown.USDT.fairValue  should equal  4752000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('4752000000000000000');
  });

  it('equity.details.otherCapitalReserve.fairValue  should equal  4976000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.fairValue',
    );
    expect(value).to.equal('4976000000000000000000');
  });

  it('equity.details.otherCapitalReserve.breakdown.USDT.amount  should equal  -2400000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.USDT.amount',
    );
    expect(value).to.equal('-2400000000000000000000');
  });

  it('equity.details.otherCapitalReserve.breakdown.USDT.fairValue  should equal  -2376000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('-2376000000000000000000');
  });

  it('equity.details.otherCapitalReserve.breakdown.BTC.amount  should equal  100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.BTC.amount',
    );
    expect(value).to.equal('100000000000000000');
  });

  it('equity.details.otherCapitalReserve.breakdown.BTC.fairValue  should equal  2600000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.BTC.fairValue',
    );
    expect(value).to.equal('2600000000000000000000');
  });

  it('equity.totalAmountFairValue  should equal  228752000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'equity.totalAmountFairValue',
    );
    expect(value).to.equal('228752000000000000000');
  });

  it('totalLiabilitiesAndEquityFairValue should equal  2604752000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );
    expect(value).to.equal('2604752000000000000000');
  });
});

describe('checking E00030001 comprehensive income', function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  it('income.weightedAverageCost should equal  4848000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'comprehensiveIncome',
      'income.weightedAverageCost',
    );
    expect(value).to.equal('4848000000000000000');
  });

  it('income.details.tradingFee.weightedAverageCost should equal  0', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'comprehensiveIncome',
      'income.details.tradingFee.weightedAverageCost',
    );
    expect(value).to.equal('0');
  });

  it('income.details.tradingFee.breakdown.USDT.amount should equal  0', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'comprehensiveIncome',
      'income.details.tradingFee.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });

  it('income.details.tradingFee.breakdown.USDT.weightedAverageCost should equal  0', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'comprehensiveIncome',
      'income.details.tradingFee.breakdown.USDT.weightedAverageCost',
    );
    expect(value).to.equal('0');
  });

  it('income.details.guaranteedStopLossFee.weightedAverageCost should equal  4848000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'comprehensiveIncome',
      'income.details.guaranteedStopLossFee.weightedAverageCost',
    );
    expect(value).to.equal('4848000000000000000');
  });

  it('income.details.guaranteedStopLossFee.breakdown.USDT.amount should equal  4800000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'comprehensiveIncome',
      'income.details.guaranteedStopLossFee.breakdown.USDT.amount',
    );
    expect(value).to.equal('4800000000000000000');
  });

  it('income.details.guaranteedStopLossFee.breakdown.USDT.weightedAverageCost should equal  4848000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'comprehensiveIncome',
      'income.details.guaranteedStopLossFee.breakdown.USDT.weightedAverageCost',
    );
    expect(value).to.equal('4848000000000000000');
  });

  it('netProfit should equal  4848000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysecond_report',
      'comprehensiveIncome',
      'netProfit',
    );
    expect(value).to.equal('4848000000000000000');
  });
});
