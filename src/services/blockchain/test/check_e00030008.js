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

describe('checking E00030008 balanceSheet', function () {
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
      'twentyeighth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.cryptocurrency.breakdown.USDT.amount should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyeighth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.cryptocurrency.breakdown.USDT.fairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyeighth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.accountsReceivable.totalAmountFairValue should equal -1600', async function () {
    const value = await contractWithSigner.getValue(
      'twentyeighth_report',
      'balanceSheet',
      'assets.details.accountsReceivable.totalAmountFairValue',
    );
    expect(value).to.equal('-1600');
  });
  //
  it('assets.details.accountsReceivable.breakdown.USDT.amount should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyeighth_report',
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.USDT.amount',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.accountsReceivable.breakdown.USDT.fairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'twentyeighth_report',
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('0');
  });
  //
  it('assets.details.accountsReceivable.breakdown.ETH.amount should equal -1000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyeighth_report',
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.ETH.amount',
    );
    expect(value).to.equal('-1000000000000000000');
  });
  //
  it('assets.details.accountsReceivable.breakdown.ETH.fairValue should equal -1600000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'twentyeighth_report',
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.ETH.fairValue',
    );
    expect(value).to.equal('-1600000000000000000000');
  });
});

describe('checking E00030008 comprehensive income', function () {
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
