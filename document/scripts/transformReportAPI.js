const { timeStamp } = require('console');
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const INFURA_API_KEY = "49fc68e118b54e3db1e5eab9b2e44da6";
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_API_KEY}`);
const contractABIPath = path.resolve(__dirname, '../auditingABI.json');
const contractABI = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
const contractAddress = '0xD02057e98c3f253ca37AeA297bAF8D3d1C2Ae956';
const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);
const reports = contractInstance;

const reportID = "first_report";
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
  const totalAssetsFairValue = await getContractValue(reportID,"balanceSheet","totalAssetsFairValue");
  const totalLiabilitiesAndEquityFairValue = await getContractValue(reportID, "balanceSheet", "totalLiabilitiesAndEquityFairValue");
  const assets_totalAmountFairValue = await getContractValue(reportID,"balanceSheet","assets.totalAmountFairValue" );
  const assets_details_accountsReceivable_totalAmountFairValue = await getContractValue(reportID,"balanceSheet","assets.details.accountsReceivable.totalAmountFairValue" );
  const assets_details_accountsReceivable_breakdown_USDT_amount = await getContractValue(reportID,"balanceSheet","assets.details.accountsReceivable.breakdown.USDT.amount");
  const assets_details_accountsReceivable_breakdown_USDT_fairValue= await getContractValue(reportID,"balanceSheet","assets.details.accountsReceivable.breakdown.USDT.fairValue");
  const assets_details_cryptocurrency_breakdown_ETH_amount = await getContractValue(reportID,"balanceSheet","assets.details.cryptocurrency.breakdown.ETH.amount" );
  const assets_details_cryptocurrency_breakdown_ETH_fairValue = await getContractValue(reportID,"balanceSheet","assets.details.cryptocurrency.breakdown.ETH.fairValue" );
  const assets_details_cryptocurrency_breakdown_BTC_amount = await getContractValue(reportID,"balanceSheet","assets.details.cryptocurrency.breakdown.BTC.amount" );
  const assets_details_cryptocurrency_breakdown_BTC_fairValue = await getContractValue(reportID,"balanceSheet","assets.details.cryptocurrency.breakdown.BTC.fairValue" );
  const assets_details_cryptocurrency_breakdown_USDT_amount = await getContractValue(reportID,"balanceSheet","assets.details.cryptocurrency.breakdown.USDT.amount" );
  const assets_details_cryptocurrency_breakdown_USDT_fairValue = await getContractValue(reportID,"balanceSheet","assets.details.cryptocurrency.breakdown.USDT.fairValue" );
  const assets_details_cashAndCashEquivalent_totalAmountFairValue = await getContractValue(reportID,"balanceSheet","assets.details.cashAndCashEquivalent.totalAmountFairValue");
  const assets_details_cashAndCashEquivalent_breakdown_USD_amount = await getContractValue(reportID,"balanceSheet","assets.details.cashAndCashEquivalent.breakdown.USD.amount");
  const assets_details_cashAndCashEquivalent_breakdown_USD_fairValue = await getContractValue(reportID,"balanceSheet","assets.details.cashAndCashEquivalent.breakdown.USD.fairValue");
  const liabilities_totalAmountFairValue = await getContractValue(reportID,"balanceSheet","liabilities.totalAmountFairValue" );
  //const liabilities_details_userDeposit_breakdown_ETH_amount = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.ETH.amount" );
  //const liabilities_details_userDeposit_breakdown_ETH_fairValue = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.ETH.fairValue" );
  //const liabilities_details_userDeposit_breakdown_BTC_amount = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.BTC.amount");
  //const liabilities_details_userDeposit_breakdown_BTC_fairValue = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.BTC.fairValue" );
  //const liabilities_details_userDeposit_breakdown_USDT_amount = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.USDT.amount" );
  //const liabilities_details_userDeposit_breakdown_USDT_fairValue = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.USDT.fairValue" );
  //const liabilities_details_userDeposit_breakdown_USD_amount = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.USD.amount" );
  //const liabilities_details_userDeposit_breakdown_USD_fairValue = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.USD.fairValue" );
  const liabilities_details_userDeposit_totalAmountFairValue = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.totalAmountFairValue" );
  const liabilities_details_userDeposit_breakdown_ETH_amount = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.ETH.amount");
  const liabilities_details_userDeposit_breakdown_ETH_fairValue  = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.ETH.fairValue");
  const liabilities_details_userDeposit_breakdown_BTC_amount = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.BTC.amount");
  const liabilities_details_userDeposit_breakdown_BTC_airValue = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.BTC.fairValue");
  const liabilities_details_userDeposit_breakdown_USDT_amount = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.USDT.amount");
  const liabilities_details_userDeposit_breakdown_USDT_fiarValue = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.USDT.fiarValue");
  const liabilities_details_userDeposit_breakdown_USD_amount = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.USD.amount");
  const liabilities_details_userDeposit_breakdown_USD_fairValue = await getContractValue(reportID,"balanceSheet","liabilities.details.userDeposit.breakdown.USD.fairValue");
  const equity_totalAmountFairValue = await getContractValue(reportID,"balanceSheet","equity.totalAmountFairValue" );
  const equity_details_retainedEarnings_totalAmountFairValue = await getContractValue(reportID,"balanceSheet","equity.details.retainedEarnings.totalAmountFairValue" );
  const equity_details_retainedEarnings_breakdown_ETH_amount = await getContractValue(reportID,"balanceSheet","equity.details.retainedEarnings.breakdown.ETH.amount" );
  const equity_details_retainedEarnings_breakdown_ETH_fairValue = await getContractValue(reportID,"balanceSheet","equity.details.retainedEarnings.breakdown.ETH.fairValue" ) ;
  const equity_details_retainedEarnings_breakdown_BTC_amount = await getContractValue(reportID,"balanceSheet","equity.details.retainedEarnings.breakdown.BTC.amount" );
  const equity_details_retainedEarnings_breakdown_BTC_fiarValue = await getContractValue(reportID,"balanceSheet","equity.details.retainedEarnings.breakdown.BTC.fiarValue" );
  const equity_details_retainedEarnings_breakdown_USDT_amount = await getContractValue(reportID,"balanceSheet","equity.details.retainedEarnings.breakdown.USDT.amount" );
  const equity_details_retainedEarnings_breakdown_USDT_fairValue = await getContractValue(reportID,"balanceSheet","equity.details.retainedEarnings.breakdown.USDT.fairValue" );
  const equity_details_retainedEarnings_breakdown_USD_amount = await getContractValue(reportID,"balanceSheet","equity.details.retainedEarnings.breakdown.USD.amount" );
  const equity_details_retainedEarnings_breakdown_USD_fairValue = await getContractValue(reportID,"balanceSheet","equity.details.retainedEarnings.breakdown.USD.fairValue" )
  console.log(totalAssetsFairValue);
  console.log(totalAssetsFairValue/regulated_digits);
  const data =
  {
    "success": true,
    "code": "00000000",
    "reason": "ERROR_MESSAGE.SUCCESS",
    "data":
    {
      "id": reportID,
      "date": Date.now(),
      "totalAssetsFairValue": totalAssetsFairValue ,
      "totalLiabilitiesAndEquityFairValue": totalLiabilitiesAndEquityFairValue,
      "assets": {
        "totalAmountFairValue": assets_totalAmountFairValue,
        "details": {
          "accountsReceivable": {
            "totalAmountFairValue": assets_details_accountsReceivable_totalAmountFairValue,
            "weightedAverageCost": "?",
            "breakdown": { //還有這個
              "ETH": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "ETH",
                "amount": "?",
                "weightedAverageCost": "?",
                "fairValue": "?"
              },
              "BTC": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "BTC",
                "amount": "?",
                "weightedAverageCost": "?",
                "fairValue": "?"
              },
              "USDT": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "USDT",
                "amount": assets_details_accountsReceivable_breakdown_USDT_amount,
                "weightedAverageCost": "?",
                "fairValue": assets_details_accountsReceivable_breakdown_USDT_fairValue,
              },
              "USD": {
                "currencyType": "FIAT",
                "name": "USD",
                "amount": "?",
                "weightedAverageCost": "?",
                "fairValue":"?"
              }
            }
          },
          "cryptocurrency": {
            "totalAmountFairValue": "?",
            "weightedAverageCost":"?",
            "breakdown": {
              "ETH": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "ETH",
                "amount": assets_details_cryptocurrency_breakdown_ETH_amount,
                "weightedAverageCost": "?",
                "fairValue": assets_details_cryptocurrency_breakdown_ETH_fairValue
              },
              "BTC": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "BTC",
                "amount": assets_details_cryptocurrency_breakdown_BTC_amount,
                "weightedAverageCost": "?",
                "fairValue": assets_details_cryptocurrency_breakdown_BTC_fairValue,
              },
              "USDT": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "USDT",
                "amount":assets_details_cryptocurrency_breakdown_USDT_amount,
                "weightedAverageCost": "?",
                "fairValue":  assets_details_cryptocurrency_breakdown_USDT_fairValue
              }
            }
          },
          "cashAndCashEquivalent": {
            "totalAmountFairValue": assets_details_cashAndCashEquivalent_totalAmountFairValue,
            "weightedAverageCost": "?",
            "breakdown": {
              "USD": {
                "currencyType": "FIAT",
                "name": "USD",
                "amount": assets_details_cashAndCashEquivalent_breakdown_USD_amount,
                "weightedAverageCost":"?",
                "fairValue": assets_details_cashAndCashEquivalent_breakdown_USD_fairValue,
              },
              "ETH": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "ETH",
                "amount": "?",
                "weightedAverageCost": "?",
                "fairValue": "?"
              },
              "BTC": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "BTC",
                "amount": "?",
                "weightedAverageCost": "?",
                "fairValue": "?"
              },
              "USDT": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "USDT",
                "amount": "?",
                "weightedAverageCost": "?",
                "fairValue": "?"
              }
            }
          }
        }
      },
      "nonAssets": {
        "totalAmountFairValue": "?",
        "weightedAverageCost": "?",
        "details": {
          "accountsReceivable": {
            "totalAmountFairValue": "?",
            "weightedAverageCost": "?",
            "breakdown": {}
          },
          "cashAndCashEquivalent": {
            "totalAmountFairValue": "?",
            "weightedAverageCost": "?",
            "breakdown": {}
          }
        }
      },
      "liabilities": {
        "totalAmountFairValue": liabilities_totalAmountFairValue,
        "weightedAverageCost": "?",
        "details": {
          "accountsPayable": {
            "totalAmountFairValue": "?",
            "weightedAverageCost": "?",
            "breakdown": {
              "ETH": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "ETH",
                "amount":  "?",
                "weightedAverageCost": "?",// here weightedAverageCost
                "fairValue": "?"
              },
              "BTC": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "BTC",
                "amount": "?",
                "weightedAverageCost": "?",
                "fairValue": "?",
              },
              "USDT": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "USDT",
                "amount": "?",
                "weightedAverageCost": "?",
                "fairValue":"?"
              },
              "USD": {
                "currencyType": "FIAT",
                "name": "USD",
                "amount": "?",
                "weightedAverageCost": "?",
                "fairValue": "?",
              }
            }
          },
          "userDeposit": {
            "totalAmountFairValue": liabilities_details_userDeposit_totalAmountFairValue,
            "weightedAverageCost": "?",
            "breakdown": {
              "ETH": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "ETH",
                "amount": liabilities_details_userDeposit_breakdown_ETH_amount,
                "weightedAverageCost": "?",
                "fairValue": liabilities_details_userDeposit_breakdown_ETH_fairValue,
              },
              "BTC": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "BTC",
                "amount": liabilities_details_userDeposit_breakdown_BTC_amount,
                "weightedAverageCost": "?",
                "fairValue": liabilities_details_userDeposit_breakdown_BTC_airValue,
              },
              "USDT": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "USDT",
                "amount": liabilities_details_userDeposit_breakdown_USDT_amount,
                "weightedAverageCost": "?",
                "fairValue": liabilities_details_userDeposit_breakdown_USDT_fiarValue,
              },
              "USD": {
                "currencyType": "FIAT",
                "name": "USD",
                "amount": liabilities_details_userDeposit_breakdown_USD_amount,
                "weightedAverageCost": "?",
                "fairValue": liabilities_details_userDeposit_breakdown_USD_fairValue,
              }
            }
          }
        }
      },
      "equity": {
        "totalAmountFairValue": equity_totalAmountFairValue,
        "weightedAverageCost": "?",
        "details": {
          "retainedEarnings": {
            "totalAmountFairValue": equity_details_retainedEarnings_totalAmountFairValue,
            "weightedAverageCost": "?",
            "breakdown": {
              "ETH": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "ETH",
                "amount": equity_details_retainedEarnings_breakdown_ETH_amount,
                "weightedAverageCost": "?",
                "fairValue": equity_details_retainedEarnings_breakdown_ETH_fairValue,
              },
              "BTC": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "BTC",
                "amount": equity_details_retainedEarnings_breakdown_BTC_amount,
                "weightedAverageCost": "?",
                "fairValue": equity_details_retainedEarnings_breakdown_BTC_fiarValue,
              },
              "USDT": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "USDT",
                "amount":  equity_details_retainedEarnings_breakdown_USDT_amount,
                "weightedAverageCost": "?",
                "fairValue": equity_details_retainedEarnings_breakdown_USDT_fairValue,
              },
              "USD": {
                "currencyType": "FIAT",
                "name": "USD",
                "amount": equity_details_retainedEarnings_breakdown_USD_amount,
                "weightedAverageCost": "?",
                "fairValue": equity_details_retainedEarnings_breakdown_USD_fairValue,
              }
            }
          },
          "capital": {
            "totalAmountFairValue": "?",
            "weightedAverageCost": "?",
            "breakdown": {
              "USD": {
                "currencyType": "FIAT",
                "name": "USD",
                "amount": "?",
                "weightedAverageCost": "?",
                "fairValue": "?"
              },
              "ETH": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "ETH",
                "amount": "?",
                "weightedAverageCost": "?",
                "fairValue": "?"
              },
              "BTC": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "BTC",
                "amount": "?",
                "weightedAverageCost": "?",
                "fairValue": "?"
              },
              "USDT": {
                "currencyType": "CRYPTOCURRENCY",
                "name": "USDT",
                "amount": "?",
                "weightedAverageCost": "?",
                "fairValue": "?"
              }
            }
          }
        }
      }
    },
  };

 //

  console.log(JSON.stringify(data, null, 2));
}

fetchData();
