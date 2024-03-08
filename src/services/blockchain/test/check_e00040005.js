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

describe('checking E00040005 balanceSheet', function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });

  //
  it('assets.details.cryptocurrency.totalAmountFairValue should equal 1250000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );
    expect(value).to.equal('1250000000000000000000');
  });
  //
  it('assets.details.cryptocurrency.breakdown.BTC.amount should equal 1000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.BTC.amount',
    );
    expect(value).to.equal('1000000000000000000');
  });
  //
  it('assets.details.cryptocurrency.breakdown.BTC.fairValue should equal 26000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.BTC.fairValue',
    );
    expect(value).to.equal('26000000000000000000000');
  });
  //
  it('assets.details.cryptocurrency.breakdown.USDT.amount should equal -25000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.amount',
    );
    expect(value).to.equal('-25000000000000000000000');
  });
  //
  it('assets.details.cryptocurrency.breakdown.USDT.fairValue should equal -24750000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('-24750000000000000000000');
  });
  //
  it('assets.totalAmountFairValue should equal 1250000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );
    expect(value).to.equal('1250000000000000000000');
  });
  //
  it('totalAssetsFairValue should equal 1250000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );
    expect(value).to.equal('1250000000000000000000');
  });
  //
  it('liabilities.details.userDeposit.totalAmountFairValue should equal 1250000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
    expect(value).to.equal('1250000000000000000000');
  });
  //
  it('liabilities.details.userDeposit.breakdown.USDT.amount should equal -25000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.amount',
    );
    expect(value).to.equal('-25000000000000000000000');
  });
  //
  it('liabilities.details.userDeposit.breakdown.USDT.fairValue should equal -24750000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('-24750000000000000000000');
  });
  //
  it('liabilities.details.userDeposit.breakdown.BTC.amount should equal 1000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.BTC.amount',
    );
    expect(value).to.equal('1000000000000000000');
  });
  //
  it('liabilities.details.userDeposit.breakdown.BTC.fairValue should equal 26000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.BTC.fairValue',
    );
    expect(value).to.equal('26000000000000000000000');
  });
  //
  it('liabilities.totalAmountFairValue should equal 1250000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );
    expect(value).to.equal('1250000000000000000000');
  });
  //
  it('equity.details.retainedEarnings.totalAmountFairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('equity.details.retainedEarnings.breakdown.USDT.amount should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('equity.details.retainedEarnings.breakdown.USDT.fairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('equity.totalAmountFairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'equity.totalAmountFairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('totalLiabilitiesAndEquityFairValue should equal 1250000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );
    expect(value).to.equal('1250000000000000000000');
  });
  //
});

describe('checking E00040005 comprehensive income', function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });

  //
  it('income.weightedAverageCost should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'comprehensiveIncome',
      'income.weightedAverageCost',
    );
    expect(value).to.equal('0');
  });
  //
  it('income.details.tradingFee.weightedAverageCost should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'comprehensiveIncome',
      'income.details.tradingFee.weightedAverageCost',
    );
    expect(value).to.equal('0');
  });
  //
  it('income.details.tradingFee.breakdown.USDT.amount should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'comprehensiveIncome',
      'income.details.tradingFee.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('netProfit should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'thirtythird_report',
      'comprehensiveIncome',
      'netProfit',
    );
    expect(value).to.equal('0');
  });
  //
});