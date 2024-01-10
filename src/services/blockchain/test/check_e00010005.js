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

describe('checking E00010005 balanceSheet', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  it('assets.details.cryptocurrency.totalAmountFairValue should equal -15987200000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );

    expect(value).to.equal('-15987200000000000000000');
  });

  it('assets.details.cryptocurrency.breakdown.ETH.amount should equal -9992000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.ETH.amount',
    );

    expect(value).to.equal('-9992000000000000000');
  });

  it('assets.details.cryptocurrency.breakdown.ETH.fairValue should equal -15987200000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.ETH.fairValue',
    );

    expect(value).to.equal('-15987200000000000000000');
  });

  it('assets.totalAmountFairValue should equal -15987200000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );

    expect(value).to.equal('-15987200000000000000000');
  });

  it('totalAssetsFairValue should equal -15987200000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );

    expect(value).to.equal('-15987200000000000000000');
  });

  it('liabilities.details.userDeposit.totalAmountFairValue should equal -16000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );

    expect(value).to.equal('-16000000000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.ETH.amount should equal -10000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.ETH.amount',
    );

    expect(value).to.equal('-10000000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.ETH.fairValue should equal -16000000000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.ETH.fairValue',
    );

    expect(value).to.equal('-16000000000000000000000');
  });

  it('liabilities.totalAmountFairValue should equal -16000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );

    expect(value).to.equal('-16000000000000000000000');
  });

  it('equity.details.retainedEarnings.totalAmountFairValue should equal 12800000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );

    expect(value).to.equal('12800000000000000000');
  });

  it('totalLiabilitiesAndEquityFairValue should equal 1599680000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );

    expect(value).to.equal('15996800000000000000000');
  });
});

describe('checking E00010005 comprehensive income', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  it('income.details.withdrawalFee.weightedAverageCost should equal 15000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.weightedAverageCost',
    );

    expect(value).to.equal('15000000000000000000');
  });

  it('income.details.withdrawalFee.breakdown.ETH.amount should equal 10000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.ETH.amount',
    );

    expect(value).to.equal('10000000000000000');
  });

  it('income.details.withdrawalFee.breakdown.ETH.weightedAverageCost should equal 15000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.ETH.weightedAverageCost',
    );

    expect(value).to.equal('15000000000000000000');
  });

  it('costs.details.technicalProviderFee.weightedAverageCost should equal -3000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.weightedAverageCost',
    );

    expect(value).to.equal('-3000000000000000000');
  });

  it('costs.details.technicalProviderFee.breakdown.ETH.amount should equal -2000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.ETH.amount',
    );

    expect(value).to.equal('-2000000000000000');
  });

  it('costs.details.technicalProviderFee.breakdown.ETH.fairValue should equal -3000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.ETH.fairValue',
    );

    expect(value).to.equal('-3000000000000000000');
  });

  it('costs.weightedAverageCost should equal -3000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'costs.weightedAverageCost',
    );

    expect(value).to.equal('-3000000000000000000');
  });

  it('netProfit should equal 12000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'comprehensiveIncome',
      'netProfit',
    );

    expect(value).to.equal('12000000000000000000');
  });
});

describe('checking E00010005 cashFlow', async function () {
  before(async function () {
    const [signer] = await ethers.getSigners();
    contractWithSigner = new ethers.Contract(
      routerContractAddress,
      contractABI,
      signer,
    );
  });
  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost should be -15000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost',
    );

    expect(value).to.equal('-15000000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.amount should be -10000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.amount',
    );

    expect(value).to.equal('-10000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.weightedAverageCost should be -15000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.weightedAverageCost',
    );

    expect(value).to.equal('-15000000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost should be 15000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost',
    );

    expect(value).to.equal('15000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.amount should be 10000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.amount',
    );

    expect(value).to.equal('10000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.weightedAverageCost should be 15000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.weightedAverageCost',
    );

    expect(value).to.equal('15000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost should be -3000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost',
    );

    expect(value).to.equal('-3000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.amount should be -2000000000000000 ', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.amount',
    );

    expect(value).to.equal('-2000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.weightedAverageCost should be -3000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.weightedAverageCost',
    );

    expect(value).to.equal('-3000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost should be -14988000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost',
    );
    expect(value).to.equal('-14988000000000000000000');
  });

  it('otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost should be -14988000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'fifth_report',
      'cashFlow',
      'otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost',
    );
    expect(value).to.equal('-14988000000000000000000');
  });
});
