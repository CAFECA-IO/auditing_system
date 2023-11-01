// SPDX-License-Identifier: MIT
// 傳進rate的值
pragma solidity ^0.8.0;
import "./eventTransactionBytes32.sol";
import "./reports.sol";
import "./parser.sol";

contract E00010007 {

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
    IParser public Iparser;

    constructor(address _transactionContractAddress, address _Parser ,address _reportAddress) {
        transactionContract = TransactionContract(_transactionContractAddress);
        Iparser = IParser(_Parser);
        report = Reports(_reportAddress);
    }

    function getEventIdAndRate(bytes32 _eventId,bytes32 _reportID ,bytes32 _SP002, bytes32 _SP003, bytes32 _SP004) public {
        latestSP002 = int256(uint256(_SP002));
        latestSP003 = int256(uint256(_SP003));
        latestSP004 = int256(uint256(_SP004));
        eventIdFromTimeSpan = Iparser.bytes32ToString(_eventId);
        reportID = Iparser.bytes32ToString(_reportID);
        emit EventIdAndRateReceived(eventIdFromTimeSpan, latestSP002, latestSP003, latestSP004);
        
        EP001  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP001"));
        EP002  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP002"));
        EP003  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP003"));
        EP005  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP005"));
        emit EventEP001(Iparser.bytes32ToString(_eventId), EP001,EP002,EP003,EP005);
        
        computeBalanceSheet();
        computeComprehesiveIncome();
        computeCashFlow();
    }

    function computeBalanceSheet() internal  {

        int256 A001_2_3_4_5_14 =  EP001 + EP003;
        string[] memory keysForA001_2_3_4_5_14 = new string[](6);
        keysForA001_2_3_4_5_14[0] = "assets.details.cashAndCashEquivalent.totalAmountFairValue";
        keysForA001_2_3_4_5_14[1] = "assets.details.cashAndCashEquivalent.breakdown.USD.amount";
        keysForA001_2_3_4_5_14[2] = "assets.details.cashAndCashEquivalent.breakdown.USD.fairValue";
        keysForA001_2_3_4_5_14[3] = "assets.totalAmountFairValue";
        keysForA001_2_3_4_5_14[4] = "totalAssetsFairValue";
        keysForA001_2_3_4_5_14[5] = "totalLiabilitiesAndEquityFairValue";
        report.addValue(reportID, "balanceSheet", keysForA001_2_3_4_5_14[0], A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_2_3_4_5_14[1], A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_2_3_4_5_14[2], A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_2_3_4_5_14[3], A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_2_3_4_5_14[4], A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_2_3_4_5_14[5], A001_2_3_4_5_14);

        int256 A006_7_8_9 =  EP001 - EP002;
        string[] memory keysForA006_7_8_9 = new string[](4);
        keysForA006_7_8_9[0] = "liabilities.details.userDeposit.totalAmountFairValue";
        keysForA006_7_8_9[1] = "liabilities.details.userDeposit.breakdown.USD.amount";
        keysForA006_7_8_9[2] = "liabilities.details.userDeposit.breakdown.USD.fairValue";
        keysForA006_7_8_9[3] = "liabilities.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA006_7_8_9[0], A006_7_8_9);
        report.addValue(reportID, "balanceSheet", keysForA006_7_8_9[1], A006_7_8_9);
        report.addValue(reportID, "balanceSheet", keysForA006_7_8_9[2], A006_7_8_9);
        report.addValue(reportID, "balanceSheet", keysForA006_7_8_9[3], A006_7_8_9);
        report.addValue(reportID, "balanceSheet", keysForA006_7_8_9[4], A006_7_8_9);


        int256 A010_11 =  EP002 + EP003;
        string[] memory keysForA010_11 = new string[](2);
        keysForA010_11[0] = "equity.details.retainedEarnings.totalAmountFairValue";
        keysForA010_11[1] = "equity.details.retainedEarnings.breakdown.USD.amount";
        report.addValue(reportID, "balanceSheet", keysForA010_11[0], A010_11);
        report.addValue(reportID, "balanceSheet", keysForA010_11[1], A010_11);
        report.addValue(reportID, "balanceSheet", keysForA010_11[2], A010_11);
    }

    function computeComprehesiveIncome() internal {
        int256 B001_2_3_4 = EP002 + EP003;
        string[] memory keysForB001_2_3_4 = new string[](4);
        keysForB001_2_3_4[0] = "income.details.depositFee.weightedAverageCost";
        keysForB001_2_3_4[1] = "income.details.depositFee.breakdown.USD.amount";
        keysForB001_2_3_4[2] = "income.details.depositFee.breakdown.USD.weightedAverageCost";
        keysForB001_2_3_4[3] = "netProfit";
        report.addValue(reportID, "comprehensiveIncome", keysForB001_2_3_4[0], B001_2_3_4);
        report.addValue(reportID, "comprehensiveIncome", keysForB001_2_3_4[1], B001_2_3_4);
        report.addValue(reportID, "comprehensiveIncome", keysForB001_2_3_4[2], B001_2_3_4);
        report.addValue(reportID, "comprehensiveIncome", keysForB001_2_3_4[3], B001_2_3_4);
    }

//haven't finish cashFlow table
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