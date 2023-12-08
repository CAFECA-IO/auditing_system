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
      'assets.details.cryptocurrency.breakdown.ETH.fairValue',
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

  it('totalAssetsFairValue should equal -106.901', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-106.901');
  });

  it('liabilities.details.userDeposit.totalAmountFairValue should equal -99', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-99');
  });

  it('liabilities.details.userDeposit.breakdown.USDT.amount should equal -100', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-100');
  });

  it('liabilities.details.userDeposit.breakdown.USDT.fairValue should equal -99', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-99');
  });

  it('liabilities.totalAmountFairValue should equal -99', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-99');
  });

  it('equity.details.retainedEarnings.totalAmountFairValue should equal -7.901', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-7.901');
  });

  it('equity.details.retainedEarnings.breakdown.USDT.amount  should equal 0.1', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.1');
  });

  it('equity.details.retainedEarnings.breakdown.USDT.fairValue  should equal 0.099', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.099');
  });

  it('equity.details.retainedEarnings.breakdown.ETH.amount should equal ', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.ETH.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.005');
  });
  it('equity.details.retainedEarnings.breakdown.ETH.fairValue should equal -8', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.ETH.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-8');
  });

  it('equity.totalAmountFairValue  -7.901', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'equity.totalAmountFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-7.901');
  });

  it('totalLiabilitiesAndEquityFairValue  91', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('91');
  });
});

describe('checking E00010004 comprehensive income', function () {
  it('income.details.withdrawalFee.weightedAverageCost  0.101', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.101');
  });

  it('income.details.withdrawalFee.breakdown.USDT.amount  0.1', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.USDT.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.1');
  });

  it('income.details.withdrawalFee.breakdown.USDT.weightedAverageCost  0.101', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'income.details.withdrawalFee.breakdown.USDT.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.101');
  });

  it('costs.details.technicalProviderFee.weightedAverageCost -7.5', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-7.5');
  });

  it('costs.details.technicalProviderFee.breakdown.ETH.amount -0.005', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.ETH.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.005');
  });

  it('costs.details.technicalProviderFee.breakdown.ETH.fairValue -7.5', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'costs.details.technicalProviderFee.breakdown.ETH.fairValue',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-7.5');
  });

  it('costs.weightedAverageCost -7.5', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'costs.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-7.5');
  });

  it('netProfit  -7.399', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'comprehensiveIncome',
      'netProfit',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-7.399');
  });
});

describe('checking E00010004 cashFlow', function () {
  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost -101', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-101');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.USDT.amount -100', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.USDT.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-100');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.USDT.weightedAverageCost  -101', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.USDT.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-101');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost  0.101', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.101');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.amount  0.1', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.1');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.weightedAverageCost  0.101', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('0.101');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost -7.5 ', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-7.5');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.amount -0.005', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.amount',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-0.005');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.weightedAverageCost -7.5 ', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-7.5');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost -108.399', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-108.399');
  });

  it('otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost -108.399', async function () {
    const value = await contractWithSigner.getValue(
      'forth_report',
      'cashFlow',
      'otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost',
    );
    const valueString = (value / 10 ** 18).toString();
    expect(valueString).to.equal('-108.399');
  });
});
