const { timeStamp } = require('console');
require('events').EventEmitter.defaultMaxListeners = 15;
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const reportID = process.argv[2];

async function generateReport() {
  try {
    const balanceSheet = await prisma.balanceSheet.findUnique({
      where: {
        reportID: process.argv[2],
      },
    });

    const cashFlow = await prisma.cashFlow.findUnique({
      where: {
        reportID: process.argv[2],
      },
    });

    const comprehensiveIncome = await prisma.comprehensiveIncome.findUnique({
      where: {
        reportID: process.argv[2],
      },
    });

    const data = {
      balanceSheet: {
        reportID: balanceSheet.reportID,
        reportName: balanceSheet.reportName,
        reportStartTime: balanceSheet.startTime * 10 ** 18,
        reportEndTime: balanceSheet.endTime * 10 ** 18,
        reportType: 'balance sheet',
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
      },
      comprehensiveIncome: {
        reportType: 'comprehensive income',
        reportID: comprehensiveIncome.reportID,
        reportName: comprehensiveIncome.reportName,
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
      },
      cashFlow: {
        reportType: 'cash flow sheet',
        reportID: cashFlow.reportID,
        reportName: cashFlow.reportName,
        reportStartTime: cashFlow.startTime * 10 ** 18,
        reportEndTime: cashFlow.endTime * 10 ** 18,
        supplementalScheduleOfNonCashOperatingActivities: {
          weightedAverageCost:
            cashFlow.supplementalScheduleOfNonCashOperatingActivities_weightedAverageCost, //C007
          details: {
            cryptocurrenciesPaidToCustomersForPerpetualContractProfits: {
              weightedAverageCost:
                cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToCustomersForPerpetualContractProfits_weightedAverageCost,
            },
            cryptocurrenciesDepositedByCustomers: {
              weightedAverageCost:
                cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_weightedAverageCost, //C001
              breakdown: {
                USDT: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_USDT_amount, //C002
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_USDT_weightedAverageCost, //C003
                },
                ETH: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_ETH_amount, //C052
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_ETH_weightedAverageCost, //C053
                },
                BTC: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_BTC_amount, //C054
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesDepositedByCustomers_breakdown_BTC_weightedAverageCost, //C055
                },
              },
            },
            cryptocurrenciesWithdrawnByCustomers: {
              weightedAverageCost:
                cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_weightedAverageCost, //C009
              breakdown: {
                USDT: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_USDT_amount, //C010
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_USDT_weightedAverageCost, //C011
                },
                ETH: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_ETH_amount, //C056
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_ETH_weightedAverageCost, //C057
                },
                BTC: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_BTC_amount, //C058
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesWithdrawnByCustomers_breakdown_BTC_weightedAverageCost, //C059
                },
              },
            },
            cryptocurrenciesPaidToSuppliersForExpenses: {
              weightedAverageCost:
                cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_weightedAverageCost, //C012
              breakdown: {
                ETH: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_ETH_amount, //C013
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_ETH_weightedAverageCost, //C014
                },
                USDT: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_USDT_amount, //C106
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_USDT_weightedAverageCost, //C107
                },
                BTC: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_BTC_amount, //C108
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesPaidToSuppliersForExpenses_breakdown_BTC_weightedAverageCost, //C109
                },
              },
            },
            cryptocurrencyInflows: {
              weightedAverageCost:
                cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_weightedAverageCost, //C015
              breakdown: {
                ETH: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_ETH_amount, //C060
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_ETH_weightedAverageCost, //C061
                },
                BTC: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_BTC_amount, //C062
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_BTC_weightedAverageCost, //C063
                },
                USDT: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_USDT_amount, //C064
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyInflows_breakdown_USDT_weightedAverageCost, //C065
                },
              },
            },
            cryptocurrencyOutflows: {
              weightedAverageCost:
                cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_weightedAverageCost, //C016
              breakdown: {
                ETH: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_ETH_amount, //C066
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_ETH_weightedAverageCost, //C067
                },
                BTC: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_BTC_amount, //C068
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_BTC_weightedAverageCost, //C069
                },
                USDT: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_USDT_amount, //C070
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrencyOutflows_breakdown_USDT_weightedAverageCost, //C071
                },
              },
            },
            purchaseOfCryptocurrenciesWithNonCashConsideration: {
              weightedAverageCost:
                cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_weightedAverageCost, //C023
              breakdown: {
                ETH: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_amount, //C088
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_weightedAverageCost, //C089
                },
                BTC: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_amount, //C090
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_weightedAverageCost, //C091
                },
                USDT: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_USDT_amount, //C092
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_USDT_weightedAverageCost, //C093
                },
              },
            },
            disposalOfCryptocurrenciesForNonCashConsideration: {
              weightedAverageCost:
                cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_weightedAverageCost, //C024
              breakdown: {
                ETH: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_ETH_amount, //C094
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_ETH_weightedAverageCost, //C095
                },
                BTC: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_BTC_amount, //C096
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_BTC_weightedAverageCost, //C097
                },
                USDT: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_USDT_amount, //C098
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_disposalOfCryptocurrenciesForNonCashConsideration_breakdown_USDT_weightedAverageCost, //C099
                },
              },
            },
            cryptocurrenciesReceivedFromCustomersAsTransactionFees: {
              weightedAverageCost:
                cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_cryptocurrenciesReceivedFromCustomersAsTransactionFees_weightedAverageCost, //C025
              breakdown: {
                USDT: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_USDT_amount, //C072
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_weightedAverageCost, //C073
                },
                ETH: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_amount, //C074
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_ETH_weightedAverageCost, //C075
                },
                BTC: {
                  amount:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_amount, //C076
                  weightedAverageCost:
                    cashFlow.supplementalScheduleOfNonCashOperatingActivities_details_purchaseOfCryptocurrenciesWithNonCashConsideration_breakdown_BTC_weightedAverageCost, //C077
                },
              },
            },
          },
        },

        otherSupplementaryItems: {
          details: {
            relatedToNonCash: {
              cryptocurrenciesEndOfPeriod: {
                weightedAverageCost:
                  cashFlow.otherSupplementaryItems_details_relatedToNonCash_cryptocurrenciesEndOfPeriod_weightedAverageCost, //C051
              },
              cryptocurrenciesBeginningOfPeriod: {
                weightedAverageCost:
                  cashFlow.otherSupplementaryItems_details_relatedToNonCash_cryptocurrenciesBeginningOfPeriod_weightedAverageCost, //C050
              },
            },
            relatedToCash: {
              netIncreaseDecreaseInCashCashEquivalentsAndRestrictedCash: {
                weightedAverageCost:
                  cashFlow.otherSupplementaryItems_details_relatedToCash_netIncreaseDecreaseInCashCashEquivalentsAndRestrictedCash_weightedAverageCost, //C049
              },
              cryptocurrenciesBeginningOfPeriod: {
                weightedAverageCost:
                  cashFlow.otherSupplementaryItems_details_relatedToCash_cryptocurrenciesBeginningOfPeriod_weightedAverageCost, //C051
              },
              cryptocurrenciesEndOfPeriod: {
                weightedAverageCost:
                  cashFlow.otherSupplementaryItems_details_relatedToCash_cryptocurrenciesEndOfPeriod_weightedAverageCost, //C052
              },
            },
          },
        },

        operatingActivities: {
          weightedAverageCost: cashFlow.operatingActivities_weightedAverageCost, //C041
          details: {
            cashDepositedByCustomers: {
              weightedAverageCost:
                cashFlow.operatingActivities_details_cashDepositedByCustomers_weightedAverageCost, //C027
              breakdown: {
                USD: {
                  amount:
                    cashFlow.operatingActivities_details_cashDepositedByCustomers_breakdown_USD_amount, //C134
                  weightedAverageCost:
                    cashFlow.operatingActivities_details_cashDepositedByCustomers_breakdown_USD_weightedAverageCost, //C135
                },
              },
            },
            cashWithdrawnByCustomers: {
              weightedAverageCost:
                cashFlow.operatingActivities_details_cashWithdrawnByCustomers_weightedAverageCost, //C028
              breakdown: {
                USD: {
                  amount:
                    cashFlow.operatingActivities_details_cashDepositedByCustomers_breakdown_USD_amount, //C136
                  weightedAverageCost:
                    cashFlow.operatingActivities_details_cashDepositedByCustomers_breakdown_USD_weightedAverageCost, //C137
                },
              },
            },
            purchaseOfCryptocurrencies: {
              weightedAverageCost:
                cashFlow.operatingActivities_details_purchaseOfCryptocurrencies_weightedAverageCost, //C029
            },
            disposalOfCryptocurrencies: {
              weightedAverageCost:
                cashFlow.operatingActivities_details_disposalOfCryptocurrencies_weightedAverageCost, //C030
            },
            cashReceivedFromCustomersAsTransactionFee: {
              weightedAverageCost:
                cashFlow.operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_weightedAverageCost, //C031
              breakdown: {
                USD: {
                  amount:
                    cashFlow.operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_breakdown_USD_amount, //C138
                  weightedAverageCost:
                    cashFlow.operatingActivities_details_cashReceivedFromCustomersAsTransactionFee_breakdown_USD_weightedAverageCost, //C139
                },
              },
            },
            cashPaidToSuppliersForExpenses: {
              weightedAverageCost:
                cashFlow.operatingActivities_details_cashPaidToSuppliersForExpenses_weightedAverageCost, //C034
              breakdown: {
                USD: {
                  amount:
                    cashFlow.operatingActivities_details_cashPaidToSuppliersForExpenses_breakdown_USD_amount, //C140
                  weightedAverageCost:
                    cashFlow.operatingActivities_details_cashPaidToSuppliersForExpenses_breakdown_USD_weightedAverageCost, //C141
                },
              },
            },
          },
        },

        investingActivities: {
          weightedAverageCost: cashFlow.investingActivities_weightedAverageCost, //C042
        },

        financingActivities: {
          weightedAverageCost: cashFlow.financingActivities_weightedAverageCost, //C048
          details: {
            proceedsFromIssuanceOfCommonStock: {
              weightedAverageCost:
                cashFlow.financingActivities_details_proceedsFromIssuanceOfCommonStock_weightedAverageCost, //C043
            },
            longTermDebt: {
              weightedAverageCost:
                cashFlow.financingActivities_details_longTermDebt_weightedAverageCost, //C044
            },
            shortTermBorrowings: {
              weightedAverageCost:
                cashFlow.financingActivities_details_shortTermBorrowings_weightedAverageCost, //C045
            },
            paymentsOfDividends: {
              weightedAverageCost:
                cashFlow.financingActivities_details_paymentsOfDividends_weightedAverageCost, //C046
            },
            treasuryStock: {
              weightedAverageCost:
                cashFlow.financingActivities_details_treasuryStock_weightedAverageCost, //C047
            },
          },
        },
      },
    };

    // Convert the data object to a JSON string
    const dataString = JSON.stringify(data, null, 2); // null and 2 are used for formatting
    const contract_address = process.argv[3].toLowerCase();
    // Define the path and filename where you want to save the file
    const filePath = path.resolve(
      'reports',
      `report(token)_ID:${reportID}_contract:${contract_address}.json`,
    );

    // Write the stringified data to a file named after the reportID
    fs.writeFileSync(filePath, dataString);

    console.log(`Report saved to ${filePath}`);
  } catch (error) {
    console.log(error);
  }
}

generateReport();
