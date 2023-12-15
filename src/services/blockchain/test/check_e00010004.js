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

describe('checking E00010004 balanceSheet', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });

  it('assets.details.cryptocurrency.totalAmountFairValue should equal -106901000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );
    expect(value).to.equal('-106901000000000000000');
  });

  it('assets.details.cryptocurrency.breakdown.USDT.amount should equal  -99900000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.amount',
    );
    expect(value).to.equal('-99900000000000000000');
  });

  it('assets.details.cryptocurrency.breakdown.USDT.fairValue should equal  -98901000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('-98901000000000000000');
  });

  it('assets.details.cryptocurrency.breakdown.ETH.amount should equal  -5000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.ETH.amount',
    );
    expect(value).to.equal('-5000000000000000');
  });

  it('assets.details.cryptocurrency.breakdown.ETH.fairValue should equal  -8000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.ETH.fairValue',
    );
    expect(value).to.equal('-8000000000000000000');
  });

  it('assets.totalAmountFairValue should equal -106901000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );
    expect(value).to.equal('-106901000000000000000');
  });

  it('totalAssetsFairValue should equal -106901000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );
    expect(value).to.equal('-106901000000000000000');
  });

  it('liabilities.details.userDeposit.totalAmountFairValue should equal -99000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
    expect(value).to.equal('-99000000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.USDT.amount should equal -100000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.amount',
    );
    expect(value).to.equal('-100000000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.USDT.fairValue should equal -99000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.fairValue',
    );
    expect(value).to.equal('-99000000000000000000');
  });

  it('liabilities.totalAmountFairValue should equal -99000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );
    expect(value).to.equal('-99000000000000000000');
  });

  it('equity.details.retainedEarnings.totalAmountFairValue should equal -7901000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );
    expect(value).to.equal('-7901000000000000000');
  });

  it('equity.details.retainedEarnings.breakdown.USDT.amount  should equal 100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.amount',
    );
    expect(value).to.equal('100000000000000000');
  });

  it('equity.details.retainedEarnings.breakdown.USDT.fairValue  should equal 99000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.fairValue',
    );

    expect(value).to.equal('99000000000000000');
  });

  it('equity.details.retainedEarnings.breakdown.ETH.amount should equal 5000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.ETH.amount',
    );

    expect(value).to.equal('-5000000000000000');
  });
  it('equity.details.retainedEarnings.breakdown.ETH.fairValue should equal -8000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.ETH.fairValue',
    );

    expect(value).to.equal('-8000000000000000000');
  });

  it('equity.totalAmountFairValue  -7901000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'equity.totalAmountFairValue',
    );

    expect(value).to.equal('-7901000000000000000');
  });

  it('totalLiabilitiesAndEquityFairValue  91000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );

    expect(value).to.equal('91000000000000000000');
  });
});

describe('checking E00010004 comprehensive income', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  it('income.details.withdrawalFee.weightedAverageCost  101000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.weightedAverageCost',
    );

    expect(value).to.equal('101000000000000000');
  });

  it('income.details.withdrawalFee.breakdown.USDT.amount  100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.USDT.amount',
    );

    expect(value).to.equal('100000000000000000');
  });

  it('income.details.withdrawalFee.breakdown.USDT.weightedAverageCost  101000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.USDT.weightedAverageCost',
    );

    expect(value).to.equal('101000000000000000');
  });

  it('costs.details.technicalProviderFee.weightedAverageCost -7500000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.weightedAverageCost',
    );

    expect(value).to.equal('-7500000000000000000');
  });

  it('costs.details.technicalProviderFee.breakdown.ETH.amount -5000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.ETH.amount',
    );

    expect(value).to.equal('-5000000000000000');
  });

  it('costs.details.technicalProviderFee.breakdown.ETH.fairValue -7500000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.ETH.fairValue',
    );

    expect(value).to.equal('-7500000000000000000');
  });

  it('costs.weightedAverageCost -7500000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'costs.weightedAverageCost',
    );

    expect(value).to.equal('-7500000000000000000');
  });

  it('netProfit  -7399000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'netProfit',
    );

    expect(value).to.equal('-7399000000000000000');
  });
});

describe('checking E00010004 cashFlow', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost -101000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost',
    );

    expect(value).to.equal('-101000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.USDT.amount -100000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.USDT.amount',
    );

    expect(value).to.equal('-100000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.USDT.weightedAverageCost  -101000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.USDT.weightedAverageCost',
    );

    expect(value).to.equal('-101000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost  101000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost',
    );

    expect(value).to.equal('101000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.amount  100000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.amount',
    );

    expect(value).to.equal('100000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.weightedAverageCost  101000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.weightedAverageCost',
    );

    expect(value).to.equal('101000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost -7500000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost',
    );

    expect(value).to.equal('-7500000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.amount -5000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.amount',
    );

    expect(value).to.equal('-5000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.weightedAverageCost -7500000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.weightedAverageCost',
    );

    expect(value).to.equal('-7500000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost -108399000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost',
    );

    expect(value).to.equal('-108399000000000000000');
  });

  it('otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost -108399000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost',
    );

    expect(value).to.equal('-108399000000000000000');
  });
});
