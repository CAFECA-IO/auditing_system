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

describe('checking E00020009 balanceSheet', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  it('liabilities.details.userDeposit.totalAmountFairValue should equal -99000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventeenth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
    expect(value).to.equal('-99000000000000000000');
  });
  it(' liabilities.details.userDeposit.breakdown.USDT.amount should equal  -100000000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'seventeenth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.amount',
    );
    expect(value).to.equal('-100000000000000000000');
  });
  it('liabilities.details.userDeposit.breakdown.USDT.fairValue should equal -99000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventeenth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('-99000000000000000000');
  });
  it('liabilities.details.accountsPayable.totalAmountFairValue should equal 99000000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'seventeenth_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.totalAmountFairValue',
    );
    expect(value).to.equal('99000000000000000000');
  });
  it('liabilities.details.accountsPayable.breakdown.USDT.amount should equal 10000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventeenth_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.USDT.amount',
    );
    expect(value).to.equal('100000000000000000000');
  });
  it('liabilities.details.accountsPayable.breakdown.USDT.fairValue should equal 99000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'seventeenth_report',
      'balanceSheet',
      'liabilities.details.accountsPayable.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('99000000000000000000');
  });
  it('liabilities.totalAmountFairValue  should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'seventeenth_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );
    expect(value).to.equal('0');
  });
  it('totalLiabilitiesAndEquityFairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'seventeenth_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );
    expect(value).to.equal('0');
  });
});
