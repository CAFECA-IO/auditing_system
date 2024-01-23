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

describe('checking E00030006 balanceSheet', function () {
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
      'twentysixth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.cryptocurrency.breakdown.USDT.amount should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentysixth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.cryptocurrency.breakdown.USDT.fairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentysixth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.accountsReceivable.totalAmountFairValue should equal -2600000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysixth_report',
      'balanceSheet',
      'assets.details.accountsReceivable.totalAmountFairValue',
    );
    expect(value).to.equal('-2600000000000000000000');
  });
  //
  it('assets.details.accountsReceivable.breakdown.USDT.amount should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentysixth_report',
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.accountsReceivable.breakdown.USDT.fairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentysixth_report',
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.accountsReceivable.breakdown.BTC.amount should equal -100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysixth_report',
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.BTC.amount',
    );
    expect(value).to.equal('-100000000000000000');
  });
  //
  it('assets.details.accountsReceivable.breakdown.BTC.fairValue should equal -2600000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysixth_report',
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.BTC.fairValue',
    );
    expect(value).to.equal('-2600000000000000000000');
  });
  //
  it('assets.totalAmountFairValue should equal -2600000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysixth_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );
    expect(value).to.equal('-2600000000000000000000');
  });
  //
  it('totalAssetsFairValue should equal -2600000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysixth_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );
    expect(value).to.equal('-2600000000000000000000');
  });
  //
  it('liabilities.details.userDeposit.totalAmountFairValue should equal 475200000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysixth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
    expect(value).to.equal('475200000000000000000');
  });
  //
  it('liabilities.details.userDeposit.breakdown.USDT.amount should equal 480000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysixth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.amount',
    );
    expect(value).to.equal('480000000000000000000');
  });
  //
  it('liabilities.details.userDeposit.breakdown.USDT.fairValue should equal 475200000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysixth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('475200000000000000000');
  });
  //
  it('liabilities.details.accountsPayable.totalAmountFairValue should equal -3049200000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysixth_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.totalAmountFairValue',
    );
    expect(value).to.equal('-3049200000000000000000');
  });
  //
  it('liabilities.details.accountsPayable.breakdown.USDT.amount should equal -3080000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentysixth_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.USDT.amount',
    );
    expect(value).to.equal('-3080000000000000000000');
  });
});

describe('checking E00030006 comprehensive income', function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  //
});
