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

async function getvalue(reportID, reportType, reportColumn) {
  try {
    const result = await contractWithSigner.getValue(
      reportID,
      reportType,
      reportColumn,
    );
    console.log('Value:', result.toString());
  } catch (error) {
    console.error('Error:', error);
  }
}

describe('checking E00010002 balanceSheet', function () {
  it('assets.details.cryptocurrency.totalAmountFairValue should equal 160000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('160000000000000000000000');
  });

  it('assets.details.cryptocurrency.breakdown.ETH.amount should equal 100000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.ETH.amount',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('100000000000000000000');
  });

  it('assets.details.cryptocurrency.breakdown.ETH.fairValue should equal 160000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.ETH.fairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('160000000000000000000000');
  });

  it('assets.totalAmountFairValue should equal 160000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'balanceSheet',
      'assets.totalAmountFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('160000000000000000000000');
  });

  it('totalAssetsFairValue should equal 160000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'balanceSheet',
      'totalAssetsFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('160000000000000000000000');
  });

  it('liabilities.details.userDeposit.totalAmountFairValue should equal 160000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('160000000000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.ETH.amount should equal 100000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.ETH.amount',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('100000000000000000000');
  });

  it('liabilities.details.userDeposit.breakdown.ETH.fairValue should equal 160000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.ETH.fairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('160000000000000000000000');
  });

  it('liabilities.totalAmountFairValue should equal 160000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'balanceSheet',
      'liabilities.totalAmountFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('160000000000000000000000');
  });

  it('equity.details.retainedEarnings.totalAmountFairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('0');
  });

  it('equity.details.retainedEarnings.breakdown.ETH.amount should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.ETH.amount',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('0');
  });

  it('equity.details.retainedEarnings.breakdown.ETH.fairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.ETH.fairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('0');
  });

  it('equity.totalAmountFairValue should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'balanceSheet',
      'equity.totalAmountFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('0');
  });

  it('totalLiabilitiesAndEquityFairValue should equal 160000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'first_report',
      'balanceSheet',
      'totalLiabilitiesAndEquityFairValue',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('160000000000000000000000');
  });
});

describe('checking E00010002 comprehensive income', function () {
  it('income.details.depositFee.weightedAverageCost should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'comprehensiveIncome',
      'income.details.depositFee.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('0');
  });

  it('income.details.depositFee.breakdown.ETH.amount should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.ETH.amount',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('0');
  });

  it('income.details.depositFee.breakdown.ETH.weightedAverageCost should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'comprehensiveIncome',
      'income.details.depositFee.breakdown.ETH.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('0');
  });

  it('netProfit should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'comprehensiveIncome',
      'netProfit',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('0');
  });
});

describe('checking E00010002 cashFlow', function () {
  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.weightedAverageCost should equal 150000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('150000000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.ETH.amount should equal 100000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.ETH.amount',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('100000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.ETH.weightedAverageCost should equal 150000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.ETH.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('150000000000000000000000');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('0');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.amount  should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.amount',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('0');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.weightedAverageCost  should equal 0', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('0');
  });

  it('supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost  should equal 150000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'cashFlow',
      'supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('150000000000000000000000');
  });

  it('otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost  should equal 150000000000000000000000', async function () {
    const value = await contractWithSigner.getValue(
      'second_report',
      'cashFlow',
      'otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost',
    );
    const valueString = value.toString();
    expect(valueString).to.equal('150000000000000000000000');
  });
});
