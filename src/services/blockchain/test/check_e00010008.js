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

describe('checking E00010008 balanceSheet', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  it('assets.details.cashAndCashEquivalent.totalAmountFairValue should equal -99905000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.totalAmountFairValue',
    );

    expect(value).to.equal('-99905000000000000000');
  });

  it('assets.details.cashAndCashEquivalent.breakdown.USD.amount should equal -99905000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.breakdown.USD.amount',
    );

    expect(value).to.equal('-99905000000000000000');
  });

  it('assets.details.cashAndCashEquivalent.breakdown.USD.fairValue should equal -99905000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.breakdown.USD.fairValue',
    );

    expect(value).to.equal('-99905000000000000000');
  });

  it('assets.totalAmountFairValue should equal -99905000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );

    expect(value).to.equal('-99905000000000000000');
  });

  it('totalAssetsFairValue should equal -99905000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );

    expect(value).to.equal('-99905000000000000000');
  });

  it('liabilities.details.userDeposit.totalAmountFairValue should equal -100000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );

    expect(value).to.equal('-100000000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.USD.amount should equal -100000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USD.amount',
    );

    expect(value).to.equal('-100000000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.USD.fairValue should equal -100000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USD.fairValue',
    );

    expect(value).to.equal('-100000000000000000000');
  });

  it('liabilities.totalAmountFairValue should equal -100000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );

    expect(value).to.equal('-100000000000000000000');
  });

  it('equity.details.retainedEarnings.totalAmountFairValue should equal 95000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );

    expect(value).to.equal('95000000000000000');
  });

  it('equity.details.retainedEarnings.breakdown.USD.amount should equal 95000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USD.amount',
    );

    expect(value).to.equal('95000000000000000');
  });

  it('equity.details.retainedEarnings.breakdown.USD.fairValue should equal 95000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USD.fairValue',
    );

    expect(value).to.equal('95000000000000000');
  });

  it('equity.totalAmountFairValue should equal 95000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'equity.totalAmountFairValue',
    );

    expect(value).to.equal('95000000000000000');
  });

  it('totalLiabilitiesAndEquityFairValue should equal  -99905000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );

    expect(value).to.equal('-99905000000000000000');
  });
});

describe('checking E00010008 comprehensive income', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  it('income.details.withdrawalFee.weightedAverageCost should equal 100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.weightedAverageCost',
    );

    expect(value).to.equal('100000000000000000');
  });

  it('income.details.withdrawalFee.breakdown.USD.amount should equal 100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.USD.amount',
    );

    expect(value).to.equal('100000000000000000');
  });

  it('income.details.withdrawalFee.breakdown.USD.weightedAverageCost should equal 100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.USD.weightedAverageCost',
    );

    expect(value).to.equal('100000000000000000');
  });

  it('costs.details.technicalProviderFee.weightedAverageCost should equal -5000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.weightedAverageCost',
    );

    expect(value).to.equal('-5000000000000000');
  });

  it('costs.details.technicalProviderFee.breakdown.USD.amount  should equal -5000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.USD.amount',
    );

    expect(value).to.equal('-5000000000000000');
  });

  it('costs.details.technicalProviderFee.breakdown.USD.fairValue  should equal -5000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.USD.fairValue',
    );

    expect(value).to.equal('-5000000000000000');
  });

  it(' costs.weightedAverageCost  should equal -5000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehensiveIncome',
      'costs.weightedAverageCost',
    );

    expect(value).to.equal('-5000000000000000');
  });

  it('netProfit  should equal 95000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehensiveIncome',
      'netProfit',
    );
    expect(value).to.equal('95000000000000000');
  });
});

describe('checking E00010008 cashFlow', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  it('operatingActivities.details.cashWithdrawnByCustomers.weightedAverageCost should equal -100000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'cashFlow',
      'operatingActivities.details.cashWithdrawnByCustomers.weightedAverageCost',
    );
    expect(value).to.equal('-100000000000000000000');
  });

  it('operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.amount should equal -100000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'cashFlow',
      'operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.amount',
    );
    expect(value).to.equal('-100000000000000000000');
  });

  it('operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.weightedAverageCost should equal -100000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'cashFlow',
      'operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.weightedAverageCost',
    );
    expect(value).to.equal('-100000000000000000000');
  });

  it('operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.weightedAverageCost should equal 100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.weightedAverageCost',
    );
    expect(value).to.equal('100000000000000000');
  });

  it('operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.breakdown.USD.amount should equal 100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.breakdown.USD.amount',
    );
    expect(value).to.equal('100000000000000000');
  });

  it('operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.breakdown.USD.weightedAverageCost should equal 100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'cashFlow',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.breakdown.USD.weightedAverageCost',
    );
    expect(value).to.equal('100000000000000000');
  });

  it('operatingActivities.details.cashPaidToSuppliersForExpenses.weightedAverageCost should equal -5000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'cashFlow',
      'operatingActivities.details.cashPaidToSuppliersForExpenses.weightedAverageCost',
    );
    expect(value).to.equal('-5000000000000000');
  });

  it('operatingActivities.details.cashPaidToSuppliersForExpenses.breakdowm.USD.amount should equal -5000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'cashFlow',
      'operatingActivities.details.cashPaidToSuppliersForExpenses.breakdowm.USD.amount',
    );
    expect(value).to.equal('-5000000000000000');
  });

  it('operatingActivities.details.cashPaidToSuppliersForExpenses.breakdowm.USD.weightedAverageCost should equal -5000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'cashFlow',
      'operatingActivities.details.cashPaidToSuppliersForExpenses.breakdowm.USD.weightedAverageCost',
    );
    expect(value).to.equal('-5000000000000000');
  });

  it('operatingActivities.weightedAverageCost should equal -99905000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'cashFlow',
      'operatingActivities.weightedAverageCost',
    );
    expect(value).to.equal('-99905000000000000000');
  });

  it('otherSupplementaryItems.details.relatedToCash.cashCashEquivalentsAndRestrictedCashEndOfPeriod.weightedAverageCost should equal -99905000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'cashFlow',
      'otherSupplementaryItems.details.relatedToCash.cashCashEquivalentsAndRestrictedCashEndOfPeriod.weightedAverageCost',
    );
    expect(value).to.equal('-99905000000000000000');
  });
});
