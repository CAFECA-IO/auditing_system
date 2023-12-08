const { should } = require('chai');
const { expect } = require('chai');
const { exec } = require('child_process');
const { timeStamp } = require('console');
require('events').EventEmitter.defaultMaxListeners = 20;
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
);
const privateKey = process.env.SEPOLIA_PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);
const contractABIPath = path.resolve(__dirname, '../../routerABI.json');
const contractABI = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const routerContractAddress = process.env.ROUTER_ADDRESS;
const contractWithSigner = new ethers.Contract(
  routerContractAddress,
  contractABI,
  signer,
);

describe('checking E00010007 balanceSheet', function () {
  it('assets.details.cashAndCashEquivalent.totalAmountFairValue should equal 10001', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('10001');
  });

  it('assets.details.cashAndCashEquivalent.breakdown.USD.amount should equal 10001', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.breakdown.USD.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('10001');
  });

  it('assets.details.cashAndCashEquivalent.breakdown.USD.fairValue should equal 10001', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.breakdown.USD.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('10001');
  });

  it('assets.totalAmountFairValue should equal 10001', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('10001');
  });

  it('totalAssetsFairValue should equal 10001', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('10001');
  });

  it('liabilities.details.userDeposit.totalAmountFairValue should equal 9990', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('9990');
  });

  it('liabilities.details.userDeposit.breakdown.USD.amount should equal 9990', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USD.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('9990');
  });

  it('liabilities.details.userDeposit.breakdown.USD.fairValue should equal 9990', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USD.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('9990');
  });

  it('liabilities.totalAmountFairValue should equal 9990', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('9990');
  });

  it('equity.details.retainedEarnings.totalAmountFairValue should equal 11', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('11');
  });

  it('equity.details.retainedEarnings.breakdown.USD.amount should equal 11', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USD.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('11');
  });

  it('equity.details.retainedEarnings.breakdown.USD.fairValue should equal 11', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USD.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('11');
  });

  it('equity.totalAmountFairValue should equal 11', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'equity.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('11');
  });

  it('totalLiabilitiesAndEquityFairValue should equal 11', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('11');
  });
});

describe('checking E00010007 comprehensive income', function () {
  it('income.details.depositFee.weightedAverageCost should equal 11', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'comprehensiveIncome',
      'income.details.depositFee.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('11');
  });

  it('income.details.depositFee.breakdown.USD.amount should equal 11', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.USD.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('11');
  });

  it('income.details.depositFee.breakdown.USD.weightedAverageCost should equal 11', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.USD.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('11');
  });

  it('netProfit should equal 11', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'comprehensiveIncome',
      'netProfit',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('11');
  });
});

describe('checking E00010007 cashFlow', function () {
  it('operatingActivities.details.cashDepositedByCustomers.weightedAverageCost should equal 9990', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'operatingActivities.details.cashDepositedByCustomers.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('9990');
  });

  it('operatingActivities.details.cashDepositedByCustomers.breakdown.USD.amount should equal 9990', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'operatingActivities.details.cashDepositedByCustomers.breakdown.USD.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('9990');
  });

  it('operatingActivities.details.cashDepositedByCustomers.breakdown.USD.weightedAverageCost should equal 9990', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'operatingActivities.details.cashDepositedByCustomers.breakdown.USD.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('9990');
  });

  it('operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.weightedAverageCost should equal 11', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('11');
  });

  it('operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.amount should equal 11', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('11');
  });

  it('operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.weightedAverageCost should equal 11', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('11');
  });

  it('operatingActivities.weightedAverageCost should equal 10001', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'operatingActivities.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('10001');
  });

  it('otherSupplementaryItems.details.relatedToCash.cashCashEquivalentsAndRestrictedCashEndOfPeriod.weightedAverageCost should equal 10001', async function () {
    const value = await contractWithSigner.getValue(
      'seventh_report',
      'cashFlow',
      'otherSupplementaryItems.details.relatedToCash.cashCashEquivalentsAndRestrictedCashEndOfPeriod.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('10001');
  });
});
