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

describe('checking E00030007 balanceSheet', function () {
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
      'twentyseventh_report',
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.cryptocurrency.breakdown.USDT.amount should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.cryptocurrency.breakdown.USDT.fairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.accountsReceivable.totalAmountFairValue should equal -1683000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'assets.details.accountsReceivable.totalAmountFairValue',
    );
    expect(value).to.equal('-1683000000000000000000');
  });
  //
  it('assets.details.accountsReceivable.breakdown.USDT.amount should equal -1700000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.USDT.amount',
    );
    expect(value).to.equal('-1700000000000000000000');
  });
  //
  it('assets.details.accountsReceivable.breakdown.USDT.fairValue should equal -1683000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('-1683000000000000000000');
  });
  //
  it('assets.totalAmountFairValue should equal -1683000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );
    expect(value).to.equal('-1683000000000000000000');
  });
  //
  it('totalAssetsFairValue should equal -1683000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );
    expect(value).to.equal('-1683000000000000000000');
  });
  //
  it('liabilities.details.userDeposit.totalAmountFairValue should equal 336600000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
    expect(value).to.equal('336600000000000000000');
  });
  //
  it('liabilities.details.userDeposit.breakdown.USDT.amount should equal 340000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.amount',
    );
    expect(value).to.equal('340000000000000000000');
  });
  //
  it('liabilities.details.userDeposit.breakdown.USDT.fairValue should equal 336600000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('336600000000000000000');
  });
  //
  it('liabilities.details.accountsPayable.totalAmountFairValue should equal -2035600000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.totalAmountFairValue',
    );
    expect(value).to.equal('-2035600000000000000000');
  });
  //
  it('liabilities.details.accountsPayable.breakdown.USDT.amount should equal -440000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.USDT.amount',
    );
    expect(value).to.equal('-440000000000000000000');
  });
  //
  it('liabilities.details.accountsPayable.breakdown.USDT.fairValue should equal -435600000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('-435600000000000000000');
  });
  //
  it('liabilities.details.accountsPayable.breakdown.ETH.amount should equal -1000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.ETH.amount',
    );
    expect(value).to.equal('-1000000000000000000');
  });
  //
  it('liabilities.details.accountsPayable.breakdown.ETH.fairValue should equal -1600000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.ETH.fairValue',
    );
    expect(value).to.equal('-1600000000000000000000');
  });
  //
  it('liabilities.totalAmountFairValue should equal -1699000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );
    expect(value).to.equal('-1699000000000000000000');
  });
  //
  it('equity.details.retainedEarnings.totalAmountFairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('equity.details.retainedEarnings.breakdown.USDT.amount should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('equity.details.retainedEarnings.breakdown.USDT.fairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('equity.details.otherCapitalReserve.fairValue should equal 24416000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.fairValue',
    );
    expect(value).to.equal('24416000000000000000000');
  });
  //
  it('equity.details.otherCapitalReserve.breakdown.USDT.amount should equal -1600000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.USDT.amount',
    );
    expect(value).to.equal('-1600000000000000000000');
  });
  //
  it('equity.details.otherCapitalReserve.breakdown.USDT.fairValue should equal -1584000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('-1584000000000000000000');
  });
  //
  it('equity.details.otherCapitalReserve.breakdown.ETH.amount should equal 1000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.ETH.amount',
    );
    expect(value).to.equal('1000000000000000000');
  });
  //
  it('equity.details.otherCapitalReserve.breakdown.ETH.fairValue should equal 1600000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'equity.details.otherCapitalReserve.breakdown.ETH.fairValue',
    );
    expect(value).to.equal('1600000000000000000000');
  });
  //
  it(' equity.totalAmountFairValue should equal 16000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'equity.totalAmountFairValue',
    );
    expect(value).to.equal('16000000000000000000');
  });
  //
  it('totalLiabilitiesAndEquityFairValue should equal -26083000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );
    expect(value).to.equal('-26083000000000000000000');
  });
});

describe('checking E00030007 comprehensive income', function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  //
  it('income.weightedAverageCost should equal 101000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'comprehensiveIncome',
      'income.weightedAverageCost',
    );
    expect(value).to.equal('101000000000000000000');
  });
  //
  it('income.details.tradingFee.weightedAverageCost should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'comprehensiveIncome',
      'income.details.tradingFee.weightedAverageCost',
    );
    expect(value).to.equal('0');
  });
  //
  it('income.details.tradingFee.breakdown.USDT.amount should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'comprehensiveIncome',
      'income.details.tradingFee.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('income.details.tradingFee.breakdown.USDT.weightedAverageCost should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'comprehensiveIncome',
      'income.details.tradingFee.breakdown.USDT.weightedAverageCost',
    );
    expect(value).to.equal('0');
  });
  //
  it('income.details.liquidationFee.weightedAverageCost should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'comprehensiveIncome',
      'income.details.liquidationFee.weightedAverageCost',
    );
    expect(value).to.equal('0');
  });
  //
  it('income.details.liquidationFee.breakdown.USDT.amount should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('income.details.liquidationFee.breakdown.USDT.weightedAverageCost should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'comprehensiveIncome',
      'income.details.liquidationFee.breakdown.USDT.weightedAverageCost',
    );
    expect(value).to.equal('0');
  });
  //
  it('otherGainsLosses.details.cryptocurrencyGains.weightedAverageCost should equal 101000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.weightedAverageCost',
    );
    expect(value).to.equal('101000000000000000000');
  });
  //
  it('otherGainsLosses.details.cryptocurrencyGains.breakdown.USDT.amount should equal 100000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.USDT.amount',
    );
    expect(value).to.equal('100000000000000000000');
  });
  //
  it('otherGainsLosses.details.cryptocurrencyGains.breakdown.USDT.weightedAverageCost should equal 101000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'comprehensiveIncome',
      'otherGainsLosses.details.cryptocurrencyGains.breakdown.USDT.weightedAverageCost',
    );
    expect(value).to.equal('101000000000000000000');
  });
  //
  it('netProfit should equal 101000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyseventh_report',
      'comprehensiveIncome',
      'netProfit',
    );
    expect(value).to.equal('101000000000000000000');
  });
});