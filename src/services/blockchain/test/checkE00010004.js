const { should } = require('chai');
const { expect } = require('chai');
const { exec } = require('child_process');
const { timeStamp } = require('console');
require('events').EventEmitter.defaultMaxListeners = 20;
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
);
const privateKey = process.env.SEPOLIA_PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);
const contractABIPath = path.resolve(__dirname, '../../routerABI.json');
const contractABI = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const routerContractAddress = process.env.ROUTER_ADDRESS;
const contractInstance = new ethers.Contract(
  routerContractAddress,
  contractABI,
  provider,
);
const router = contractInstance;
const contractWithSigner = new ethers.Contract(
  routerContractAddress,
  contractABI,
  signer,
);

describe('checking E00010004 balanceSheet', function () {
  it('assets.details.cryptocurrency.totalAmountFairValue should equal -106.901', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-106.901');
  });

  it('assets.details.cryptocurrency.breakdown.USDT.amount should equal  -99.9', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-99.9');
  });

  it('assets.details.cryptocurrency.breakdown.USDT.fairValue should equal  -98.901', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-98.901');
  });

  it('assets.details.cryptocurrency.breakdown.ETH.amount should equal  -0.005', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.ETH.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.005');
  });

  it('assets.details.cryptocurrency.breakdown.ETH.fairValue should equal  -8', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.ETH.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-8');
  });

  it('assets.totalAmountFairValue should equal -106.901', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-106.901');
  });
});

describe('checking E00010003 comprehensive income', function () {});

describe('checking E00010003 cashFlow', function () {});
