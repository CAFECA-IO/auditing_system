// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./transaction_contract.sol";
import "./reports.sol";
import "./parser.sol";
import "../interfaces/i_transaction_handler.sol";

contract E00010008Handler is ITransactionHandler {

    Reports public report;
    IParser public Iparser;
    TransactionContract private transactionContract;

    event EventIdAndRateReceived(string eventId, int256 SP002, int256 SP003, int256 SP004);
    event EventEP001(string eventId, int256 EP001,int256 EP002,int256 EP003,int256 EP004,int256 EP006, int256 EP007);
    int256 latestSP002;
    int256 latestSP003;
    int256 latestSP004;
    int256 EP001;
    int256 EP002;
    int256 EP003;
    int256 EP004;
    int256 EP005;
    int256 EP006;
    int256 EP007;
    string eventIdFromTimeSpan;
    string reportName;

    constructor(address _transactionContractAddress, address _Parser ,address _reportAddress) {
        transactionContract = TransactionContract(_transactionContractAddress);
        Iparser = IParser(_Parser);
        report = Reports(_reportAddress);
    }

    function processTransaction(bytes32[] memory data, address recorder) external override {

        require(data.length == 9, "Data length for E00010008 must be 9");

        bytes32[] memory paramKeys = new bytes32[](7);
        int256[] memory paramValues = new int256[](7);

        paramKeys[0] = Iparser.stringToBytes32("EP001");
        paramValues[0] = int256(uint256(data[2])  );
        paramKeys[1] = Iparser.stringToBytes32("EP002");
        paramValues[1] = int256(uint256(data[3])  );
        paramKeys[2] = Iparser.stringToBytes32("EP003");
        paramValues[2] = int256(uint256(data[4])  );
        paramKeys[3] = Iparser.stringToBytes32("EP004");
        paramValues[3] = int256(uint256(data[5])  );
        paramKeys[4] = Iparser.stringToBytes32("trans_time");
        paramValues[4] = int256(uint256(data[6]));
        paramKeys[5] = Iparser.stringToBytes32("EP006");
        paramValues[5] = int256(uint256(data[7]) );
        paramKeys[6] = Iparser.stringToBytes32("EP007");
        paramValues[6] = int256(uint256(data[8]) );


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
        EP004  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP004"));
        EP005  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP005"));
        EP006  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP006"));
        EP007  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP007"));
        emit EventEP001(Iparser.bytes32ToString(_eventId), EP001,EP002,EP003,EP004,EP006,EP007);

        computeBalanceSheet();
        computeComprehesiveIncome();
        computeCashFlow();
    }

    function computeBalanceSheet() internal  {

        int256 A019_61_62_4_5_14 = int256((-EP001) +EP002+EP003+(-EP004));
        report.addValue(reportName, "balanceSheet", "assets.details.cashAndCashEquivalent.totalAmountFairValue", A019_61_62_4_5_14);
        report.addValue(reportName, "balanceSheet", "assets.details.cashAndCashEquivalent.breakdown.USD.amount", A019_61_62_4_5_14);
        report.addValue(reportName, "balanceSheet", "assets.details.cashAndCashEquivalent.breakdown.USD.fairValue", A019_61_62_4_5_14);
        report.addValue(reportName, "balanceSheet", "assets.totalAmountFairValue", A019_61_62_4_5_14);
        report.addValue(reportName, "balanceSheet", "totalAssetsFairValue", A019_61_62_4_5_14);
        report.addValue(reportName, "balanceSheet","totalLiabilitiesAndEquityFairValue", A019_61_62_4_5_14);

        int256 A006_40_41_9 = int256((-EP001));
        report.addValue(reportName, "balanceSheet", "liabilities.details.userDeposit.totalAmountFairValue", A006_40_41_9);
        report.addValue(reportName, "balanceSheet", "liabilities.details.userDeposit.breakdown.USD.amount", A006_40_41_9);
        report.addValue(reportName, "balanceSheet", "liabilities.details.userDeposit.breakdown.USD.fairValue", A006_40_41_9);
        report.addValue(reportName, "balanceSheet", "liabilities.totalAmountFairValue", A006_40_41_9);

        int256 A010_50_51_13 = int256(EP002+EP003+(-EP004));
        report.addValue(reportName, "balanceSheet", "equity.details.retainedEarnings.totalAmountFairValue", A010_50_51_13);
        report.addValue(reportName, "balanceSheet", "equity.details.retainedEarnings.breakdown.USD.amount", A010_50_51_13);
        report.addValue(reportName, "balanceSheet", "equity.details.retainedEarnings.breakdown.USD.fairValue", A010_50_51_13);
        report.addValue(reportName, "balanceSheet", "equity.totalAmountFairValue", A010_50_51_13);
    }
    function computeComprehesiveIncome() internal {

        int256 B005_44_45 = int256((EP002 + EP003));
        report.addValue(reportName, "comprehensiveIncome", "income.details.withdrawalFee.weightedAverageCost", B005_44_45);
        report.addValue(reportName, "comprehensiveIncome", "income.details.withdrawalFee.breakdown.USD.amount", B005_44_45);
        report.addValue(reportName, "comprehensiveIncome", "income.details.withdrawalFee.breakdown.USD.weightedAverageCost", B005_44_45);

        int256 B008_98_99_30 = int256((-EP004));
        report.addValue(reportName, "comprehensiveIncome", "costs.details.technicalProviderFee.weightedAverageCost", B008_98_99_30);
        report.addValue(reportName, "comprehensiveIncome", "costs.details.technicalProviderFee.breakdown.USD.amount", B008_98_99_30);
        report.addValue(reportName, "comprehensiveIncome", "costs.details.technicalProviderFee.breakdown.USD.fairValue", B008_98_99_30);
        report.addValue(reportName, "comprehensiveIncome", "costs.weightedAverageCost", B008_98_99_30);

        int256 B004 = int256(EP002 + EP003+(-EP004));
        report.addValue(reportName, "comprehensiveIncome", "netProfit", B004);
    }

    function computeCashFlow() internal {

        int256 C009_140_141 = (-EP001);
        report.addValue(reportName, "cashFlow", "operatingActivities.details.cashWithdrawnByCustomers.weightedAverageCost", C009_140_141);
        report.addValue(reportName, "cashFlow", "operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.amount", C009_140_141);
        report.addValue(reportName, "cashFlow", "operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.weightedAverageCost", C009_140_141);

        int256 C031_136_137 = EP002+EP003;
        report.addValue(reportName, "cashFlow", "operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.weightedAverageCost", C031_136_137);
        report.addValue(reportName, "cashFlow", "operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.breakdown.USD.amount", C031_136_137);
        report.addValue(reportName, "cashFlow", "operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.breakdown.USD.weightedAverageCost", C031_136_137);

        int256 C034_138_139 = int256((-EP004));
        report.addValue(reportName, "cashFlow", "operatingActivities.details.cashPaidToSuppliersForExpenses.weightedAverageCost", C034_138_139);
        report.addValue(reportName, "cashFlow", "operatingActivities.details.cashPaidToSuppliersForExpenses.breakdowm.USD.amount", C034_138_139);
        report.addValue(reportName, "cashFlow", "operatingActivities.details.cashPaidToSuppliersForExpenses.breakdowm.USD.weightedAverageCost", C034_138_139);

        int256 C049_51 = int256(((-EP001) + EP002+EP003+(-EP004)));
        report.addValue(reportName, "cashFlow", "operatingActivities.weightedAverageCost", C049_51);
        report.addValue(reportName, "cashFlow", "otherSupplementaryItems.details.relatedToCash.cashCashEquivalentsAndRestrictedCashEndOfPeriod.weightedAverageCost", C049_51);

    }
}
