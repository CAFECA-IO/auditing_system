// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./transaction_contract.sol";
import "./reports.sol";
import "./parser.sol";
import "../interfaces/i_transaction_handler.sol";
// Info: (20231115 - Yang) {This is handler is to store data recorded in TransactionContract, the logic is the same in other handlers smart contract}
contract E00010002Handler is ITransactionHandler {

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
    int256 EP004;
    int256 EP005;
    string  eventIdFromTimeSpan;
    string reportName;

    constructor(address _transactionContractAddress, address _Parser ,address _reportAddress) {
        transactionContract = TransactionContract(_transactionContractAddress);
        Iparser = IParser(_Parser);
        report = Reports(_reportAddress);
    }

    function processTransaction(bytes32[] memory data, address recorder) external override {

        require(data.length == 7, "Data length for E00010002 must be 7");

        bytes32[] memory paramKeys = new bytes32[](5);
        int256[] memory paramValues = new int256[](5);

        paramKeys[0] = Iparser.stringToBytes32("EP001");
        paramValues[0] = int256(uint256(data[2]));
        paramKeys[1] = Iparser.stringToBytes32("EP002");
        paramValues[1] = int256(uint256(data[3]));
        paramKeys[2] = Iparser.stringToBytes32("EP003");
        paramValues[2] = int256(uint256(data[4]));
        paramKeys[3] = Iparser.stringToBytes32("trans_time");
        paramValues[3] = int256(uint256(data[5]));
        paramKeys[4] = Iparser.stringToBytes32("EP005");
        paramValues[4] = int256(uint256(data[6]));


        transactionContract.addProcessedTransaction(data[0], data[1], recorder, paramKeys, paramValues);
    }

    function getEventIdAndRate(bytes32 _eventId,bytes32 _reportName ,bytes32 _SP002, bytes32 _SP003, bytes32 _SP004) external override{
        latestSP002 = int256(uint256(_SP002));
        latestSP003 = int256(uint256(_SP003));
        latestSP004 = int256(uint256(_SP004));
        eventIdFromTimeSpan = Iparser.bytes32ToString(_eventId);
        reportName = Iparser.bytes32ToString(_reportName);
        emit EventIdAndRateReceived(eventIdFromTimeSpan, latestSP002, latestSP003, latestSP004);

        EP001  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP001"));
        EP002  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP002"));
        EP003  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP003"));
        EP004  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("trans_time"));
        EP005  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP005"));
        emit EventEP001(Iparser.bytes32ToString(_eventId), EP001,EP002,EP003,EP005);

        computeBalanceSheet();
        computeComprehesiveIncome();
        computeCashFlow();
    }

    function computeBalanceSheet() internal  {

        int256 A001_4_5_14_16 = int256(((EP001 + EP003) * latestSP003)/10**18);
        report.addValue(reportName, "balanceSheet", "assets.details.cryptocurrency.totalAmountFairValue", A001_4_5_14_16);
        report.addValue(reportName, "balanceSheet", "assets.totalAmountFairValue", A001_4_5_14_16);
        report.addValue(reportName, "balanceSheet", "totalAssetsFairValue", A001_4_5_14_16);
        report.addValue(reportName, "balanceSheet", "totalLiabilitiesAndEquityFairValue", A001_4_5_14_16);
        report.addValue(reportName, "balanceSheet", "assets.details.cryptocurrency.breakdown.ETH.fairValue", A001_4_5_14_16);

        int256 A015 = int256(EP001 + EP003);
        report.addValue(reportName, "balanceSheet", "assets.details.cryptocurrency.breakdown.ETH.amount", A015);

        int256 A006_43_9 = int256(((EP001 - EP002) * latestSP003)/10**18);
        report.addValue(reportName, "balanceSheet", "liabilities.details.userDeposit.totalAmountFairValue", A006_43_9);
        report.addValue(reportName, "balanceSheet", "liabilities.details.userDeposit.breakdown.ETH.fairValue", A006_43_9);
        report.addValue(reportName, "balanceSheet", "liabilities.totalAmountFairValue", A006_43_9);

        int256 A010_18_13 = int256(((EP002 + EP003) * latestSP003)/10**18);
        report.addValue(reportName, "balanceSheet", "equity.details.retainedEarnings.totalAmountFairValue", A010_18_13);
        report.addValue(reportName, "balanceSheet","equity.details.retainedEarnings.breakdown.ETH.fairValue", A010_18_13);
        report.addValue(reportName, "balanceSheet", "equity.totalAmountFairValue", A010_18_13);

        int256 A017 = int256(EP002 + EP003);
        report.addValue(reportName, "balanceSheet", "equity.details.retainedEarnings.breakdown.ETH.amount", A017);

        int256 A042 = int256(EP001 - EP002);
        report.addValue(reportName, "balanceSheet", "liabilities.details.userDeposit.breakdown.ETH.amount", A042);
    }

    function computeComprehesiveIncome() internal {

        int256 B001_35_4 = int256(((EP002 + EP003) * EP005)/10**18);
        report.addValue(reportName, "comprehensiveIncome", "income.details.depositFee.weightedAverageCost", B001_35_4);
        report.addValue(reportName, "comprehensiveIncome", "income.details.depositFee.breakdown.ETH.weightedAverageCost", B001_35_4);
        report.addValue(reportName, "comprehensiveIncome", "netProfit", B001_35_4);

        int256 B034 = int256(EP002 + EP003);
        report.addValue(reportName, "comprehensiveIncome", "income.details.depositFee.breakdown.ETH.amount", B034);
    }

    function computeCashFlow() internal {
        int256 C001_53 = int256(((EP001 - EP002) * EP005)/10**18);
        report.addValue(reportName, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.weightedAverageCost", C001_53);
        report.addValue(reportName, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.ETH.weightedAverageCost", C001_53);

        int256 C052 = int256(EP001 - EP002);
        report.addValue(reportName, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesDepositedByCustomers.breakdown.ETH.amount", C052);

        int256 C004_73 = int256(((EP002 + EP003) * EP005)/10**18);
        report.addValue(reportName, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.weightedAverageCost", C004_73);
        report.addValue(reportName, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.weightedAverageCost", C004_73);

        int256 C072 = int256(EP002 + EP003);
        report.addValue(reportName, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.details.cryptocurrenciesReceivedFromCustomersAsTransactionFees.breakdown.ETH.amount", C072);

        int256 C007_8 = int256(((EP001 + EP003) * EP005)/10**18);
        report.addValue(reportName, "cashFlow", "supplementalScheduleOfNonCashOperatingActivities.weightedAverageCost", C007_8);
        report.addValue(reportName, "cashFlow",  "otherSupplementaryItems.details.relatedToNonCash.cryptocurrenciesEndOfPeriod.weightedAverageCost", C007_8);
    }
}
