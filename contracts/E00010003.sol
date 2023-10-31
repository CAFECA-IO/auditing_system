// SPDX-License-Identifier: MIT
// 傳進rate的值
pragma solidity ^0.8.0;
import "./eventTransactionRecord.sol";
import "./reports.sol";

contract E00010003 {

    Reports public report;

    event EventIdAndRateReceived(string eventId, int256 SP002, int256 SP003, int256 SP004);
    event EventEP001(string eventId, int256 EP001,int256 EP002,int256 EP003,int256 EP005);
    int256 latestSP002;
    int256 latestSP003;
    int256 latestSP004;
    int256 EP001;
    int256 EP002;
    int256 EP003;
    int256 EP005;
    string  eventIdFromTimeSpan;
    string reportID;
    TransactionContract public transactionContract;

    constructor(address _transactionContractAddress, address _reportAddress) {
        transactionContract = TransactionContract(_transactionContractAddress);
        report = Reports(_reportAddress);
    }

    function getEventIdAndRate(string memory _eventId,string memory _reportID ,int256 _SP002, int256 _SP003, int256 _SP004) public {
        latestSP002 = _SP002;
        latestSP003 = _SP003;
        latestSP004 = _SP004;
        eventIdFromTimeSpan = _eventId;
        reportID = _reportID;
        emit EventIdAndRateReceived(_eventId, _SP002, _SP003, _SP004);
        if (keccak256(abi.encodePacked(eventIdFromTimeSpan)) == keccak256(abi.encodePacked(_eventId))) {
            EP001  = transactionContract.getTransactionParamByEventId(_eventId,"EP001");
            EP002  = transactionContract.getTransactionParamByEventId(_eventId,"EP002");
            EP003  = transactionContract.getTransactionParamByEventId(_eventId,"EP003");
            EP005  = transactionContract.getTransactionParamByEventId(_eventId,"EP005");
            emit EventEP001(_eventId, EP001,EP002,EP003,EP005);
        }
        computeBalanceSheet();
        computeComprehesiveIncome();
        computeCashFlow();
    }

    function computeBalanceSheet() internal  {

        int256 A001_47_4_5_14 = int256((EP001 + EP003) * latestSP004 );
        string[] memory keysForA001_47_4_5_14 = new string[](5);
        keysForA001_47_4_5_14[0] = "assets.details.cryptocurrency.totalAmountFairValue";
        keysForA001_47_4_5_14[1] = "assets.details.cryptocurrency.breakdown.BTC.fairValue";
        keysForA001_47_4_5_14[2] = "assets.totalAmountFairValue";
        keysForA001_47_4_5_14[3] = "totalAssetsFairValue";
        keysForA001_47_4_5_14[4] = "totalLiabilitiesAndEquityFairValue";
        report.addValue(reportID, "balanceSheet", keysForA001_47_4_5_14[0], A001_47_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_47_4_5_14[1], A001_47_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_47_4_5_14[2], A001_47_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_47_4_5_14[3], A001_47_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_47_4_5_14[4], A001_47_4_5_14);

        int256 A046 = int256(EP001 + EP003);
        string[] memory keysForA046 = new string[](1);
        keysForA046[0] = "assets.details.cryptocurrency.breakdown.BTC.amount";
        report.addValue(reportID, "balanceSheet", keysForA046[0], A046);

        int256 A006_45_9 = int256((EP001 - EP002) * latestSP004 );
        string[] memory keysForA006_45_9 = new string[](3);
        keysForA006_45_9[0] = "liabilities.details.userDeposit.totalAmountFairValue";
        keysForA006_45_9[1] = "liabilities.details.userDeposit.breakdown.BTC.fairValue";
        keysForA006_45_9[2] = "liabilities.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA006_45_9[0], A006_45_9);
        report.addValue(reportID, "balanceSheet", keysForA006_45_9[1], A006_45_9);
        report.addValue(reportID, "balanceSheet", keysForA006_45_9[2], A006_45_9);

        int256 A044 = int256(EP001 - EP002);
        string[] memory keysForA044 = new string[](1);
        keysForA044[0] = "liabilities.details.userDeposit.breakdown.BTC.amount";
        report.addValue(reportID, "balanceSheet", keysForA044[0], A044);

        int256 A010_49_13 = int256((EP002 + EP003) * latestSP004 );
        string[] memory keysForA0A010_49_13 = new string[](3);
        keysForA0A010_49_13[0] = "equity.details.retainedEarnings.totalAmountFairValue";
        keysForA0A010_49_13[1] = "equity.details.retainedEarnings.breakdown.BTC.fairValue";
        keysForA0A010_49_13[2] = "equity.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA0A010_49_13[0], A010_49_13);
        report.addValue(reportID, "balanceSheet", keysForA0A010_49_13[1], A010_49_13);
        report.addValue(reportID, "balanceSheet", keysForA0A010_49_13[2], A010_49_13);

        int256 A048 = int256(EP002 + EP003);
        string[] memory keysForA048 = new string[](1);
        keysForA048[0] = "equity.details.retainedEarnings.breakdown.BTC.amount";
        report.addValue(reportID, "balanceSheet", keysForA048[0], A048);
    }

    function computeComprehesiveIncome() internal {
        int256 B001_37_4 = int256((EP002 + EP003) * EP005 );
        string[] memory keysForB001_37_4 = new string[](3);
        keysForB001_37_4[0] = "income.details.depositFee.weightedAverageCost";
        keysForB001_37_4[1] = "income.details.depositFee.breakdown.BTC.weightedAverageCost";
        keysForB001_37_4[2] = "netProfit";
        report.addValue(reportID, "comprehensiveIncome", keysForB001_37_4[0], B001_37_4);
        report.addValue(reportID, "comprehensiveIncome", keysForB001_37_4[1], B001_37_4);
        report.addValue(reportID, "comprehensiveIncome", keysForB001_37_4[2], B001_37_4);

        int256 B036 = int256(EP002 + EP003);
        string[] memory keysForB036 = new string[](1);
        keysForB036[0] = "income.details.depositFee.breakdown.BTC.amount";
        report.addValue(reportID, "comprehensiveIncome", keysForB036[0], B036);
    }


    function computeCashFlow() internal {
        int256 C001_55 = int256((EP001 - EP002) * EP005 );
        string[] memory keysForC001_55 = new string[](2);
        keysForC001_55[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.weightedAverageCost"; 
        keysForC001_55[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.BTC.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC001_55[0], C001_55);
        report.addValue(reportID, "cashFlow", keysForC001_55[1], C001_55);

        int256 C054 = int256(EP001 - EP002);
        string[] memory keysForC054 = new string[](1);
        keysForC054[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.BTC.amount"; 
        report.addValue(reportID, "cashFlow", keysForC054[0], C054);

        int256 C004_75 = int256((EP002 + EP003) * EP005 );
        string[] memory keysForC004_75 = new string[](2);
        keysForC004_75[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost"; 
        keysForC004_75[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.BTCweightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC004_75[0], C004_75);
        report.addValue(reportID, "cashFlow", keysForC004_75[1], C004_75);

        int256 C072 = int256(EP002 + EP003);
        string[] memory keysForC072 = new string[](1);
        keysForC072[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.amount"; 
        report.addValue(reportID, "cashFlow", keysForC072[0], C072);

        int256 C007_8 = int256((EP001 + EP003) * EP005 );
        string[] memory keysForC007_8 = new string[](2);
        keysForC007_8[0] = "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost"; 
        keysForC007_8[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesEndOfPeriod";
        report.addValue(reportID, "cashFlow", keysForC007_8[0], C007_8);
        report.addValue(reportID, "cashFlow", keysForC007_8[1], C007_8);
    }
}