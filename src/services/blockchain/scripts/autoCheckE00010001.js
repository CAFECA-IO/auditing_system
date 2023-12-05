const { should } = require('chai');
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

async function getValue(reportID, reportType, reportColumn) {
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

async function main() {
  try {
    describe('getValue Function Tests', function () {
      it('assets.details.cryptocurrency.totalAmountFairValue should equal 9900990000000000000000', async function () {
        const value = await contractWithSigner.getvalue(
          'first_report',
          'balanceSheet',
          'assets.details.cryptocurrency.totalAmountFairValue',
        );
        const valueString = value.toString();
        expect(valueString).to.equal('9900990000000000000000');
      });

      it('assets.details.cryptocurrency.breakdown.USDT.amount should equal 10001000000000000000000', async function () {
        const value = await contractWithSigner.getvalue(
          'first_report',
          'balanceSheet',
          'assets.details.cryptocurrency.breakdown.USDT.amount',
        );
        const valueString = value.toString();
        expect(valueString).to.equal('10001000000000000000000');
      });

      it('assets.details.cryptocurrency.breakdown.USDT.fairValue should equal 9900990000000000000000', async function () {
        const value = await contractWithSigner.getvalue(
          'first_report',
          'balanceSheet',
          'assets.details.cryptocurrency.breakdown.USDT.fairValue',
        );
        const valueString = value.toString();
        expect(valueString).to.equal('9900990000000000000000');
      });

      it('assets.totalAmountFairValue should equal 9900990000000000000000', async function () {
        const value = await contractWithSigner.getvalue(
          'first_report',
          'balanceSheet',
          'assets.totalAmountFairValue',
        );
        const valueString = value.toString();
        expect(valueString).to.equal('9900990000000000000000');
      });

      it('totalAssetsFairValue should equal 9900990000000000000000', async function () {
        const value = await contractWithSigner.getvalue(
          'first_report',
          'balanceSheet',
          'totalAssetsFairValue',
        );
        const valueString = value.toString();
        expect(valueString).to.equal('9900990000000000000000');
      });

      it('liabilities.details.userDeposit.totalAmountFairValue should equal 9890100000000000000000', async function () {
        const value = await contractWithSigner.getvalue(
          'first_report',
          'balanceSheet',
          'liabilities.details.userDeposit.totalAmountFairValue',
        );
        const valueString = value.toString();
        expect(valueString).to.equal('9890100000000000000000');
      });

      it('liabilities.details.userDeposit.breakdown.USDT.amount should equal 9900990000000000000000', async function () {
        const value = await contractWithSigner.getvalue(
          'first_report',
          'balanceSheet',
          'liabilities.details.userDeposit.breakdown.USDT.amount',
        );
        const valueString = value.toString();
        expect(valueString).to.equal('9900990000000000000000');
      });

      it('liabilities.details.userDeposit.breakdown.USDT.fairValue should equal 9890100000000000000000', async function () {
        const value = await contractWithSigner.getvalue(
          'first_report',
          'balanceSheet',
          'liabilities.details.userDeposit.breakdown.USDT.fairValue',
        );
        const valueString = value.toString();
        expect(valueString).to.equal('9890100000000000000000');
      });

      it('liabilities.totalAmountFairValue should equal 9890100000000000000000', async function () {
        const value = await contractWithSigner.getvalue(
          'first_report',
          'balanceSheet',
          'liabilities.totalAmountFairValue',
        );
        const valueString = value.toString();
        expect(valueString).to.equal('9890100000000000000000');
      });

      it('equity.details.retainedEarnings.totalAmountFairValue should equal 10890000000000000000', async function () {
        const value = await contractWithSigner.getvalue(
          'first_report',
          'balanceSheet',
          'equity.details.retainedEarnings.totalAmountFairValue',
        );
        const valueString = value.toString();
        expect(valueString).to.equal('10890000000000000000');
      });

      it('equity.details.retainedEarnings.breakdown.USDT.amount should equal 11000000000000000000', async function () {
        const value = await contractWithSigner.getvalue(
          'first_report',
          'balanceSheet',
          'equity.details.retainedEarnings.breakdown.USDT.amount',
        );
        const valueString = value.toString();
        expect(valueString).to.equal('11000000000000000000');
      });

      it('equity.details.retainedEarnings.breakdown.USDT.fairValue should equal 10890000000000000000', async function () {
        const value = await contractWithSigner.getvalue(
          'first_report',
          'balanceSheet',
          'equity.details.retainedEarnings.breakdown.USDT.fairValue',
        );
        const valueString = value.toString();
        expect(valueString).to.equal('10890000000000000000');
      });

      it('equity.totalAmountFairValue should equal 10890000000000000000', async function () {
        const value = await contractWithSigner.getvalue(
          'first_report',
          'balanceSheet',
          'equity.totalAmountFairValue',
        );
        const valueString = value.toString();
        expect(valueString).to.equal('10890000000000000000');
      });

      it('totalLiabilitiesAndEquityFairValue should equal 9900990000000000000000', async function () {
        const value = await contractWithSigner.getvalue(
          'first_report',
          'balanceSheet',
          'totalLiabilitiesAndEquityFairValue',
        );
        const valueString = value.toString();
        expect(valueString).to.equal('9900990000000000000000');
      });
    });
  } catch (error) {}
}

main();
