// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./transactionContract.sol";
import "./reports.sol";
import "./parser.sol";
import "../interfaces/iTransactionHandler.sol";

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
    int256 EP006;
    int256 EP007;
    string  eventIdFromTimeSpan;
    string reportID;

    constructor(address _transactionContractAddress, address _Parser ,address _reportAddress) {
        transactionContract = TransactionContract(_transactionContractAddress);
        Iparser = IParser(_Parser);
        report = Reports(_reportAddress);
    }

    function processTransaction(bytes32[] memory data, address recorder) external override {
   
        require(data.length == 7, "Data length for E00010008 must be 7");
        
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
        paramValues[4] = int256(block.timestamp);
        paramKeys[5] = Iparser.stringToBytes32("EP006");
        paramValues[5] = int256(uint256(data[6])  );
        paramKeys[6] = Iparser.stringToBytes32("EP007");
        paramValues[6] = int256(uint256(data[7])  );

    
        transactionContract.addProcessedTransaction(data[0], data[1], recorder, paramKeys, paramValues);
    }

    function getEventIdAndRate(bytes32 _eventId,bytes32 _reportID ,bytes32 _SP002, bytes32 _SP003, bytes32 _SP004) external {
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
        EP007  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP007"));
        emit EventEP001(Iparser.bytes32ToString(_eventId), EP001,EP002,EP003,EP004,EP006,EP007);
        
        computeBalanceSheet();
        computeComprehesiveIncome();
        computeCashFlow();
    }

    function computeBalanceSheet() internal  {

        int256 A019_61_62_4_5_14 = int256((-EP001) +EP002+EP003+(-EP004));
        string[] memory keysForA019_61_62_4_5_14 = new string[](6);
        keysForA019_61_62_4_5_14[0] = "assets.details.cashAndCashEquivalent.totalAmountFairValue";
        keysForA019_61_62_4_5_14[1] = "assets.details.cashAndCashEquivalent.breakdown.USD.amount";
        keysForA019_61_62_4_5_14[2] = "assets.details.cashAndCashEquivalent.breakdown.USD.fairValue";
        keysForA019_61_62_4_5_14[3] = "assets.totalAmountFairValue";
        keysForA019_61_62_4_5_14[4] = "totalAssetsFairValue";
        keysForA019_61_62_4_5_14[5] = "totalLiabilitiesAndEquityFairValue";
        report.addValue(reportID, "balanceSheet", keysForA019_61_62_4_5_14[0], A019_61_62_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA019_61_62_4_5_14[1], A019_61_62_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA019_61_62_4_5_14[2], A019_61_62_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA019_61_62_4_5_14[3], A019_61_62_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA019_61_62_4_5_14[4], A019_61_62_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA019_61_62_4_5_14[5], A019_61_62_4_5_14);

        int256 A006_40_41_9 = int256((-EP001));
        string[] memory keysForA006_40_41_9= new string[](4);
        keysForA006_40_41_9[0] = "liabilities.details.userDeposit.totalAmountFairValue";
        keysForA006_40_41_9[1] = "liabilities.details.userDeposit.breakdown.USD.amount";
        keysForA006_40_41_9[2] = "liabilities.details.userDeposit.breakdown.USD.fairValue";
        keysForA006_40_41_9[3] = "liabilities.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA006_40_41_9[0], A006_40_41_9);
        report.addValue(reportID, "balanceSheet", keysForA006_40_41_9[1], A006_40_41_9);
        report.addValue(reportID, "balanceSheet", keysForA006_40_41_9[2], A006_40_41_9);
        report.addValue(reportID, "balanceSheet", keysForA006_40_41_9[3], A006_40_41_9);

        int256 A010_50_51_13 = int256(EP002+EP003+(-EP004));
        string[] memory keysForA010_50_51_13= new string[](4);
        keysForA010_50_51_13[0] = "equity.details.retainedEarnings.totalAmountFairValue";
        keysForA010_50_51_13[1] = "equity.details.retainedEarnings.breakdown.USD.amount";
        keysForA010_50_51_13[2] = "equity.details.retainedEarnings.breakdown.USD.fairValue";
        keysForA010_50_51_13[3] = "equity.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA010_50_51_13[0], A010_50_51_13);
        report.addValue(reportID, "balanceSheet", keysForA010_50_51_13[1], A010_50_51_13);
        report.addValue(reportID, "balanceSheet", keysForA010_50_51_13[2], A010_50_51_13);
        report.addValue(reportID, "balanceSheet", keysForA010_50_51_13[3], A010_50_51_13);
    }
    function computeComprehesiveIncome() internal {

        int256 B005_44_45 = int256((EP002 + EP003));
        string[] memory keysForB005_44_45 = new string[](3);
        keysForB005_44_45[0] = "income.details.withdrawalFee.weightedAverageCost";
        keysForB005_44_45[1] = "income.details.withdrawalFee.breakdown.USD.amount";
        keysForB005_44_45[2] = "income.details.withdrawalFee.breakdown.USD.weightedAverageCost";
        report.addValue(reportID, "comprehensiveIncome", keysForB005_44_45[0], B005_44_45);
        report.addValue(reportID, "comprehensiveIncome", keysForB005_44_45[1], B005_44_45);
        report.addValue(reportID, "comprehensiveIncome", keysForB005_44_45[2], B005_44_45);

        int256 B008_98_99_30 = int256((-EP004));
        string[] memory keysForB008_98_99_30 = new string[](4);//18 19 20 21
        keysForB008_98_99_30[0] = "costs.details.technicalProviderFee.weightedAverageCost";
        keysForB008_98_99_30[1] = "costs.details.technicalProviderFee.breakdown.USD.amount";
        keysForB008_98_99_30[2] = "costs.details.technicalProviderFee.breakdown.USD.fairValue";
        keysForB008_98_99_30[3] = "costs.weightedAverageCost";
        report.addValue(reportID, "comprehensiveIncome", keysForB008_98_99_30[0], B008_98_99_30);
        report.addValue(reportID, "comprehensiveIncome", keysForB008_98_99_30[1], B008_98_99_30);
        report.addValue(reportID, "comprehensiveIncome", keysForB008_98_99_30[2], B008_98_99_30);
        report.addValue(reportID, "comprehensiveIncome", keysForB008_98_99_30[3], B008_98_99_30);

        int256 B004 = int256(EP002 + EP003+(-EP004));
        string[] memory keysForB004 = new string[](1);
        keysForB004[0] = "netProfit";
        report.addValue(reportID, "comprehensiveIncome", keysForB004[0], B004);
    }

    function computeCashFlow() internal {

        int256 C009_140_141 = int256((-EP001));
        string[] memory keysForC009_140_141 = new string[](3);
        keysForC009_140_141[0] = "operatingActivities.details.cashWithdrawnByCustomers.weightedAverageCost"; 
        keysForC009_140_141[1] = "operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.amount"; 
        keysForC009_140_141[2] = "operatingActivities.details.cashWithdrawnByCustomers.breakdown.USD.weightedAverageCost"; 
        report.addValue(reportID, "cashFlow", keysForC009_140_141[0], C009_140_141);
        report.addValue(reportID, "cashFlow", keysForC009_140_141[1], C009_140_141);
        report.addValue(reportID, "cashFlow", keysForC009_140_141[2], C009_140_141);

        int256 C031_136_137 = int256((EP002+EP003));
        string[] memory keysForC031_136_137 = new string[](3);
        keysForC031_136_137[0] = "operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.weightedAverageCost"; 
        keysForC031_136_137[1] = "operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.breakdown.USD.amount"; 
        keysForC031_136_137[2] = "operatingActivities.details.cashReceivedFromCustomersAsTransactionFees.breakdown.USD.weightedAverageCost"; 
        report.addValue(reportID, "cashFlow", keysForC031_136_137[0], C031_136_137);
        report.addValue(reportID, "cashFlow", keysForC031_136_137[1], C031_136_137);
        report.addValue(reportID, "cashFlow", keysForC031_136_137[2], C031_136_137);

        int256 C034_138_139 = int256((-EP004));
        string[] memory keysForC034_138_139 = new string[](3);
        keysForC034_138_139[0] = "operatingActivities.details.cashPaidToSuppliersForExpenses.weightedAverageCost"; 
        keysForC034_138_139[1] = "operatingActivities.details.cashPaidToSuppliersForExpenses.breakdowm.USD.amount";
        keysForC034_138_139[2] = "operatingActivities.details.cashPaidToSuppliersForExpenses.breakdowm.USD.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC034_138_139[0], C034_138_139);
        report.addValue(reportID, "cashFlow", keysForC034_138_139[1], C034_138_139);
        report.addValue(reportID, "cashFlow", keysForC034_138_139[2], C034_138_139);

        int256 C049_51 = int256(((-EP001) + EP002+EP003+(-EP004)));
        string[] memory keysForC049_51 = new string[](2);
        keysForC049_51[0] = "operatingActivities.weightedAverageCost"; 
        keysForC049_51[1] = "otherSupplementaryItems.details.relatedToCash.cashCashEquivalentsAndRestrictedCashEndOfPeriod.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC049_51[0], C049_51);
        report.addValue(reportID, "cashFlow", keysForC049_51[1], C049_51);

    }
}
