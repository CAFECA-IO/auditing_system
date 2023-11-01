// SPDX-License-Identifier: MIT
// 傳進rate的值
pragma solidity ^0.8.0;
import "./eventTransactionBytes32.sol";
import "./reports.sol";
import "./parser.sol";

contract E00010006 {

    Reports public report;

    event EventIdAndRateReceived(string eventId, int256 SP002, int256 SP003, int256 SP004);
    event EventEP001(string eventId, int256 EP001,int256 EP002,int256 EP003,int256 EP004,int256 EP006);
    int256 latestSP002;
    int256 latestSP003;
    int256 latestSP004;
    int256 EP001;
    int256 EP002;
    int256 EP003;
    int256 EP004;
    int256 EP006;
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
        EP004  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP004"));
        EP006  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP006"));
        emit EventEP001(Iparser.bytes32ToString(_eventId), EP001,EP002,EP003,EP004,EP006);
        
        computeBalanceSheet();
        computeComprehesiveIncome();
        computeCashFlow();
    }

    function computeBalanceSheet() internal  {

        int256 A001_4_5_47 = int256(((-EP001) + EP002 + EP003) * latestSP004 + ((-EP004) * latestSP004));
        string[] memory keysForA001_4_5_47 = new string[](4);
        keysForA001_4_5_47[0] = "assets.details.cryptocurrency.totalAmountFairValue";
        keysForA001_4_5_47[1] = "assets.totalAmountFairValue";
        keysForA001_4_5_47[2] = "totalAssetsFairValue";
        keysForA001_4_5_47[3] = "assets.details.cryptocurrency.breakdown.BTC.fairValue";
        report.addValue(reportID, "balanceSheet", keysForA001_4_5_47[0], A001_4_5_47);
        report.addValue(reportID, "balanceSheet", keysForA001_4_5_47[1], A001_4_5_47);
        report.addValue(reportID, "balanceSheet", keysForA001_4_5_47[2], A001_4_5_47);
        report.addValue(reportID, "balanceSheet", keysForA001_4_5_47[3], A001_4_5_47);

        int256 A046 = int256(((-EP001) + EP002 + EP003) + (-EP004));
        string[] memory keysForA046 = new string[](1);
        keysForA046[0] = "assets.details.cryptocurrency.breakdown.BTC.amount";
        report.addValue(reportID, "balanceSheet", keysForA046[0], A046);

        int256 A006_45_9 = int256((-EP001) * latestSP004);
        string[] memory keysForA006_45_9 = new string[](3);
        keysForA006_45_9[0] = "liabilities.details.userDeposit.totalAmountFairValue";
        keysForA006_45_9[1] = "liabilities.details.userDeposit.breakdown.BTC.fairValue";
        keysForA006_45_9[2] = "liabilities.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA006_45_9[0], A006_45_9);
        report.addValue(reportID, "balanceSheet", keysForA006_45_9[1], A006_45_9);
        report.addValue(reportID, "balanceSheet", keysForA006_45_9[2], A006_45_9);

        int256 A044 = int256((-EP001));
        string[] memory keysForA044 = new string[](1);
        keysForA044[0] = "liabilities.details.userDeposit.breakdown.BTC.amount";
        report.addValue(reportID, "balanceSheet", keysForA044[0], A044);

        int256 A010 = int256((EP002 + EP003) * latestSP004 + ((-EP004) * latestSP004));
        string[] memory keysForA010 = new string[](1);
        keysForA010[0] = "equity.details.retainedEarnings.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA010[0], A010);
        report.addValue(reportID, "balanceSheet", keysForA010[1], A010);

        int256 A048 = int256((EP002 + EP003) + (-EP004));
        string[] memory keysForA048 = new string[](1);
        keysForA048[0] = "equity.details.retainedEarnings.breakdown.BTC.amount";
        report.addValue(reportID, "balanceSheet", keysForA048[0], A048);

        int256 A049_13 = int256((EP002 + EP003) * latestSP003 + (-EP004 * latestSP004));
        string[] memory keysForA049_13 = new string[](2);
        keysForA049_13[0] = "equity.details.retainedEarnings.breakdown.BTC.fairValue";
        keysForA049_13[1] = "equity.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA049_13[0], A049_13);
        report.addValue(reportID, "balanceSheet", keysForA049_13[1], A049_13);

        int256 A014 = int256((EP001 + EP003) * latestSP003 + (-EP004 * latestSP004));
        string[] memory keysForA014 = new string[](1);
        keysForA014[0] = "totalLiabilitiesAndEquityFairValue";
        report.addValue(reportID, "balanceSheet", keysForA014[0], A014);
    }

    function computeComprehesiveIncome() internal {

        int256 B005_43 = int256((EP002 + EP003) * EP006);
        string[] memory keysForB005_43 = new string[](2);
        keysForB005_43[0] = "income.details.withdrawalFee.weightedAverageCost";
        keysForB005_43[1] = "income.details.withdrawalFee.breakdown.BTC.weightedAverageCost";
        report.addValue(reportID, "comprehensiveIncome", keysForB005_43[0], B005_43);
        report.addValue(reportID, "comprehensiveIncome", keysForB005_43[1], B005_43);

        int256 B042 = int256(EP002 + EP003);
        string[] memory keysForB042 = new string[](1);
        keysForB042[0] = "income.details.withdrawalFee.breakdown.BTC.amount";
        report.addValue(reportID, "comprehensiveIncome", keysForB042[0], B042);

        int256 B008_95_30 = int256( ((-EP004) * EP006));
        string[] memory keysForB008_95_30 = new string[](3);
        keysForB008_95_30[0] = "costs.details.technicalProviderFee.weightedAverageCost";
        keysForB008_95_30[1] = "costs.details.technicalProviderFee.breakdown.BTC.fairValue";
        keysForB008_95_30[2] = "netProfit";
        report.addValue(reportID, "comprehensiveIncome", keysForB008_95_30[0], B008_95_30);

        int256 B004 = int256((EP002 + EP003) * EP006 + (-EP004 * EP006));
        string[] memory keysForB004 = new string[](1);
        keysForB004[0] = "costs.details.technicalProviderFee.breakdown.BTC.amount";
        report.addValue(reportID, "comprehensiveIncome", keysForB004[0], B004);
    }

    function computeCashFlow() internal {

        int256 C009_59 = int256(((-EP001) * EP006));
        string[] memory keysForC009_59 = new string[](2);
        keysForC009_59[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost"; 
        keysForC009_59[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC009_59[0], C009_59);
        report.addValue(reportID, "cashFlow", keysForC009_59[1], C009_59);

        int256 C058 = int256((-EP001));
        string[] memory keysForC058 = new string[](1);
        keysForC058[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.BTC.amount"; 
        report.addValue(reportID, "cashFlow", keysForC058[0], C058);

        int256 C074 = int256(EP002 + EP003);
        string[] memory keysForC074 = new string[](1);
        keysForC074[0] = " supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.BTC.weightedAverageCost"; 
        report.addValue(reportID, "cashFlow", keysForC074[0], C074);

        int256 C004_75 = int256( (EP002 + EP003) * EP006);
        string[] memory keysForC004_75 = new string[](2);
        keysForC004_75[0] = "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost"; 
        keysForC004_75[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC004_75[0], C004_75);
        report.addValue(reportID, "cashFlow", keysForC004_75[1], C004_75);

        int256 C012_109 = int256((-EP004) * EP006);
        string[] memory keysForC012_109 = new string[](2);
        keysForC012_109[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost"; 
        keysForC012_109[1] = "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC012_109[0], C012_109);
        report.addValue(reportID, "cashFlow", keysForC012_109[1], C012_109);

        int256 C108 = int256((-EP004));
        string[] memory keysForC108 = new string[](1);
        keysForC108[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.BTC.weightedAverageCost"; 
        report.addValue(reportID, "cashFlow", keysForC108[0], C108);

        int256 C007_8 = int256( (-EP001 + EP002 + EP003) * EP006 + (-EP004 * EP006));
        string[] memory keysForC007_8 = new string[](2);
        keysForC007_8[0] = "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost"; 
        keysForC007_8[1] = "otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC007_8[0], C007_8);
        report.addValue(reportID, "cashFlow", keysForC007_8[1], C007_8);
    }
}