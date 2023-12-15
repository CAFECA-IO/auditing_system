import { get } from 'http';
import { report } from 'process';

const { timeStamp } = require('console');
require('events').EventEmitter.defaultMaxListeners = 15;
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
);
const contractABIPath = path.resolve(
  __dirname,
  '/Users/yong/SmartContracts/Auditing_system/auditing_system_11_29/src/services/routerABI.json',
);
const contractABI = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const routerContractAddress = process.env.ROUTER_ADDRESS;
console.log('routerContractAddress', routerContractAddress);
const contractInstance = new ethers.Contract(
  routerContractAddress,
  contractABI,
  provider,
);
const reports = contractInstance;
const reportID = process.env.REPORT_ID;

async function getContractValue(reportID, reportType, reportColumn) {
  try {
    const value = await reports.getValue(reportID, reportType, reportColumn);

    formattedValue = ethers.utils.formatUnits(value, 18);

    return formattedValue;
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
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

    /*A022*/

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
    /*A052*/ const equity_details_otherCapitalReserve_fairValue =
      await getContractValue(
        reportID,
        'balanceSheet',
        'equity.details.otherCapitalReserve.fairValue',
      );
    /*A053*/ const equity_details_otherCapitalReserve_breakdown_USD_amount =
      await getContractValue(
        reportID,
        'balanceSheet',
        'equity.details.otherCapitalReserve.breakdown.USD.amount',
      );
    /*A054*/ const equity_details_otherCapitalReserve_breakdown_USD_fairValue =
      await getContractValue(
        reportID,
        'balanceSheet',
        'equity.details.otherCapitalReserve.breakdown.USD.fairValue',
      );
    /*A055*/ const equity_details_otherCapitalReserve_breakdown_USDT_amount =
      await getContractValue(
        reportID,
        'balanceSheet',
        'equity.details.otherCapitalReserve.breakdown.USDT.amount',
      );
    /*A056*/ const equity_details_otherCapitalReserve_breakdown_USDT_fairValue =
      await getContractValue(
        reportID,
        'balanceSheet',
        'equity.details.otherCapitalReserve.breakdown.USDT.fairValue',
      );
    /*A057*/ const equity_details_otherCapitalReserve_breakdown_ETH_amount =
      await getContractValue(
        reportID,
        'balanceSheet',
        'equity.details.otherCapitalReserve.breakdown.ETH.amount',
      );
    /*A058*/ const equity_details_otherCapitalReserve_breakdown_ETH_fairValue =
      await getContractValue(
        reportID,
        'balanceSheet',
        'equity.details.otherCapitalReserve.breakdown.ETH.fairValue',
      );
    /*A059*/ const equity_details_otherCapitalReserve_breakdown_BTC_amount =
      await getContractValue(
        reportID,
        'balanceSheet',
        'equity.details.otherCapitalReserve.breakdown.BTC.amount',
      );
    /*A060*/ const equity_details_otherCapitalReserve_breakdown_BTC_fairValue =
      await getContractValue(
        reportID,
        'balanceSheet',
        'equity.details.otherCapitalReserve.breakdown.BTC.fairValue',
      );
    /*A061*/ const assets_details_cashAndCashEquivalent_breakdown_USD_amount =
      await getContractValue(
        reportID,
        'balanceSheet',
        'assets.details.cashAndCashEquivalent.breakdown.USD.amount',
      );
    /*A062*/ const assets_details_cashAndCashEquivalent_breakdown_USD_fairValue =
      await getContractValue(
        reportID,
        'balanceSheet',
        'assets.details.cashAndCashEquivalent.breakdown.USD.fairValue',
      );
    /*startTime*/ const startTime = await getContractValue(
      reportID,
      'time',
      'startTime',
    );
    /*endTime*/ const endTime = await getContractValue(
      reportID,
      'time',
      'endTime',
    );

    const data = {
      id: reportID,
      reportStartTime: startTime,
      reportEndTime: endTime,
      totalAssetsFairValue: totalAssetsFairValue, //A005
      totalLiabilitiesAndEquityFairValue: totalLiabilitiesAndEquityFairValue, //A014
      assets: {
        totalAmountFairValue: assets_totalAmountFairValue, //A004
        details: {
          cryptocurrency: {
            totalAmountFairValue:
              assets_details_cryptocurrency_totalAmountFairValue, //A001
            breakdown: {
              USDT: {
                amount: assets_details_cryptocurrency_breakdown_USDT_amount, //A002
                fairValue:
                  assets_details_cryptocurrency_breakdown_USDT_fairValue, //A003
              },
              ETH: {
                amount: assets_details_cryptocurrency_breakdown_ETH_amount, //A015
                fairValue:
                  assets_details_cryptocurrency_breakdown_ETH_fairValue, //A016
              },
              BTC: {
                amount: assets_details_cryptocurrency_breakdown_BTC_amount, //A046
                fairValue:
                  assets_details_cryptocurrency_breakdown_BTC_fairValue, //A047
              },
            },
          },
          cashAndCashEquivalent: {
            totalAmountFairValue:
              assets_details_cashAndCashEquivalent_totalAmountFairValue, //A019
            breakdown: {
              USD: {
                amount:
                  assets_details_cashAndCashEquivalent_breakdown_USD_amount, //A061
                fairValue:
                  assets_details_cashAndCashEquivalent_breakdown_USD_fairValue, //A062
              },
            },
          },
          accountsReceivable: {
            totalAmountFairValue:
              assets_details_accountsReceivable_totalAmountFairValue, //A020
            breakdown: {
              USDT: {
                amount: assets_details_accountsReceivable_breakdown_USDT_amount, //A025
                fairValue:
                  assets_details_accountsReceivable_breakdown_USDT_fairValue, //A026
              },
              BTC: {
                amount: assets_details_accountsReceivable_breakdown_BTC_amount, //A027
                fairValue:
                  assets_details_accountsReceivable_breakdown_BTC_fairValue, //A028
              },
              ETH: {
                amount: assets_details_accountsReceivable_breakdown_ETH_amount, //A029
                fairValue:
                  assets_details_accountsReceivable_breakdown_ETH_fairValue, //A030
              },
            },
          },
        },
      },
      liabilities: {
        totalAmountFairValue: liabilities_totalAmountFairValue, //A009
        details: {
          userDeposit: {
            totalAmountFairValue:
              liabilities_details_userDeposit_totalAmountFairValue, //A006
            breakdown: {
              USDT: {
                amount: liabilities_details_userDeposit_breakdown_USDT_amount, //A007
                fairValue:
                  liabilities_details_userDeposit_breakdown_USDT_fairValue, //A008
              },
              USD: {
                amount: liabilities_details_userDeposit_breakdown_USD_amount, //A040
                fairValue:
                  liabilities_details_userDeposit_breakdown_USD_fairValue, //A041
              },
              ETH: {
                amount: liabilities_details_userDeposit_breakdown_ETH_amount, //A042
                fairValue:
                  liabilities_details_userDeposit_breakdown_ETH_fairValue, //A043
              },
              BTC: {
                amount: liabilities_details_userDeposit_breakdown_BTC_amount, //A044
                fairValue:
                  liabilities_details_userDeposit_breakdown_BTC_airValue, //A045
              },
            },
          },
          accountsPayable: {
            totalAmountFairValue:
              liabilities_details_accountsPayable_totalAmountFairValue, //A021
            breakdown: {
              USDT: {
                amount:
                  liabilities_details_accountsPayable_breakdown_USDT_amount, //A034
                fairValue:
                  liabilities_details_accountsPayable_breakdown_USDT_fairValue, //A035
              },
              USD: {
                amount:
                  liabilities_details_accountsPayable_breakdown_USD_amount, //A032
                fairValue:
                  liabilities_details_accountsPayable_breakdown_USD_fairValue, //A033
              },
              BTC: {
                amount:
                  liabilities_details_accountsPayable_breakdown_BTC_amount, //A036
                fairValue:
                  liabilities_details_accountsPayable_breakdown_BTC_fairValue, //A037
              },
              ETH: {
                amount:
                  liabilities_details_accountsPayable_breakdown_ETH_amount, //A038
                fairValue:
                  liabilities_details_accountsPayable_breakdown_ETH_fairValue, //A039
              },
            },
          },
        },
      },
      equity: {
        totalAmountFairValue: equity_totalAmountFairValue, //A013
        details: {
          retainedEarning: {
            totalAmountFairValue:
              equity_details_retainedEarnings_totalAmountFairValue, //A010
            breakdown: {
              USDT: {
                amount: equity_details_retainedEarnings_breakdown_USDT_amount, //A011
                fairValue:
                  equity_details_retainedEarnings_breakdown_USDT_fairValue, //A012
              },
              ETH: {
                amount: equity_details_retainedEarnings_breakdown_ETH_amount, //A017
                fairValue:
                  equity_details_retainedEarnings_breakdown_ETH_fairValue, //A018
              },
              BTC: {
                amount: equity_details_retainedEarnings_breakdown_BTC_amount, //A048
                fairValue:
                  equity_details_retainedEarnings_breakdown_BTC_fiarValue, //A049
              },
              USD: {
                amount: equity_details_retainedEarnings_breakdown_USD_amount, //A050
                fairValue:
                  equity_details_retainedEarnings_breakdown_USD_fairValue, //A051
              },
            },
          },
          otherCapitalReserve: {
            fairValue: equity_details_otherCapitalReserve_fairValue, //A052
            breakdown: {
              USD: {
                amount: equity_details_otherCapitalReserve_breakdown_USD_amount, //A053
                fairValue:
                  equity_details_otherCapitalReserve_breakdown_USD_fairValue, //A054
              },
              USDT: {
                amount:
                  equity_details_otherCapitalReserve_breakdown_USDT_amount, //A055
                fairValue:
                  equity_details_otherCapitalReserve_breakdown_USDT_fairValue, //A056
              },
              ETH: {
                amount: equity_details_otherCapitalReserve_breakdown_ETH_amount, //A057
                fairValue:
                  equity_details_otherCapitalReserve_breakdown_ETH_fairValue, //A058
              },
              BTC: {
                amount: equity_details_otherCapitalReserve_breakdown_BTC_amount, //A059
                fairValue:
                  equity_details_otherCapitalReserve_breakdown_BTC_fairValue, //A060
              },
            },
          },
        },
      },
    };
    res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
