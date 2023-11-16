const { timeStamp } = require('console');
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
);
const contractABIPath = path.resolve(__dirname, '../../auditingABI.json');
const contractABI = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const reportContractAddress = process.env.REPORT_CONTRACT_ADDRESS;

const contractInstance = new ethers.Contract(
  reportContractAddress,
  contractABI,
  provider,
);
const reports = contractInstance;

const reportID = process.env.REPORT_ID;
const regulated_digits = 1;

async function getContractValue(reportID, reportType, reportColumn) {
  try {
    const value = await reports.getValue(reportID, reportType, reportColumn);
    const formattedValue = ethers.utils.formatUnits(value, 18);
    return formattedValue;
  } catch (error) {
    console.error(error);
  }
}

async function fetchData() {
  /*A001*/ const assets_details_cryptocurrency_totalAmountFairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'assets.details.cryptocurrency.totalAmountFairValue',
    );
  /*A002*/ const assets_details_cryptocurrency_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.amount',
    );
  /*A003*/ const assets_details_cryptocurrency_breakdown_USDT_fairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.USDT.fairValue',
    );
  /*A004*/ const assets_totalAmountFairValue = await getContractValue(
    reportID,
    'balanceSheet',
    'assets.totalAmountFairValue',
  );
  /*A005*/ const totalAssetsFairValue = await getContractValue(
    reportID,
    'balanceSheet',
    'totalAssetsFairValue',
  );
  /*A006*/ const liabilities_details_userDeposit_totalAmountFairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'liabilities.details.userDeposit.totalAmountFairValue',
    );
  /*A007*/ const liabilities_details_userDeposit_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.amount',
    );
  /*A008*/ const liabilities_details_userDeposit_breakdown_USDT_fairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USDT.fairValue',
    );
  /*A009*/ const liabilities_totalAmountFairValue = await getContractValue(
    reportID,
    'balanceSheet',
    'liabilities.totalAmountFairValue',
  );
  /*A010*/ const equity_details_retainedEarnings_totalAmountFairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'equity.details.retainedEarnings.totalAmountFairValue',
    );
  /*A011*/ const equity_details_retainedEarnings_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.amount',
    );
  /*A012*/ const equity_details_retainedEarnings_breakdown_USDT_fairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USDT.fairValue',
    );
  /*A013*/ const equity_totalAmountFairValue = await getContractValue(
    reportID,
    'balanceSheet',
    'equity.totalAmountFairValue',
  );
  /*A014*/ const totalLiabilitiesAndEquityFairValue = await getContractValue(
    reportID,
    'balanceSheet',
    'totalLiabilitiesAndEquityFairValue',
  );
  /*A015*/ const assets_details_cryptocurrency_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.ETH.amount',
    );
  /*A016*/ const assets_details_cryptocurrency_breakdown_ETH_fairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.ETH.fairValue',
    );
  /*A017*/ const equity_details_retainedEarnings_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.ETH.amount',
    );
  /*A018*/ const equity_details_retainedEarnings_breakdown_ETH_fairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.ETH.fairValue',
    );
  /*A019*/ const assets_details_cashAndCashEquivalent_totalAmountFairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.totalAmountFairValue',
    );
  /*A020*/ const assets_details_accountsReceivable_totalAmountFairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'assets.details.accountsReceivable.totalAmountFairValue',
    );

  /*A022*/ const capital_details_retainedEarnings_totalAmountFairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'capital.details.retainedEarnings.totalAmountFairValue',
    );

  /*A025*/ const assets_details_accountsReceivable_breakdown_USDT_amount =
    await getContractValue(
      reportID,
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.USDT.amount',
    );
  /*A026*/ const assets_details_accountsReceivable_breakdown_USDT_fairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'assets.details.accountsReceivable.breakdown.USDT.fairValue',
    );
  /*A027*/ const assets_details_accountsReceivable_breakdown_BTC_amount =
    await getContractValue(
      'assets.details.accountsReceivable.breakdown.BTC.amount',
    );
  /*A028*/ const assets_details_accountsReceivable_breakdown_BTC_fairValue =
    await getContractValue(
      'assets.details.accountsReceivable.breakdown.BTC.fairValue',
    );
  /*A029*/ const assets_details_accountsReceivable_breakdown_ETH_amount =
    await getContractValue(
      'assets.details.accountsReceivable.breakdown.ETH.amount',
    );
  /*A030*/ const assets_details_accountsReceivable_breakdown_ETH_fairValue =
    await getContractValue(
      'assets.details.accountsReceivable.breakdown.ETH.fairValue',
    );
  /*A031*/ const liabilities_details_accountsPayable_totalAmountFairValue =
    getContractValue(
      'liabilities.details.accountsPayable.totalAmountFairValue',
    );
  /*A032*/ const liabilities_details_accountsPayable_breakdown_USD_amount =
    getContractValue(
      ' liabilities.details.accountsPayable.breakdown.USD.amount',
    );
  /*A033*/ const liabilities_details_accountsPayable_breakdown_USD_fairValue =
    getContractValue(
      'liabilities.details.accountsPayable.breakdown.USD.fairValue',
    );
  /*A034*/ const liabilities_details_accountsPayable_breakdown_USDT_amount =
    getContractValue(
      'liabilities.details.accountsPayable.breakdown.USDT.amount',
    );
  /*A035*/ const liabilities_details_accountsPayable_breakdown_USDT_fairValue =
    getContractValue(
      'liabilities.details.accountsPayable.breakdown.USDT.fairValue',
    );
  /*A036*/ const liabilities_details_accountsPayable_breakdown_BTC_amount =
    getContractValue(
      'liabilities.details.accountsPayable.breakdown.BTC.amount',
    );
  /*A037*/ const liabilities_details_accountsPayable_breakdown_BTC_fairValue =
    getContractValue(
      'liabilities.details.accountsPayable.breakdown.BTC.fairValue',
    );
  /*A038*/ const liabilities_details_accountsPayable_breakdown_ETH_amount =
    getContractValue(
      'liabilities.details.accountsPayable.breakdown.ETH.amount',
    );
  /*A039*/ const liabilities_details_accountsPayable_breakdown_ETH_fairValue =
    getContractValue(
      'liabilities.details.accountsPayable.breakdown.ETH.fairValue',
    );
  /*A040*/ const liabilities_details_userDeposit_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USD.amount',
    );
  /*A041*/ const liabilities_details_userDeposit_breakdown_USD_fairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.USD.fairValue',
    );
  /*A042*/ const liabilities_details_userDeposit_breakdown_ETH_amount =
    await getContractValue(
      reportID,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.ETH.amount',
    );
  /*A043*/ const liabilities_details_userDeposit_breakdown_ETH_fairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.ETH.fairValue',
    );
  /*A044*/ const liabilities_details_userDeposit_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.BTC.amount',
    );
  /*A045*/ const liabilities_details_userDeposit_breakdown_BTC_airValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'liabilities.details.userDeposit.breakdown.BTC.fairValue',
    );
  /*A046*/ const assets_details_cryptocurrency_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.BTC.amount',
    );
  /*A047*/ const assets_details_cryptocurrency_breakdown_BTC_fairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'assets.details.cryptocurrency.breakdown.BTC.fairValue',
    );
  /*A048*/ const equity_details_retainedEarnings_breakdown_BTC_amount =
    await getContractValue(
      reportID,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.BTC.amount',
    );
  /*A049*/ const equity_details_retainedEarnings_breakdown_BTC_fiarValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.BTC.fairValue',
    );
  /*A050*/ const equity_details_retainedEarnings_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USD.amount',
    );
  /*A051*/ const equity_details_retainedEarnings_breakdown_USD_fairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'equity.details.retainedEarnings.breakdown.USD.fairValue',
    );

  /*?*/ const assets_details_cashAndCashEquivalent_breakdown_USD_amount =
    await getContractValue(
      reportID,
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.breakdown.USD.amount',
    );
  /*?*/ const assets_details_cashAndCashEquivalent_breakdown_USD_fairValue =
    await getContractValue(
      reportID,
      'balanceSheet',
      'assets.details.cashAndCashEquivalent.breakdown.USD.fairValue',
    );

  const data = {
    success: true,
    code: '00000000',
    reason: 'ERROR_MESSAGE.SUCCESS',
    data: {
      id: reportID,
      date: Date.now(),
      totalAssetsFairValue: totalAssetsFairValue,
      totalLiabilitiesAndEquityFairValue: totalLiabilitiesAndEquityFairValue,
      assets: {
        totalAmountFairValue: assets_totalAmountFairValue,
        details: {
          accountsReceivable: {
            totalAmountFairValue:
              assets_details_accountsReceivable_totalAmountFairValue,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: assets_details_accountsReceivable_breakdown_ETH_amount,
                fairValue:
                  assets_details_accountsReceivable_breakdown_ETH_fairValue,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: assets_details_accountsReceivable_breakdown_BTC_amount,
                fairValue:
                  assets_details_accountsReceivable_breakdown_BTC_fairValue,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount: assets_details_accountsReceivable_breakdown_USDT_amount,
                fairValue:
                  assets_details_accountsReceivable_breakdown_USDT_fairValue,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount: 0,
                fairValue: 0,
              },
            },
          },
          cryptocurrency: {
            totalAmountFairValue:
              assets_details_cryptocurrency_totalAmountFairValue,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: assets_details_cryptocurrency_breakdown_ETH_amount,
                fairValue:
                  assets_details_cryptocurrency_breakdown_ETH_fairValue,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: assets_details_cryptocurrency_breakdown_BTC_amount,
                fairValue:
                  assets_details_cryptocurrency_breakdown_BTC_fairValue,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount: assets_details_cryptocurrency_breakdown_USDT_amount,
                fairValue:
                  assets_details_cryptocurrency_breakdown_USDT_fairValue,
              },
            },
          },
          cashAndCashEquivalent: {
            totalAmountFairValue:
              assets_details_cashAndCashEquivalent_totalAmountFairValue,
            breakdown: {
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount:
                  assets_details_cashAndCashEquivalent_breakdown_USD_amount,
                fairValue:
                  assets_details_cashAndCashEquivalent_breakdown_USD_fairValue,
              },
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: '0',
                fairValue: '0',
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: '0',
                fairValue: '0',
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount: '0',
                fairValue: '0',
              },
            },
          },
        },
      },
      nonAssets: {
        totalAmountFairValue: 0,
        details: {
          accountsReceivable: {
            totalAmountFairValue: '0',
            breakdown: {},
          },
          cashAndCashEquivalent: {
            totalAmountFairValue: '0',
            breakdown: {},
          },
        },
      },
      liabilities: {
        totalAmountFairValue: liabilities_totalAmountFairValue,
        details: {
          accountsPayable: {
            totalAmountFairValue:
              liabilities_details_accountsPayable_totalAmountFairValue,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount:
                  liabilities_details_accountsPayable_breakdown_ETH_amount,
                fairValue:
                  liabilities_details_accountsPayable_breakdown_ETH_fairValue,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount:
                  liabilities_details_accountsPayable_breakdown_BTC_amount,
                fairValue:
                  liabilities_details_accountsPayable_breakdown_BTC_fairValue,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount:
                  liabilities_details_accountsPayable_breakdown_USDT_amount,
                fairValue:
                  liabilities_details_accountsPayable_breakdown_USDT_fairValue,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount:
                  liabilities_details_accountsPayable_breakdown_USD_amount,
                fairValue:
                  liabilities_details_accountsPayable_breakdown_USD_fairValue,
              },
            },
          },
          userDeposit: {
            totalAmountFairValue:
              liabilities_details_userDeposit_totalAmountFairValue,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: liabilities_details_userDeposit_breakdown_ETH_amount,
                fairValue:
                  liabilities_details_userDeposit_breakdown_ETH_fairValue,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: liabilities_details_userDeposit_breakdown_BTC_amount,
                fairValue:
                  liabilities_details_userDeposit_breakdown_BTC_airValue,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount: liabilities_details_userDeposit_breakdown_USDT_amount,
                fairValue:
                  liabilities_details_userDeposit_breakdown_USDT_fairValue,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount: liabilities_details_userDeposit_breakdown_USD_amount,
                fairValue:
                  liabilities_details_userDeposit_breakdown_USD_fairValue,
              },
            },
          },
        },
      },
      equity: {
        totalAmountFairValue: equity_totalAmountFairValue,
        details: {
          retainedEarnings: {
            totalAmountFairValue:
              equity_details_retainedEarnings_totalAmountFairValue,
            breakdown: {
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: equity_details_retainedEarnings_breakdown_ETH_amount,
                fairValue:
                  equity_details_retainedEarnings_breakdown_ETH_fairValue,
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: equity_details_retainedEarnings_breakdown_BTC_amount,
                fairValue:
                  equity_details_retainedEarnings_breakdown_BTC_fiarValue,
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount: equity_details_retainedEarnings_breakdown_USDT_amount,
                fairValue:
                  equity_details_retainedEarnings_breakdown_USDT_fairValue,
              },
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount: equity_details_retainedEarnings_breakdown_USD_amount,
                fairValue:
                  equity_details_retainedEarnings_breakdown_USD_fairValue,
              },
            },
          },
          capital: {
            totalAmountFairValue: '0',
            breakdown: {
              USD: {
                currencyType: 'FIAT',
                name: 'USD',
                amount: '0',
                fairValue: '0',
              },
              ETH: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'ETH',
                amount: '0',
                fairValue: '0',
              },
              BTC: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'BTC',
                amount: '0',
                fairValue: '0',
              },
              USDT: {
                currencyType: 'CRYPTOCURRENCY',
                name: 'USDT',
                amount: '0',
                fairValue: '0',
              },
            },
          },
        },
      },
    },
  };

  //

  console.log(JSON.stringify(data, null, 2));
}

fetchData();
