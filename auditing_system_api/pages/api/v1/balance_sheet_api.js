const { timeStamp } = require('console');
require('events').EventEmitter.defaultMaxListeners = 15;
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const reportID = process.env.REPORT_ID;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const balanceSheet = await prisma.balanceSheet.findUnique({
        where: {
          reportID: process.env.REPORT_ID,
        },
      });
      if (!balanceSheet) {
        return res.status(404).json({ message: 'Report not found' });
      }
      const data = {
        id: balanceSheet.reportID,
        reportStartTime: balanceSheet.startTime,
        reportEndTime: balanceSheet.endTime,
        totalAssetsFairValue: balanceSheet.totalAssetsFairValue, //A005
        totalLiabilitiesAndEquityFairValue:
          balanceSheet.totalLiabilitiesAndEquityFairValue, //A014
        assets: {
          totalAmountFairValue: balanceSheet.assets_totalAmountFairValue, //A004
          details: {
            cryptocurrency: {
              totalAmountFairValue:
                balanceSheet.assets_details_cryptocurrency_totalAmountFairValue, //A001
              breakdown: {
                USDT: {
                  amount:
                    balanceSheet.assets_details_cryptocurrency_breakdown_USDT_amount, //A002
                  fairValue:
                    balanceSheet.assets_details_cryptocurrency_breakdown_USDT_fairValue, //A003
                },
                ETH: {
                  amount:
                    balanceSheet.assets_details_cryptocurrency_breakdown_ETH_amount, //A015
                  fairValue:
                    balanceSheet.assets_details_cryptocurrency_breakdown_ETH_fairValue, //A016
                },
                BTC: {
                  amount:
                    balanceSheet.assets_details_cryptocurrency_breakdown_BTC_amount, //A046
                  fairValue:
                    balanceSheet.assets_details_cryptocurrency_breakdown_BTC_fairValue, //A047
                },
              },
            },
            cashAndCashEquivalent: {
              totalAmountFairValue:
                balanceSheet.assets_details_cashAndCashEquivalent_totalAmountFairValue, //A019
              breakdown: {
                USD: {
                  amount:
                    balanceSheet.assets_details_cashAndCashEquivalent_breakdown_USD_amount, //A061
                  fairValue:
                    balanceSheet.assets_details_cashAndCashEquivalent_breakdown_USD_fairValue, //A062
                },
              },
            },
            accountsReceivable: {
              totalAmountFairValue:
                balanceSheet.assets_details_accountsReceivable_totalAmountFairValue, //A020
              breakdown: {
                USDT: {
                  amount:
                    balanceSheet.assets_details_accountsReceivable_breakdown_USDT_amount, //A025
                  fairValue:
                    balanceSheet.assets_details_accountsReceivable_breakdown_USDT_fairValue, //A026
                },
                BTC: {
                  amount:
                    balanceSheet.assets_details_accountsReceivable_breakdown_BTC_amount, //A027
                  fairValue:
                    balanceSheet.ssets_details_accountsReceivable_breakdown_BTC_fairValue, //A028
                },
                ETH: {
                  amount:
                    balanceSheet.assets_details_accountsReceivable_breakdown_ETH_amount, //A029
                  fairValue:
                    balanceSheet.assets_details_accountsReceivable_breakdown_ETH_fairValue, //A030
                },
              },
            },
          },
        },
        liabilities: {
          totalAmountFairValue: balanceSheet.liabilities_totalAmountFairValue, //A009
          details: {
            userDeposit: {
              totalAmountFairValue:
                balanceSheet.liabilities_details_userDeposit_totalAmountFairValue, //A006
              breakdown: {
                USDT: {
                  amount:
                    balanceSheet.liabilities_details_userDeposit_breakdown_USDT_amount, //A007
                  fairValue:
                    balanceSheet.liabilities_details_userDeposit_breakdown_USDT_fairValue, //A008
                },
                USD: {
                  amount:
                    balanceSheet.liabilities_details_userDeposit_breakdown_USD_amount, //A040
                  fairValue:
                    balanceSheet.liabilities_details_userDeposit_breakdown_USD_fairValue, //A041
                },
                ETH: {
                  amount:
                    balanceSheet.liabilities_details_userDeposit_breakdown_ETH_amount, //A042
                  fairValue:
                    balanceSheet.liabilities_details_userDeposit_breakdown_ETH_fairValue, //A043
                },
                BTC: {
                  amount:
                    balanceSheet.liabilities_details_userDeposit_breakdown_BTC_amount, //A044
                  fairValue:
                    balanceSheet.liabilities_details_userDeposit_breakdown_BTC_airValue, //A045
                },
              },
            },
            accountsPayable: {
              totalAmountFairValue:
                balanceSheet.liabilities_details_accountsPayable_totalAmountFairValue, //A021
              breakdown: {
                USDT: {
                  amount:
                    balanceSheet.liabilities_details_accountsPayable_breakdown_USDT_amount, //A034
                  fairValue:
                    balanceSheet.liabilities_details_accountsPayable_breakdown_USDT_fairValue, //A035
                },
                USD: {
                  amount:
                    balanceSheet.liabilities_details_accountsPayable_breakdown_USD_amount, //A032
                  fairValue:
                    balanceSheet.liabilities_details_accountsPayable_breakdown_USD_fairValue, //A033
                },
                BTC: {
                  amount:
                    balanceSheet.liabilities_details_accountsPayable_breakdown_BTC_amount, //A036
                  fairValue:
                    balanceSheet.liabilities_details_accountsPayable_breakdown_BTC_fairValue, //A037
                },
                ETH: {
                  amount:
                    balanceSheet.liabilities_details_accountsPayable_breakdown_ETH_amount, //A038
                  fairValue:
                    balanceSheet.liabilities_details_accountsPayable_breakdown_ETH_fairValue, //A039
                },
              },
            },
          },
        },
        equity: {
          totalAmountFairValue: balanceSheet.equity_totalAmountFairValue, //A013
          details: {
            retainedEarning: {
              totalAmountFairValue:
                balanceSheet.equity_details_retainedEarnings_totalAmountFairValue, //A010
              breakdown: {
                USDT: {
                  amount:
                    balanceSheet.equity_details_retainedEarnings_breakdown_USDT_amount, //A011
                  fairValue:
                    balanceSheet.equity_details_retainedEarnings_breakdown_USDT_fairValue, //A012
                },
                ETH: {
                  amount:
                    balanceSheet.equity_details_retainedEarnings_breakdown_ETH_amount, //A017
                  fairValue:
                    balanceSheet.equity_details_retainedEarnings_breakdown_ETH_fairValue, //A018
                },
                BTC: {
                  amount:
                    balanceSheet.equity_details_retainedEarnings_breakdown_BTC_amount, //A048
                  fairValue:
                    balanceSheet.equity_details_retainedEarnings_breakdown_BTC_fiarValue, //A049
                },
                USD: {
                  amount:
                    balanceSheet.equity_details_retainedEarnings_breakdown_USD_amount, //A050
                  fairValue:
                    balanceSheet.equity_details_retainedEarnings_breakdown_USD_fairValue, //A051
                },
              },
            },
            otherCapitalReserve: {
              fairValue:
                balanceSheet.equity_details_otherCapitalReserve_fairValue, //A052
              breakdown: {
                USD: {
                  amount:
                    balanceSheet.equity_details_otherCapitalReserve_breakdown_USD_amount, //A053
                  fairValue:
                    balanceSheet.equity_details_otherCapitalReserve_breakdown_USD_fairValue, //A054
                },
                USDT: {
                  amount:
                    balanceSheet.equity_details_otherCapitalReserve_breakdown_USDT_amount, //A055
                  fairValue:
                    balanceSheet.equity_details_otherCapitalReserve_breakdown_USDT_fairValue, //A056
                },
                ETH: {
                  amount:
                    balanceSheet.equity_details_otherCapitalReserve_breakdown_ETH_amount, //A057
                  fairValue:
                    balanceSheet.equity_details_otherCapitalReserve_breakdown_ETH_fairValue, //A058
                },
                BTC: {
                  amount:
                    balanceSheet.equity_details_otherCapitalReserve_breakdown_BTC_amount, //A059
                  fairValue:
                    balanceSheet.equity_details_otherCapitalReserve_breakdown_BTC_fairValue, //A060
                },
              },
            },
          },
        },
      };
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
