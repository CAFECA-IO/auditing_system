// SPDX-License-Identifier: MIT
// 傳進rate的值
pragma solidity ^0.8.0;
import "./eventTransactionBytes32.sol";
import "./reports.sol";
import "./parser.sol";

contract E00010002 {

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

        int256 A001_4_5_14_16 = int256((EP001 + EP003) * latestSP003);
        string[] memory keysForA001_4_5_14_16 = new string[](5);
        keysForA001_4_5_14_16[0] = "assets.details.cryptocurrency.totalAmountFairValue";
        keysForA001_4_5_14_16[1] = "assets.totalAmountFairValue";
        keysForA001_4_5_14_16[2] = "totalAssetsFairValue";
        keysForA001_4_5_14_16[3] = "totalLiabilitiesAndEquityFairValue";
        keysForA001_4_5_14_16[4] = "assets.details.cryptocurrency.breakdown.ETH.fairValue";
        report.addValue(reportID, "balanceSheet", keysForA001_4_5_14_16[0], A001_4_5_14_16);
        report.addValue(reportID, "balanceSheet", keysForA001_4_5_14_16[1], A001_4_5_14_16);
        report.addValue(reportID, "balanceSheet", keysForA001_4_5_14_16[2], A001_4_5_14_16);
        report.addValue(reportID, "balanceSheet", keysForA001_4_5_14_16[3], A001_4_5_14_16);
        report.addValue(reportID, "balanceSheet", keysForA001_4_5_14_16[4], A001_4_5_14_16);

        int256 A015 = int256(EP001 + EP003);
        string[] memory keysForA015 = new string[](1);
        keysForA015[0] = "assets.details.cryptocurrency.breakdown.ETH.amount";
        report.addValue(reportID, "balanceSheet", keysForA015[0], A015);

        int256 A006_43_9 = int256((EP001 - EP002) * latestSP003);
        string[] memory keysForA006_43_9 = new string[](3);
        keysForA006_43_9[0] = "liabilities.details.userDeposit.totalAmountFairValue";
        keysForA006_43_9[1] = "liabilities.details.userDeposit.breakdown.ETH.fairValue";
        keysForA006_43_9[2] = "liabilities.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA006_43_9[0], A006_43_9);
        report.addValue(reportID, "balanceSheet", keysForA006_43_9[1], A006_43_9);
        report.addValue(reportID, "balanceSheet", keysForA006_43_9[2], A006_43_9);

        int256 A010_18_13 = int256((EP002 + EP003) * latestSP003);
        string[] memory keysForA0A010_18_13 = new string[](3);
        keysForA0A010_18_13[0] = "equity.details.retainedEarnings.totalAmountFairValue";
        keysForA0A010_18_13[1] = "equity.details.retainedEarnings.breakdown.ETH.fairValue";
        keysForA0A010_18_13[2] = "equity.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA0A010_18_13[0], A010_18_13);
        report.addValue(reportID, "balanceSheet", keysForA0A010_18_13[1], A010_18_13);
        report.addValue(reportID, "balanceSheet", keysForA0A010_18_13[2], A010_18_13);

        int256 A017 = int256(EP002 + EP003);
        string[] memory keysForA017 = new string[](1);
        keysForA017[0] = "equity.details.retainedEarnings.breakdown.ETH.amount";
        report.addValue(reportID, "balanceSheet", keysForA017[0], A017);

        int256 A042 = int256(EP001 - EP002);
        string[] memory keysForA042 = new string[](1);
        keysForA042[0] = "liabilities.details.userDeposit.breakdown.ETH.amount";
        report.addValue(reportID, "balanceSheet", keysForA042[0], A042);
    }

    function computeComprehesiveIncome() internal {
        int256 B001_35_4 = int256((EP002 + EP003) * EP005);
        string[] memory keysForB001_35_4 = new string[](3);
        keysForB001_35_4[0] = "income.details.depositFee.weightedAverageCost";
        keysForB001_35_4[1] = "income.details.depositFee.breakdown.ETH.weightedAverageCost";
        keysForB001_35_4[2] = "netProfit";
        report.addValue(reportID, "comprehensiveIncome", keysForB001_35_4[0], B001_35_4);
        report.addValue(reportID, "comprehensiveIncome", keysForB001_35_4[1], B001_35_4);
        report.addValue(reportID, "comprehensiveIncome", keysForB001_35_4[2], B001_35_4);

        int256 B034 = int256(EP002 + EP003);
        string[] memory keysForB034 = new string[](1);
        keysForB034[0] = "income.details.depositFee.breakdown.ETH.amount";
        report.addValue(reportID, "comprehensiveIncome", keysForB034[0], B034);
    }

    function computeCashFlow() internal {
        int256 C001_53 = int256((EP001 - EP002) * EP005);
        string[] memory keysForC001_53 = new string[](2);
        keysForC001_53[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.weightedAverageCost"; 
        keysForC001_53[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.ETH.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC001_53[0], C001_53);
        report.addValue(reportID, "cashFlow", keysForC001_53[1], C001_53);

        int256 C052 = int256(EP001 - EP002);
        string[] memory keysForC052 = new string[](1);
        keysForC052[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.ETH.amount"; 
        report.addValue(reportID, "cashFlow", keysForC052[0], C052);

        int256 C004_73 = int256((EP002 + EP003) * EP005);
        string[] memory keysForC004_73 = new string[](2);
        keysForC004_73[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost"; 
        keysForC004_73[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC004_73[0], C004_73);
        report.addValue(reportID, "cashFlow", keysForC004_73[1], C004_73);

        int256 C072 = int256(EP002 + EP003);
        string[] memory keysForC072 = new string[](1);
        keysForC072[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.amount"; 
        report.addValue(reportID, "cashFlow", keysForC072[0], C072);

        int256 C007_8 = int256((EP001 + EP003) * EP005);
        string[] memory keysForC007_8 = new string[](2);
        keysForC007_8[0] = "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost"; 
        keysForC007_8[1] = "otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC007_8[0], C007_8);
        report.addValue(reportID, "cashFlow", keysForC007_8[1], C007_8);
    }
}