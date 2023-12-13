// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./transaction_contract.sol";
import "./reports.sol";
import "./parser.sol";
import "../interfaces/iTransaction_handler.sol";
//Info: (20231115 - Yang){This contract is to calculate the variables based on the excel reports, and to record transaction data from transactionContract.sol, the logic is the same in other handlers contracts}
contract E00010001Handler is ITransactionHandler{

    Reports public report;
    IParser public Iparser;
    TransactionContract private transactionContract;

    event EventIdAndRateReceived(string eventId, int256 SP002, int256 SP003, int256 SP004);
    event EventEP001(string eventId, int256 EP001,int256 EP002,int256 EP003,int256 EP005);
    int256 latestSP002;
    int256 latestSP003;
    int256 latestSP004;
    int256 EP001;
    int256 EP002;
    int256 EP003;
    int256 EP005;
    string eventIdFromTimeSpan;
    string reportID;

    constructor(address _transactionContractAddress, address _Parser ,address _reportAddress) {
        transactionContract = TransactionContract(_transactionContractAddress);
        Iparser = IParser(_Parser);
        report = Reports(_reportAddress);
    }

    //Info: (20231115 - Yang){This is function is to record event data in arrays}
    function processTransaction(bytes32[] memory data, address recorder) external override {

        require(data.length == 6, "Data length for E00010001 must be 6");

        bytes32[] memory paramKeys = new bytes32[](5);
        int256[] memory paramValues = new int256[](5);

        paramKeys[0] = Iparser.stringToBytes32("EP001");
        paramValues[0] = int256(uint256(data[2]));
        paramKeys[1] = Iparser.stringToBytes32("EP002");
        paramValues[1] = int256(uint256(data[3]));
        paramKeys[2] = Iparser.stringToBytes32("EP003");
        paramValues[2] = int256(uint256(data[4]));
        paramKeys[3] = Iparser.stringToBytes32("trans_time");
        paramValues[3] = int256(block.timestamp);
        paramKeys[4] = Iparser.stringToBytes32("EP005");
        paramValues[4] = int256(uint256(data[5]));


        transactionContract.addProcessedTransaction(data[0], data[1], recorder, paramKeys, paramValues);
    }

    /*Info: (20231115 - Yang){This function gets the rates and eventIDs, then calls transactionContract to get full data based on the eventIDs,
    finally, store them in variables in order to calculate}*/
    function getEventIdAndRate(bytes32 _eventId,bytes32 _reportID ,bytes32 _SP002, bytes32 _SP003, bytes32 _SP004) external override{
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

    //Info: (20231115 - Yang){This contract calculates BalanceSheet's column, then add them to existing column in report.sol contract}
    function computeBalanceSheet() internal  {

        int256 A001_3_4_5_14 = int256(((EP001 + EP003) * latestSP002) / 10**18);
        report.addValue(reportID, "balanceSheet", "assets.details.cryptocurrency.totalAmountFairValue", A001_3_4_5_14);
        report.addValue(reportID, "balanceSheet", "assets.details.cryptocurrency.breakdown.USDT.fairValue", A001_3_4_5_14);
        report.addValue(reportID, "balanceSheet", "assets.totalAmountFairValue", A001_3_4_5_14);
        report.addValue(reportID, "balanceSheet", "totalAssetsFairValue", A001_3_4_5_14);
        report.addValue(reportID, "balanceSheet", "totalLiabilitiesAndEquityFairValue", A001_3_4_5_14);

        int256 A002 = int256(EP001 + EP003);
        report.addValue(reportID, "balanceSheet", "assets.details.cryptocurrency.breakdown.USDT.amount", A002);

        int256 A006_8_9 = int256(((EP001 - EP002) * latestSP002)/ 10**18);
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.totalAmountFairValue", A006_8_9);
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.breakdown.USDT.fairValue", A006_8_9);
        report.addValue(reportID, "balanceSheet", "liabilities.totalAmountFairValue", A006_8_9);

        int256 A007 = int256(EP001 - EP002);
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.breakdown.USDT.amount", A007);

        int256 A010_12_13 = int256(((EP002 + EP003) * latestSP002)/ 10**18);
        report.addValue(reportID, "balanceSheet", "equity.details.retainedEarnings.totalAmountFairValue", A010_12_13);
        report.addValue(reportID, "balanceSheet", "equity.details.retainedEarnings.breakdown.USDT.fairValue", A010_12_13);
        report.addValue(reportID, "balanceSheet", "equity.totalAmountFairValue", A010_12_13);

        int256 A011 = int256(EP002 + EP003);
        report.addValue(reportID, "balanceSheet", "equity.details.retainedEarnings.breakdown.USDT.amount", A011);
    }

    //Info: (20231115 - Yang){This contract calculates comprehensiveIncome's column, then add them to existing column in report.sol contract}
    function computeComprehesiveIncome() internal {
        int256 B001_3_4 = int256(((EP002 + EP003) * EP005)/ 10**18);
        report.addValue(reportID, "comprehensiveIncome", "income.details.depositFee.weightedAverageCost", B001_3_4);
        report.addValue(reportID, "comprehensiveIncome", "income.details.depositFee.breakdown.USDT.weightedAverageCost", B001_3_4);
        report.addValue(reportID, "comprehensiveIncome", "netProfit", B001_3_4);

        int256 B002 = int256(EP002 + EP003);
        report.addValue(reportID, "comprehensiveIncome", "income.details.depositFee.breakdown.USDT.amount", B002);
    }

    //Info: (20231115 - Yang){This contract calculates cashFlow's column, then add them to existing column in report.sol contract}
    function computeCashFlow() internal {
        int256 C001_3 = int256(((EP001 - EP002) * EP005)/ 10**18);
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.weightedAverageCost", C001_3);
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.weightedAverageCost", C001_3);

        int256 C002 = int256(EP001 - EP002);
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.USDT.amount", C002);

        int256 C004_6 = int256(((EP002 + EP003) * EP005)/ 10**18);
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost", C004_6);
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.weightedAverageCost", C004_6);

        int256 C005 = int256(EP002 + EP003);
        report.addValue(reportID, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.USDT.amount", C005);

        int256 C007_8 = int256(((EP001 + EP003) * EP005)/ 10**18);
        report.addValue(reportID, "cashFlow",  "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost", C007_8);
        report.addValue(reportID, "cashFlow", "otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost", C007_8);
    }
}
