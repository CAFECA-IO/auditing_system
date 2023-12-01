// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./transactionContract.sol";
import "./reports.sol";
import "./parser.sol";
import "../interfaces/iTransactionHandler.sol";

contract E00010005Handler is ITransactionHandler {

    Reports public report;
    IParser public Iparser;
    TransactionContract private transactionContract;

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

    constructor(address _transactionContractAddress, address _Parser ,address _reportAddress) {
        transactionContract = TransactionContract(_transactionContractAddress);
        Iparser = IParser(_Parser);
        report = Reports(_reportAddress);
    }

    function processTransaction(bytes32[] memory data, address recorder) external override {
   
        require(data.length == 7, "Data length for E00010005 must be 7");
        
        bytes32[] memory paramKeys = new bytes32[](6);
        int256[] memory paramValues = new int256[](6);
        
        paramKeys[0] = Iparser.stringToBytes32("EP001");
        paramValues[0] = int256(uint256(data[2]));
        paramKeys[1] = Iparser.stringToBytes32("EP002");
        paramValues[1] = int256(uint256(data[3]));
        paramKeys[2] = Iparser.stringToBytes32("EP003");
        paramValues[2] = int256(uint256(data[4]));
        paramKeys[3] = Iparser.stringToBytes32("EP004");
        paramValues[3] = int256(uint256(data[5]));
        paramKeys[4] = Iparser.stringToBytes32("trans_time");
        paramValues[4] = int256(block.timestamp);
        paramKeys[5] = Iparser.stringToBytes32("EP006");
        paramValues[5] = int256(uint256(data[6]));
      

    
        transactionContract.addProcessedTransaction(data[0], data[1], recorder, paramKeys, paramValues);
    }

    function getEventIdAndRate(bytes32 _eventId,bytes32 _reportID ,bytes32 _SP002, bytes32 _SP003, bytes32 _SP004) external {
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
        report.addValue(reportID, "balanceSheet", "assets.details.cryptocurrency.totalAmountFairValue", A001_4_5_16);
        report.addValue(reportID, "balanceSheet", "assets.totalAmountFairValue", A001_4_5_16);
        report.addValue(reportID, "balanceSheet", "totalAssetsFairValue", A001_4_5_16);
        report.addValue(reportID, "balanceSheet", "assets.details.cryptocurrency.breakdown.ETH.fairValue", A001_4_5_16);

        int256 A015 = int256((((-EP001) + EP002 + EP003) + (-EP004))/10**18);
        report.addValue(reportID, "balanceSheet", "assets.details.cryptocurrency.breakdown.ETH.amount", A015);

        int256 A006_43_9 = int256(((-EP001) * latestSP003)/10**18);
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.totalAmountFairValue", A006_43_9);
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.breakdown.ETH.fairValue", A006_43_9);
        report.addValue(reportID, "balanceSheet", "liabilities.totalAmountFairValue", A006_43_9);

        int256 A042 = int256((-EP001));
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.breakdown.ETH.amount", A042);

        int256 A010_13_18 = int256(((EP002 + EP003) * latestSP003 + ((-EP004) * latestSP003))/10**18);
        report.addValue(reportID, "balanceSheet", "equity.details.retainedEarnings.totalAmountFairValue", A010_13_18);
        report.addValue(reportID, "balanceSheet", "equity.totalAmountFairValue", A010_13_18);
        report.addValue(reportID, "balanceSheet", "equity.details.retainedEarnings.breakdown.ETH.fairValue", A010_13_18);

        int256 A017 = int256((EP002 + EP003) + (-EP004));
        report.addValue(reportID, "balanceSheet", "equity.details.retainedEarnings.breakdown.ETH.amount", A017);


        int256 A014 = int256(((EP001 + EP003) * latestSP003 + (-EP004 * latestSP003))/10**18);
        report.addValue(reportID, "balanceSheet", "totalLiabilitiesAndEquityFairValue", A014);
    }

    function computeComprehesiveIncome() internal {

        int256 B005_7 = int256(((EP002 + EP003) * EP006)/10**18);
        report.addValue(reportID, "comprehensiveIncome", "income.details.withdrawalFee.weightedAverageCost", B005_7);
        report.addValue(reportID, "comprehensiveIncome", "income.details.withdrawalFee.breakdown.USDT.weightedAverageCost", B005_7);

        int256 B006 = int256(EP002 + EP003);
        report.addValue(reportID, "comprehensiveIncome", "income.details.withdrawalFee.breakdown.USDT.amount", B006);
    
        int256 B008_10 = int256( (((-EP004) * EP006))/10**18);
        report.addValue(reportID, "comprehensiveIncome","costs.details.technicalProviderFee.weightedAverageCost", B008_10);
        report.addValue(reportID, "comprehensiveIncome","costs.details.technicalProviderFee.breakdown.ETH.fairValue", B008_10);

        int256 B009 = int256((-EP004));
        report.addValue(reportID, "comprehensiveIncome", "costs.details.technicalProviderFee.breakdown.ETH.amount", B009);
    }

    function computeCashFlow() internal {

        int256 C009_57 = int256(((-EP001) * EP006)/10**18);
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.weightedAverageCost", C009_57);
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.weightedAverageCost", C009_57);

        int256 C056 = int256((-EP001));
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesWithdrawnByCustomers.breakdown.ETH.amount", C056);

        int256 C072 = int256(EP002 + EP003);
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.amount", C072);

        int256 C004_73 = int256( ((EP002 + EP003) * EP006)/10**18);
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost", C004_73);
        report.addValue(reportID, "cashFlow",  "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesEndOfPeriod", C004_73);

        int256 C012_14 = int256(((-EP004) * EP006)/10**18);
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.weightedAverageCost", C012_14);
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.weightedAverageCost", C012_14);

        int256 C013 = int256((-EP004));
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesPaidToSuppliersForExpenses.breakdown.ETH.amount", C013);

        int256 C007_8 = int256( ((-EP001 + EP002 + EP003) * EP006 + (-EP004 * EP006))/10**18);
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost", C007_8);
        report.addValue(reportID, "cashFlow", "otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost", C007_8);

    }
}
