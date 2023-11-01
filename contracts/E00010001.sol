// SPDX-License-Identifier: MIT
// 傳進rate的值
pragma solidity ^0.8.0;
import "./eventTransactionBytes32.sol";
import "./reports.sol";
import "./parser.sol";

contract E00010001{

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

        int256 A001_3_4_5_14 = int256((EP001 + EP003) * latestSP002/100);
        string[] memory keysForA001_3_4_5_14 = new string[](5);
        keysForA001_3_4_5_14[0] = "assets.details.cryptocurrency.totalAmountFairValue";
        keysForA001_3_4_5_14[1] = "assets.details.cryptocurrency.breakdown.USDT.fairValue";
        keysForA001_3_4_5_14[2] = "assets.totalAmountFairValue";
        keysForA001_3_4_5_14[3] = "totalAssetsFairValue";
        keysForA001_3_4_5_14[4] = "totalLiabilitiesAndEquityFairValue";
        report.addValue(reportID, "balanceSheet", keysForA001_3_4_5_14[0], A001_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_3_4_5_14[1], A001_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_3_4_5_14[2], A001_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_3_4_5_14[3], A001_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_3_4_5_14[4], A001_3_4_5_14);

        int256 A002 = int256(EP001 + EP003);
        string[] memory keysForA002 = new string[](1);
        keysForA002[0] = "assets.details.cryptocurrency.breakdown.USDT.amount";
        report.addValue(reportID, "balanceSheet", keysForA002[0], A002);

        int256 A006_8_9 = int256((EP001 - EP002) * latestSP002/100);
        string[] memory keysForA006_8_9 = new string[](3);
        keysForA006_8_9[0] = "liabilities.details.userDeposit.totalAmountFairValue";
        keysForA006_8_9[1] = "liabilities.details.userDeposit.breakdown.USDT.fairValue";
        keysForA006_8_9[2] = "liabilities.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA006_8_9[0], A006_8_9);
        report.addValue(reportID, "balanceSheet", keysForA006_8_9[1], A006_8_9);
        report.addValue(reportID, "balanceSheet", keysForA006_8_9[2], A006_8_9);

        int256 A007 = int256(EP001 - EP002);
        string[] memory keysForA007 = new string[](1);
        keysForA007[0] = "liabilities.details.userDeposit.breakdown.USDT.amount";
        report.addValue(reportID, "balanceSheet", keysForA007[0], A007);

        int256 A010_12_13 = int256((EP002 + EP003) * latestSP002/100);
        string[] memory keysForA010_12_13 = new string[](3);
        keysForA010_12_13[0] = "equity.details.retainedEarnings.totalAmountFairValue";
        keysForA010_12_13[1] = "equity.details.retainedEarnings.breakdown.USDT.fairValue";
        keysForA010_12_13[2] = "equity.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA010_12_13[0], A010_12_13);
        report.addValue(reportID, "balanceSheet", keysForA010_12_13[1], A010_12_13);
        report.addValue(reportID, "balanceSheet", keysForA010_12_13[2], A010_12_13);

        int256 A011 = int256(EP002 + EP003);
        string[] memory keysForA011 = new string[](1);
        keysForA011[0] = "equity.details.retainedEarnings.breakdown.USDT.amount";
        report.addValue(reportID, "balanceSheet", keysForA011[0], A011);
    }

    function computeComprehesiveIncome() internal {
        int256 B001_3_4 = int256((EP002 + EP003) * EP005/100);
        string[] memory keysForB001_3_4 = new string[](3);
        keysForB001_3_4[0] = "income.details.depositFee.weightedAverageCost";
        keysForB001_3_4[1] = "income.details.depositFee.breakdown.USDT.weightedAverageCost";
        keysForB001_3_4[2] = "netProfit";
        report.addValue(reportID, "comprehensiveIncome", keysForB001_3_4[0], B001_3_4);
        report.addValue(reportID, "comprehensiveIncome", keysForB001_3_4[1], B001_3_4);
        report.addValue(reportID, "comprehensiveIncome", keysForB001_3_4[2], B001_3_4);

        int256 B002 = int256(EP002 + EP003);
        string[] memory keysForB002 = new string[](1);
        keysForB002[0] = "income.details.depositFee.breakdown.USDT.amount";
        report.addValue(reportID, "comprehensiveIncome", keysForB002[0], B002);
    }

    function computeCashFlow() internal {
        int256 C001_3 = int256((EP001 - EP002) * EP005/100);
        string[] memory keysForC001_3 = new string[](2);
        keysForC001_3[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.weightedAverageCost"; 
        keysForC001_3[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC001_3[0], C001_3);
        report.addValue(reportID, "cashFlow", keysForC001_3[1], C001_3);

        int256 C002 = int256(EP001 - EP002);
        string[] memory keysForC002 = new string[](1);
        keysForC002[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.amount"; 
        report.addValue(reportID, "cashFlow", keysForC002[0], C002);

        int256 C004_6 = int256((EP002 + EP003) * EP005/100);
        string[] memory keysForC004_6 = new string[](2);
        keysForC004_6[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost"; 
        keysForC004_6[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC004_6[0], C004_6);
        report.addValue(reportID, "cashFlow", keysForC004_6[1], C004_6);

        int256 C005 = int256(EP002 + EP003);
        string[] memory keysForC005 = new string[](1);
        keysForC005[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.amount"; 
        report.addValue(reportID, "cashFlow", keysForC005[0], C005);

        int256 C007_8 = int256((EP001 + EP003) * EP005/100);
        string[] memory keysForC007_8 = new string[](2);
        keysForC007_8[0] = "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost"; 
        keysForC007_8[1] = "otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC007_8[0], C007_8);
        report.addValue(reportID, "cashFlow", keysForC007_8[1], C007_8);
    }
}