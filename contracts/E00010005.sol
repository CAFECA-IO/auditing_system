// SPDX-License-Identifier: MIT
// 傳進rate的值
pragma solidity ^0.8.0;
import "./TransactionContract.sol";
import "./reports.sol";
import "./parser.sol";

contract E00010005 {

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
        emit EventEP001(Iparser.bytes32ToString(_eventId), EP001,EP002,EP003,EP004,EP006);
        
        computeBalanceSheet();
        computeComprehesiveIncome();
        computeCashFlow();
    }

    function computeBalanceSheet() internal  {

        int256 A001_4_5_16 = int256((((-EP001) + EP002 + EP003) * latestSP003 + ((-EP004) * latestSP003))/10**18);
        string[] memory keysForA001_4_5_16 = new string[](4);
        keysForA001_4_5_16[0] = "assets.details.cryptocurrency.totalAmountFairValue";
        keysForA001_4_5_16[1] = "assets.totalAmountFairValue";
        keysForA001_4_5_16[2] = "totalAssetsFairValue";
        keysForA001_4_5_16[3] = "assets.details.cryptocurrency.breakdown.ETH.fairValue";
        report.addValue(reportID, "balanceSheet", keysForA001_4_5_16[0], A001_4_5_16);
        report.addValue(reportID, "balanceSheet", keysForA001_4_5_16[1], A001_4_5_16);
        report.addValue(reportID, "balanceSheet", keysForA001_4_5_16[2], A001_4_5_16);
        report.addValue(reportID, "balanceSheet", keysForA001_4_5_16[3], A001_4_5_16);

        int256 A015 = int256((((-EP001) + EP002 + EP003) + (-EP004))/10**18);
        string[] memory keysForA015 = new string[](1);
        keysForA015[0] = "assets.details.cryptocurrency.breakdown.ETH.amount";
        report.addValue(reportID, "balanceSheet", keysForA015[0], A015);

        int256 A006_43_9 = int256(((-EP001) * latestSP003)/10**18);
        string[] memory keysForA006_43_9 = new string[](3);
        keysForA006_43_9[0] = "liabilities.details.userDeposit.totalAmountFairValue";
        keysForA006_43_9[1] = "liabilities.details.userDeposit.breakdown.ETH.fairValue";
        keysForA006_43_9[2] = "liabilities.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA006_43_9[0], A006_43_9);
        report.addValue(reportID, "balanceSheet", keysForA006_43_9[1], A006_43_9);
        report.addValue(reportID, "balanceSheet", keysForA006_43_9[2], A006_43_9);

        int256 A042 = int256((-EP001));
        string[] memory keysForA042 = new string[](1);
        keysForA042[0] = "liabilities.details.userDeposit.breakdown.ETH.amount";
        report.addValue(reportID, "balanceSheet", keysForA042[0], A042);

        int256 A010_13_18 = int256(((EP002 + EP003) * latestSP003 + ((-EP004) * latestSP003))/10**18);
        string[] memory keysForA010_13_18 = new string[](3);
        keysForA010_13_18[0] = "equity.details.retainedEarnings.totalAmountFairValue";
        keysForA010_13_18[1] = "equity.totalAmountFairValue";
        keysForA010_13_18[2] = "equity.details.retainedEarnings.breakdown.ETH.fairValue";
        report.addValue(reportID, "balanceSheet", keysForA010_13_18[0], A010_13_18);
        report.addValue(reportID, "balanceSheet", keysForA010_13_18[1], A010_13_18);
        report.addValue(reportID, "balanceSheet", keysForA010_13_18[1], A010_13_18);

        int256 A017 = int256((EP002 + EP003) + (-EP004));
        string[] memory keysForA017 = new string[](1);
        keysForA017[0] = "equity.details.retainedEarnings.breakdown.ETH.amount";
        report.addValue(reportID, "balanceSheet", keysForA017[0], A017);


        int256 A014 = int256(((EP001 + EP003) * latestSP003 + (-EP004 * latestSP003))/10**18);
        string[] memory keysForA014 = new string[](1);
        keysForA014[0] = "totalLiabilitiesAndEquityFairValue";
        report.addValue(reportID, "balanceSheet", keysForA014[0], A014);
    }

    function computeComprehesiveIncome() internal {

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
    
        int256 B008_10 = int256( (((-EP004) * EP006))/10**18);
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

        int256 C009_57 = int256(((-EP001) * EP006)/10**18);
        string[] memory keysForC009_57 = new string[](2);
        keysForC009_57[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost"; 
        keysForC009_57[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC009_57[0], C009_57);
        report.addValue(reportID, "cashFlow", keysForC009_57[1], C009_57);

        int256 C056 = int256((-EP001));
        string[] memory keysForC056 = new string[](1);
        keysForC056[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.amount"; 
        report.addValue(reportID, "cashFlow", keysForC056[0], C056);

        int256 C072 = int256(EP002 + EP003);
        string[] memory keysForC072 = new string[](1);
        keysForC072[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.amount"; 
        report.addValue(reportID, "cashFlow", keysForC072[0], C072);

        int256 C004_73 = int256( ((EP002 + EP003) * EP006)/10**18);
        string[] memory keysForC004_73 = new string[](2);
        keysForC004_73[0] = "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost"; 
        keysForC004_73[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesEndOfPeriod";
        report.addValue(reportID, "cashFlow", keysForC004_73[0], C004_73);
        report.addValue(reportID, "cashFlow", keysForC004_73[1], C004_73);

        int256 C012_14 = int256(((-EP004) * EP006)/10**18);
        string[] memory keysForC012_14 = new string[](2);
        keysForC012_14[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost"; 
        keysForC012_14[1] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC012_14[0], C012_14);
        report.addValue(reportID, "cashFlow", keysForC012_14[1], C012_14);

        int256 C013 = int256((-EP004));
        string[] memory keysForC013 = new string[](1);
        keysForC013[0] = "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.amount"; 
        report.addValue(reportID, "cashFlow", keysForC013[0], C013);

        int256 C007_8 = int256( ((-EP001 + EP002 + EP003) * EP006 + (-EP004 * EP006))/10**18);
        string[] memory keysForC007_8 = new string[](2);
        keysForC007_8[0] = "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost"; 
        keysForC007_8[1] = "otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC007_8[0], C007_8);
        report.addValue(reportID, "cashFlow", keysForC007_8[1], C007_8);

    }
}