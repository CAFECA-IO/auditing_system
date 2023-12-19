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
      const comprehensiveIncome = await prisma.comprehensiveIncome.findUnique({
        where: {
          reportID: process.env.REPORT_ID,
        },
      });
      if (!comprehensiveIncome) {
        return res.status(404).json({ message: 'Report not found' });
      }
      const data = {
        id: reportID,
        reportStartTime: comprehensiveIncome.startTime * 10 ** 18,
        reportEndTime: comprehensiveIncome.endTime * 10 ** 18,
        netProfit: comprehensiveIncome.netProfit, //B004
        income: {
          weightedAverageCost: comprehensiveIncome.income_weightedAverageCost, //B029
          details: {
            depositFee: {
              weightedAverageCost:
                comprehensiveIncome.income_details_depositFee_weightedAverageCost, //B001
              breakdown: {
                USDT: {
                  amount:
                    comprehensiveIncome.income_details_depositFee_breakdown_USDT_amount, //B002
                  weightedAverageCost:
                    comprehensiveIncome.income_details_depositFee_breakdown_USDT_weightedAverageCost, //B003
                },
                ETH: {
                  amount:
                    comprehensiveIncome.income_details_depositFee_breakdown_ETH_amount, //B034
                  weightedAverageCost:
                    comprehensiveIncome.income_details_depositFee_breakdown_ETH_weightedAverageCost, //B035
                },
                BTC: {
                  amount:
                    comprehensiveIncome.income_details_depositFee_breakdown_BTC_amount, //B036
                  weightedAverageCost:
                    comprehensiveIncome.income_details_depositFee_breakdown_BTC_weightedAverageCost, //B037
                },
                USD: {
                  amount:
                    comprehensiveIncome.income_details_depositFee_breakdown_USD_amount, //B038
                  weightedAverageCost:
                    comprehensiveIncome.income_details_depositFee_breakdown_USD_weightedAverageCost, //B039
                },
              },
            },
            withdrawalFee: {
              weightedAverageCost:
                comprehensiveIncome.income_details_withdrawalFee_weightedAverageCost, //B005
              breakdown: {
                USDT: {
                  amount:
                    comprehensiveIncome.income_details_withdrawalFee_breakdown_USDT_amount, //B006
                  weightedAverageCost:
                    comprehensiveIncome.income_details_withdrawalFee_breakdown_USDT_weightedAverageCost, //B007
                },
                ETH: {
                  amount:
                    comprehensiveIncome.income_details_withdrawalFee_breakdown_ETH_amount, //B040
                  weightedAverageCost:
                    comprehensiveIncome.income_details_withdrawalFee_breakdown_ETH_weightedAverageCost, //B041
                },
                BTC: {
                  amount:
                    comprehensiveIncome.income_details_withdrawalFee_breakdown_BTC_amount, //B042
                  weightedAverageCost:
                    comprehensiveIncome.income_details_withdrawalFee_breakdown_BTC_weightedAverageCost, //B043
                },
                USD: {
                  amount:
                    comprehensiveIncome.income_details_withdrawalFee_breakdown_USD_amount, //B044
                  weightedAverageCost:
                    comprehensiveIncome.income_details_withdrawalFee_breakdown_USD_weightedAverageCost, //B045
                },
              },
            },
            tradingFee: {
              weightedAverageCost:
                comprehensiveIncome.income_details_transactionFee_weightedAverageCost, //B011
              breakdown: {
                ETH: {
                  amount:
                    comprehensiveIncome.income_details_transactionFee_breakdown_ETH_amount, //B046
                  weightedAverageCost:
                    comprehensiveIncome.income_details_transactionFee_breakdown_ETH_weightedAverageCost, //B047
                },
                BTC: {
                  amount:
                    comprehensiveIncome.income_details_transactionFee_breakdown_BTC_amount, //B048
                  weightedAverageCost:
                    comprehensiveIncome.income_details_transactionFee_breakdown_BTC_weightedAverageCost, //B049
                },
                USDT: {
                  amount:
                    comprehensiveIncome.income_details_transactionFee_breakdown_USDT_amount, //B050
                  weightedAverageCost:
                    comprehensiveIncome.income_details_transactionFee_breakdown_USDT_weightedAverageCost, //B051
                },
                USD: {
                  amount:
                    comprehensiveIncome.income_details_transactionFee_breakdown_USD_amount, //B052
                  weightedAverageCost:
                    comprehensiveIncome.income_details_transactionFee_breakdown_USD_weightedAverageCost, //B053
                },
              },
            },
          },
          spreadFee: {
            weightedAverageCost:
              comprehensiveIncome.income_details_spreadFee_weightedAverageCost, //B012
            breakdown: {
              ETH: {
                amount:
                  comprehensiveIncome.income_details_spreadFee_breakdown_ETH_amount, //B054
                weightedAverageCost:
                  comprehensiveIncome.income_details_spreadFee_breakdown_ETH_weightedAverageCost, //B055
              },
              BTC: {
                amount:
                  comprehensiveIncome.income_details_spreadFee_breakdown_BTC_amount, //B056
                weightedAverageCost:
                  comprehensiveIncome.income_details_spreadFee_breakdown_BTC_weightedAverageCost, //B057
              },
              USDT: {
                amount:
                  comprehensiveIncome.income_details_spreadFee_breakdown_USDT_amount, //B058
                weightedAverageCost:
                  comprehensiveIncome.income_details_spreadFee_breakdown_USDT_weightedAverageCost, //B059
              },
              USD: {
                amount:
                  comprehensiveIncome.income_details_spreadFee_breakdown_USD_amount, //B060
                weightedAverageCost:
                  comprehensiveIncome.income_details_spreadFee_breakdown_USD_weightedAverageCost, //B061
              },
            },
          },
          liquidationFee: {
            weightedAverageCost:
              comprehensiveIncome.income_details_liquidationFee_weightedAverageCost, //B013
            breakdown: {
              ETH: {
                amount:
                  comprehensiveIncome.income_details_liquidationFee_breakdown_ETH_amount, //B062
                weightedAverageCost:
                  comprehensiveIncome.income_details_liquidationFee_breakdown_ETH_weightedAverageCost, //B063
              },
              BTC: {
                amount:
                  comprehensiveIncome.income_details_liquidationFee_breakdown_BTC_amount, //B064
                weightedAverageCost:
                  comprehensiveIncome.income_details_liquidationFee_breakdown_BTC_weightedAverageCost, //B065
              },
              USDT: {
                amount:
                  comprehensiveIncome.income_details_liquidationFee_breakdown_USDT_amount, //B066
                weightedAverageCost:
                  comprehensiveIncome.income_details_liquidationFee_breakdown_USDT_weightedAverageCost, //B067
              },
              USD: {
                amount:
                  comprehensiveIncome.income_details_liquidationFee_breakdown_USD_amount, //B068
                weightedAverageCost:
                  comprehensiveIncome.income_details_liquidationFee_breakdown_USD_weightedAverageCost, //B069
              },
            },
          },
          guaranteedStopLossFee: {
            weightedAverageCost:
              comprehensiveIncome.income_details_guaranteedStopFee_weightedAverageCost, //B014
            breakdown: {
              ETH: {
                amount:
                  comprehensiveIncome.income_details_guaranteedStopFee_breakdown_ETH_amount, //B070
                weightedAverageCost:
                  comprehensiveIncome.income_details_guaranteedStopFee_breakdown_ETH_weightedAverageCost, //B071
              },
              BTC: {
                amount:
                  comprehensiveIncome.income_details_guaranteedStopFee_breakdown_BTC_amount, //B072
                weightedAverageCost:
                  comprehensiveIncome.income_details_guaranteedStopFee_breakdown_BTC_weightedAverageCost, //B073
              },
              USDT: {
                amount:
                  comprehensiveIncome.income_details_guaranteedStopFee_breakdown_USDT_amount, //B074
                weightedAverageCost:
                  comprehensiveIncome.income_details_guaranteedStopFee_breakdown_USDT_weightedAverageCost, //B075
              },
              USD: {
                amount:
                  comprehensiveIncome.income_details_guaranteedStopFee_breakdown_USD_amount, //B076
                weightedAverageCost:
                  comprehensiveIncome.income_details_guaranteedStopFee_breakdown_USD_weightedAverageCost, //B077
              },
            },
          },
        },

        costs: {
          weightedAverageCost: comprehensiveIncome.costs_weightedAverageCost, //B030
          details: {
            technicalProviderFee: {
              weightedAverageCost:
                comprehensiveIncome.costs_details_technicalProviderFee_weightedAverageCost, //B008
              breakdown: {
                ETH: {
                  amount:
                    comprehensiveIncome.costs_details_technicalProviderFee_breakdown_ETH_amount, //B009
                  weightedAverageCost:
                    comprehensiveIncome.costs_details_technicalProviderFee_breakdown_ETH_fairValue, //B010
                },
                BTC: {
                  amount:
                    comprehensiveIncome.costs_details_technicalProviderFee_breakdown_BTC_amount, //B094
                  weightedAverageCost:
                    comprehensiveIncome.costs_details_technicalProviderFee_breakdown_BTC_weightedAverageCost, //B095
                },
                USDT: {
                  amount:
                    comprehensiveIncome.costs_details_technicalProviderFee_breakdown_USDT_amount, //B096
                  weightedAverageCost:
                    comprehensiveIncome.costs_details_technicalProviderFee_breakdown_USDT_weightedAverageCost, //B097
                },
                USD: {
                  amount:
                    comprehensiveIncome.costs_details_technicalProviderFee_breakdown_USD_amount, //B098
                  weightedAverageCost:
                    comprehensiveIncome.costs_details_technicalProviderFee_breakdown_USD_weightedAverageCost, //B099
                },
              },
            },
            marketDataProviderFee: {
              weightedAverageCost:
                comprehensiveIncome.costs_details_marketDataProviderFee_weightedAverageCost, //B015
            },
            newCoinListingCost: {
              weightedAverageCost:
                comprehensiveIncome.costs_details_newCoinListingCost_weightedAverageCost, //B016
            },
          },
        },

        operatingExpenses: {
          weightedAverageCost:
            comprehensiveIncome.operatingExpenses_weightedAverageCost, //B031
          details: {
            salaries: comprehensiveIncome.operatingExpenses_details_salaries, //B017
            rent: comprehensiveIncome.operatingExpenses_details_rent, //B018
            marketing: comprehensiveIncome.operatingExpenses_details_marketing, //B019
            rebateExpenses: {
              weightedAverageCost:
                comprehensiveIncome.operatingExpenses_details_rebateExpenses_weightedAverageCost, //B020
              breakdown: {
                ETH: {
                  amount:
                    comprehensiveIncome.operatingExpenses_details_rebateExpenses_breakdown_ETH_amount, //B078
                  weightedAverageCost:
                    comprehensiveIncome.operatingExpenses_details_rebateExpenses_breakdown_ETH_weightedAverageCost, //B079
                },
                BTC: {
                  amount:
                    comprehensiveIncome.operatingExpenses_details_rebateExpenses_breakdown_BTC_amount, //B080
                  weightedAverageCost:
                    comprehensiveIncome.operatingExpenses_details_rebateExpenses_breakdown_BTC_weightedAverageCost, //B081
                },
                USDT: {
                  amount:
                    comprehensiveIncome.operatingExpenses_details_rebateExpenses_breakdown_USDT_amount, //B082
                  weightedAverageCost:
                    comprehensiveIncome.operatingExpenses_details_rebateExpenses_breakdown_USDT_weightedAverageCost, //B083
                },
                USD: {
                  amount:
                    comprehensiveIncome.operatingExpenses_details_rebateExpenses_breakdown_USD_amount, //B084
                  weightedAverageCost:
                    comprehensiveIncome.operatingExpenses_details_rebateExpenses_breakdown_USD_weightedAverageCost, //B085
                },
              },
            },
          },
        },

        financialCosts: {
          weightedAverageCost:
            comprehensiveIncome.financialCosts_weightedAverageCost, //B032
          details: {
            interestExpense:
              comprehensiveIncome.financialCosts_details_interestExpense, //B021
            cryptocurrencyForexLosses: {
              weightedAverageCost:
                comprehensiveIncome.financialCosts_details_cryptocurrencyForexLosses, //B022
              breakdown: {
                ETH: {
                  amount:
                    comprehensiveIncome.financialCosts_details_cryptocurrencyForexLosses_breakdown_ETH_amount,
                  weightedAverageCost:
                    comprehensiveIncome.financialCosts_details_cryptocurrencyForexLosses_breakdown_ETH_weightedAverageCost,
                },
                BTC: {
                  amount:
                    comprehensiveIncome.financialCosts_details_cryptocurrencyForexLosses_breakdown_BTC_amount,
                  weightedAverageCost:
                    comprehensiveIncome.financialCosts_details_cryptocurrencyForexLosses_breakdown_BTC_weightedAverageCost,
                },
                USDT: {
                  amount:
                    comprehensiveIncome.financialCosts_details_cryptocurrencyForexLosses_breakdown_USDT_amount,
                  weightedAverageCost:
                    comprehensiveIncome.financialCosts_details_cryptocurrencyForexLosses_breakdown_USDT_weightedAverageCost,
                },
                USD: {
                  amount:
                    comprehensiveIncome.financialCosts_details_cryptocurrencyForexLosses_breakdown_USD_amount,
                  weightedAverageCost:
                    comprehensiveIncome.financialCosts_details_cryptocurrencyForexLosses_breakdown_USD_weightedAverageCost,
                },
              },
            },
            fiatToCryptocurrencyConversionLosses:
              comprehensiveIncome.financialCosts_details_fiatToCryptocurrencyConversionLosses, //B023
            cryptocurrencyToFiatConversionLosses:
              comprehensiveIncome.financialCosts_details_cryptocurrencyToFiatConversionLosses, //B024
            fiatToFiatConversionLosses:
              comprehensiveIncome.financialCosts_details_fiatToFiatConversionLosses, //B025
          },
        },

        otherGainLosses: {
          weightedAverageCost:
            comprehensiveIncome.otherGainsLosses_weightedAverageCost, //B033
          details: {
            investmentGains:
              comprehensiveIncome.otherGainsLosses_details_investmentGains, //B026
            forexGains: comprehensiveIncome.otherGainsLosses_details_forexGains, //B027
            cryptocurrencyGains: {
              weightedAverageCost:
                comprehensiveIncome.otherGainsLosses_details_cryptocurrencyGains_weightedAverageCosts,
              breakdown: {
                USDT: {
                  amount:
                    comprehensiveIncome.otherGainsLosses_details_cryptocurrencyGains_breakdown_USDT_amount, //B100
                  weightedAverageCost:
                    comprehensiveIncome.otherGainsLosses_details_cryptocurrencyGains_breakdown_USDT_weightedAverageCost, //B101
                },
                ETH: {
                  amount:
                    comprehensiveIncome.otherGainsLosses_details_cryptocurrencyGains_breakdown_ETH_amount, //B102
                  weightedAverageCost:
                    comprehensiveIncome.otherGainsLosses_details_cryptocurrencyGains_breakdown_ETH_weightedAverageCost, //B103
                },
                BTC: {
                  amount:
                    comprehensiveIncome.otherGainsLosses_details_cryptocurrencyGains_breakdown_BTC_amount, //B104
                  weightedAverageCost:
                    comprehensiveIncome.otherGainsLosses_details_cryptocurrencyGains_breakdown_BTC_weightedAverageCost, //B105
                },
                USD: {
                  amount:
                    comprehensiveIncome.otherGainsLosses_details_cryptocurrencyGains_breakdown_USD_amount,
                  weightedAverageCost:
                    comprehensiveIncome.otherGainsLosses_details_cryptocurrencyGains_breakdown_USD_weightedAverageCost,
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
