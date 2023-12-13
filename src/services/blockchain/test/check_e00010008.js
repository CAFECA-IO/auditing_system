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

describe('checking E00010008 balanceSheet', function () {
  it('assets.details.cashAndCashEquivalent.totalAmountFairValue should equal -99.95', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-99.95');
  });

  it('assets.details.cashAndCashEquivalent.breakdown.USD.amount should equal -99.95', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.breakdown.USD.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-99.95');
  });

  it('assets.details.cashAndCashEquivalent.breakdown.USD.fairValue should equal -99.95', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.breakdown.USD.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-99.95');
  });

  it('assets.totalAmountFairValue should equal -99.95', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-99.95');
  });

  it('totalAssetsFairValue should equal -99.95', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-99.95');
  });

  it('liabilities.details.userDeposit.totalAmountFairValue should equal -100', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-100');
  });

  it('liabilities.details.userDeposit.breakdown.USD.amount should equal -100', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USD.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-100');
  });

  it('liabilities.details.userDeposit.breakdown.USD.fairValue should equal -100', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USD.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-100');
  });

  it('liabilities.totalAmountFairValue should equal -100', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-100');
  });

  it('equity.details.retainedEarnings.totalAmountFairValue should equal 0.095 ', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.095');
  });

  it('equity.details.retainedEarnings.breakdown.USD.amount should equal 0.095 ', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USD.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.095');
  });

  it('equity.details.retainedEarnings.breakdown.USD.fairValue should equal 0.095 ', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USD.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.095');
  });

  it('equity.totalAmountFairValue should equal 0.095 ', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'equity.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.095');
  });

  it('totalLiabilitiesAndEquityFairValue should equal  -99.95', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-99.95');
  });
});

describe('checking E00010008 comprehensive income', function () {
  it('income.details.withdrawalFee.weightedAverageCost should equal 0.1', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'income.details.withdrawalFee.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.1');
  });

  it('income.details.withdrawalFee.breakdown.USD.amount should equal 0.1', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'income.details.withdrawalFee.breakdown.USD.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.1');
  });

  it('income.details.withdrawalFee.breakdown.USD.weightedAverageCost should equal 0.1', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'income.details.withdrawalFee.breakdown.USD.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.1');
  });

  it('costs.details.technicalProviderFee.weightedAverageCost should equal -0.005', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'costs.details.technicalProviderFee.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.005');
  });

  it('costs.details.technicalProviderFee.breakdown.USD.amount  should equal -0.005', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'costs.details.technicalProviderFee.breakdown.USD.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.005');
  });

  it('costs.details.technicalProviderFee.breakdown.USD.fairValue  should equal -0.005', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'costs.details.technicalProviderFee.breakdown.USD.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.005');
  });

  it(' costs.weightedAverageCost  should equal -0.005', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'costs.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.005');
  });

  it(' costs.netProfit  should equal 0.095', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'costs.netProfit',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.095');
  });
});

describe('checking E00010008 cashFlow', function () {
  it('operatingActivities.details.cashWithdrawnByCustomers.weightedAverageCost should equal -100', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'operatingActivities.details.cashWithdrawnByCustomers.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-100');
  });

  it('operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.amount should equal -100', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-100');
  });

  it('operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.weightedAverageCost should equal -100', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-100');
  });

  it('operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.weightedAverageCost should equal 0.1', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.1');
  });

  it('operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.breakdown.USD.amount should equal 0.1', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.breakdown.USD.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.1');
  });

  it('operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.breakdown.USD.weightedAverageCost should equal 0.1', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.breakdown.USD.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.1');
  });

  it('operatingActivities.details.cashPaidToSuppliersForExpenses.weightedAverageCost should equal -0.005', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'operatingActivities.details.cashPaidToSuppliersForExpenses.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.005');
  });

  it('operatingActivities.details.cashPaidToSuppliersForExpenses.breakdowm.USD.amount should equal -0.005', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'operatingActivities.details.cashPaidToSuppliersForExpenses.breakdowm.USD.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.005');
  });

  it('operatingActivities.details.cashPaidToSuppliersForExpenses.breakdowm.USD.weightedAverageCost should equal -0.005', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'operatingActivities.details.cashPaidToSuppliersForExpenses.breakdowm.USD.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.005');
  });

  it('operatingActivities.weightedAverageCost should equal -99.95', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'operatingActivities.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-99.95');
  });

  it('otherSupplementaryItems.details.relatedToCash.cashCashEquivalentsAndRestrictedCashEndOfPeriod.weightedAverageCost should equal -99.95', async function () {
    const value = await contractWithSigner.getValue(
      'eighth_report',
      'comprehesiveIncome',
      'otherSupplementaryItems.details.relatedToCash.cashCashEquivalentsAndRestrictedCashEndOfPeriod.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-99.95');
  });
});
