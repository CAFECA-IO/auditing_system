// SPDX-License-Identifier: MIT
// 傳進rate的值
pragma solidity ^0.8.0;
import "./TransactionContract.sol";
import "./reports.sol";
import "./parser.sol";

contract E00010004 {

    Reports public report;

    event EventIdAndRateReceived(string eventId, int256 SP002, int256 SP003, int256 SP004);
    event EventEP001(string eventId, int256 EP001,int256 EP002,int256 EP003,int256 EP004,int256 EP006, int256 EP007);
    int256 latestSP002;
    int256 latestSP003;
    int256 latestSP004;
    int256 EP001;
    int256 EP002;
    int256 EP003;
    int256 EP004;
    int256 EP006;
    int256 EP007;
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
        latestSP002 = int256(uint256(_SP002)   );
        latestSP003 = int256(uint256(_SP003)   );
        latestSP004 = int256(uint256(_SP004)   );
        eventIdFromTimeSpan = Iparser.bytes32ToString(_eventId);
        reportID = Iparser.bytes32ToString(_reportID);
        emit EventIdAndRateReceived(eventIdFromTimeSpan, latestSP002, latestSP003, latestSP004);
        
        EP001  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP001"));
        EP002  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP002"));
        EP003  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP003"));
        EP004  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP004"));
        EP006  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP006"));
        EP007  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP007"));
        emit EventEP001(Iparser.bytes32ToString(_eventId), EP001,EP002,EP003,EP004,EP006,EP007);
        
        computeBalanceSheet();
        computeComprehesiveIncome();
        computeCashFlow();
    }

    function computeBalanceSheet() internal  {

        int256 A001_4_5 = int256( (((- EP001) + EP002 + EP003) * latestSP002 +(latestSP003 * (-EP004)))/10**18);
        string[] memory keysForA001_4_5 = new string[](3);
        keysForA001_4_5[0] = "assets.details.cryptocurrency.totalAmountFairValue";
        keysForA001_4_5[1] = "assets.totalAmountFairValue";
        keysForA001_4_5[2] = "totalAssetsFairValue";
        report.addValue(reportID, "balanceSheet", keysForA001_4_5[0], A001_4_5);
        report.addValue(reportID, "balanceSheet", keysForA001_4_5[1], A001_4_5);
        report.addValue(reportID, "balanceSheet", keysForA001_4_5[2], A001_4_5);

        int256 A002 = int256((-EP001) + EP002 + EP003);
        string[] memory keysForA002 = new string[](1);
        keysForA002[0] = "assets.details.cryptocurrency.breakdown.USDT.amount";
        report.addValue(reportID, "balanceSheet", keysForA002[0], A002);

        int256 A003 = int256((((-EP001) + EP002 + EP003) * latestSP002)/10**18);
        string[] memory keysForA003 = new string[](1);
        keysForA003[0] = "assets.details.cryptocurrency.breakdown.USDT.fairValue";
        report.addValue(reportID, "balanceSheet", keysForA003[0], A003);

        int256 A006_8_9 = int256(((-EP001) * latestSP002)/10**18);
        string[] memory keysForA006_8_9 = new string[](3);
        keysForA006_8_9[0] = "liabilities.details.userDeposit.totalAmountFairValue";
        keysForA006_8_9[1] = "liabilities.details.userDeposit.breakdown.USDT.fairValue";
        keysForA006_8_9[2] = "liabilities.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA006_8_9[0], A006_8_9);
        report.addValue(reportID, "balanceSheet", keysForA006_8_9[1], A006_8_9);
        report.addValue(reportID, "balanceSheet", keysForA006_8_9[2], A006_8_9);

        int256 A007 = int256((-EP001));
        string[] memory keysForA007 = new string[](1);
        keysForA007[0] = "liabilities.details.userDeposit.breakdown.USDT.amount";
        report.addValue(reportID, "balanceSheet", keysForA007[0], A007);

        int256 A010_13 = int256(((EP002 + EP003) * latestSP002 + ((-EP004) * latestSP003))/10**18);
        string[] memory keysForA010_13 = new string[](2);
        keysForA010_13[0] = "equity.details.retainedEarnings.totalAmountFairValue";
        keysForA010_13[1] = "equity.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA010_13[0], A010_13);
        report.addValue(reportID, "balanceSheet", keysForA010_13[1], A010_13);

        int256 A011 = int256(EP002 + EP003);
        string[] memory keysForA011 = new string[](1);
        keysForA011[0] = "equity.details.retainedEarnings.breakdown.USDT.amount";
        report.addValue(reportID, "balanceSheet", keysForA011[0], A011);

        int256 A012 = int256(((EP002 + EP003) * latestSP002)/10**18);
        string[] memory keysForA012 = new string[](1);
        keysForA012[0] = "equity.details.retainedEarnings.breakdown.USDT.fairValue";
        report.addValue(reportID, "balanceSheet", keysForA012[0], A012);
        
        int256 A014 = int256(((EP001 + EP003) * latestSP002 + ((-EP004) * latestSP003))/10**18);
        string[] memory keysForA014 = new string[](1);
        keysForA014[0] = "totalLiabilitiesAndEquityFairValue";
        report.addValue(reportID, "balanceSheet", keysForA014[0], A014);
        
        int256 A015_17 = int256((-EP004));
        string[] memory keysForA015_17 = new string[](2);
        keysForA015_17[0] = "assets.details.cryptocurrency.breakdown.ETH.amount";
        keysForA015_17[1] = "equity.details.retainedEarnings.breakdown.ETH.amount";
        report.addValue(reportID, "balanceSheet", keysForA015_17[0], A015_17);
        report.addValue(reportID, "balanceSheet", keysForA015_17[1], A015_17);

        int256 A016_18 = int256(((-EP004) * latestSP003)/10**18);
        string[] memory keysForA016_18 = new string[](2);
        keysForA016_18[0] = "assets.details.cryptocurrency.breakdown.ETH.fairValue";
        keysForA016_18[1] = "equity.details.retainedEarnings.breakdown.ETH.fairValue";
        report.addValue(reportID, "balanceSheet", keysForA016_18[0], A016_18);
        report.addValue(reportID, "balanceSheet", keysForA016_18[1], A016_18);
    }

    function computeComprehesiveIncome() internal {

        int256 B004 = int256(((EP002 + EP003) * EP006 + ((-EP004) * EP007))/10**18);
        string[] memory keysForB004 = new string[](1);
        keysForB004[0] = "netProfit";
        report.addValue(reportID, "comprehensiveIncome", keysForB004[0], B004);

        int256 B005_7 = int256(((EP002 + EP003) * EP006)/10**18);
        string[] memory keysForB005_7 = new string[](2);
        keysForB005_7[0] = "income.details.withdrawalFee.weightedAverageCost";
        keysForB005_7[1] = "income.details.withdrawalFee.breakdown.USDT.weightedAverageCost";
        report.addValue(reportID, "comprehensiveIncome", keysForB005_7[0], B005_7);
        report.addValue(reportID, "comprehensiveIncome", keysForB005_7[1], B005_7);

        int256 B006 = int256(EP002 + EP003);
        string[] memory keysForB006 = new string[](1);
        keysForB006[0] = "income.details.withdrawalFee.breakdown.USDT.amount";
        report.addValue(reportID, "comprehensiveIncome", keysForB006[0], B006);
        
        int256 B008_10 = int256( (((-EP004) * EP007))/10**18);
        string[] memory keysForB008_10 = new string[](2);
        keysForB008_10[0] = "costs.details.technicalProviderFee.weightedAverageCost";
        keysForB008_10[1] = "costs.details.technicalProviderFee.breakdown.ETH.fairValue";
        report.addValue(reportID, "comprehensiveIncome", keysForB008_10[0], B008_10);

        int256 B009 = int256((-EP004));
        string[] memory keysForB009 = new string[](1);
        keysForB009[0] = "costs.details.technicalProviderFee.breakdown.ETH.amount";
        report.addValue(reportID, "comprehensiveIncome", keysForB009[0], B009);
    }

    function computeCashFlow() internal {

        int256 C005 = int256(EP002 + EP003);
        string[] memory keysForC005 = new string[](1);
        keysForC005[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.amount"; 
        report.addValue(reportID, "cashFlow", keysForC005[0], C005);

        int256 C006 = int256(((EP002 + EP003) * EP006)/10**18);
        string[] memory keysForC006 = new string[](1);
        keysForC006[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.weightedAverageCost"; 
        report.addValue(reportID, "cashFlow", keysForC006[0], C006);

        int256 C007_8 = int256((((-EP001) + EP002 + EP003) * EP006 + ((-EP004) * EP007))/10**18);
        string[] memory keysForC007_8 = new string[](2);
        keysForC007_8[0] = "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost"; 
        keysForC007_8[1] = "otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC007_8[0], C007_8);
        report.addValue(reportID, "cashFlow", keysForC007_8[1], C007_8);

        int256 C009_11 = int256((((-EP001) * EP006))/10**18);
        string[] memory keysForC009_11 = new string[](2);
        keysForC009_11[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost"; 
        keysForC009_11[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.USDT.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC009_11[0], C009_11);
        report.addValue(reportID, "cashFlow", keysForC009_11[1], C009_11);

        int256 C010 = int256((-EP001));
        string[] memory keysForC010 = new string[](1);
        keysForC010[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.USDT.amount"; 
        report.addValue(reportID, "cashFlow", keysForC010[0], C010);

        int256 C012_14 = int256(((-EP004) * EP007)/10**18);
        string[] memory keysForC012_14 = new string[](2);
        keysForC012_14[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost"; 
        keysForC012_14[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC012_14[0], C012_14);
        report.addValue(reportID, "cashFlow", keysForC012_14[1], C012_14);

        int256 C013 = int256((-EP004));
        string[] memory keysForC013 = new string[](1);
        keysForC013[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.amount"; 
        report.addValue(reportID, "cashFlow", keysForC013[0], C013);

    }
}