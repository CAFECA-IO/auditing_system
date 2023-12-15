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
      const cashFlow = await prisma.cashFlow.findUnique({
        where: {
          reportID: process.env.REPORT_ID,
        },
      });
      if (!cashFlow) {
        return res.status(404).json({ message: 'Report not found' });
      }
      const data = {
        id: reportID,
        reportStartTime: cashFlow.startTime,
        reportEndTime: endTime,
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
