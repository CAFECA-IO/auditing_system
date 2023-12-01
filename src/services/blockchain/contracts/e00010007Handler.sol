// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./transactionContract.sol";
import "./reports.sol";
import "./parser.sol";
import "../interfaces/iTransactionHandler.sol";
// Info: (20231115 - Yang) {This is handler is to store data recorded in TransactionContract, the logic is the same in other handlers smart contract}
contract E00010007Handler is ITransactionHandler {

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
    string  eventIdFromTimeSpan;
    string reportID;

    constructor(address _transactionContractAddress, address _Parser ,address _reportAddress) {
        transactionContract = TransactionContract(_transactionContractAddress);
        Iparser = IParser(_Parser);
        report = Reports(_reportAddress);
    }

    /*Info: (20231115 - Yang){This function first sets keys and values, then transfer them to addProcessedTransaction 
    to store the data permanently}*/
    function processTransaction(bytes32[] memory data, address recorder) external override {
   
        require(data.length == 6, "Data length for E00010007 must be 6");
        
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
        EP005  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP005"));
        emit EventEP001(Iparser.bytes32ToString(_eventId), EP001,EP002,EP003,EP005);
        
        computeBalanceSheet();
        computeComprehesiveIncome();
        computeCashFlow();
    }

    function computeBalanceSheet() internal  {

        int256 A001_2_3_4_5_14 =  EP001 + EP003;
        report.addValue(reportID, "balanceSheet", "assets.details.cashAndCashEquivalent.totalAmountFairValue", A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", "assets.details.cashAndCashEquivalent.breakdown.USD.amount", A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", "assets.details.cashAndCashEquivalent.breakdown.USD.fairValue", A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", "assets.totalAmountFairValue", A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", "totalAssetsFairValue", A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", "totalLiabilitiesAndEquityFairValue", A001_2_3_4_5_14);

        int256 A006_7_8_9 =  EP001 - EP002;
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.totalAmountFairValue", A006_7_8_9);
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.breakdown.USD.amount", A006_7_8_9);
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.breakdown.USD.fairValue", A006_7_8_9);
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.breakdown.USD.fairValue", A006_7_8_9);
        report.addValue(reportID, "balanceSheet", "liabilities.totalAmountFairValue", A006_7_8_9);


        int256 A010_11 =  EP002 + EP003;
        report.addValue(reportID, "balanceSheet", "equity.details.retainedEarnings.totalAmountFairValue", A010_11);
        report.addValue(reportID, "balanceSheet", "equity.details.retainedEarnings.breakdown.USD.amount", A010_11);
    }

    function computeComprehesiveIncome() internal {
        int256 B001_2_3_4 = EP002 + EP003;
        report.addValue(reportID, "comprehensiveIncome", "income.details.depositFee.weightedAverageCost", B001_2_3_4);
        report.addValue(reportID, "comprehensiveIncome", "income.details.depositFee.breakdown.USD.amount", B001_2_3_4);
        report.addValue(reportID, "comprehensiveIncome", "income.details.depositFee.breakdown.USD.weightedAverageCost", B001_2_3_4);
        report.addValue(reportID, "comprehensiveIncome", "netProfit", B001_2_3_4);
    }

    function computeCashFlow() internal {
        int256 C027_134_135 = int256(EP001 - EP002);
        report.addValue(reportID, "cashFlow", "operatingActivities.details.cashDepositedByCustomers.weightedAverageCost", C027_134_135);
        report.addValue(reportID, "cashFlow", "operatingActivities.details.cashDepositedByCustomers.breakdown.USD.amount", C027_134_135);
        report.addValue(reportID, "cashFlow", "operatingActivities.details.cashDepositedByCustomers.breakdown.USD.weightedAverageCost", C027_134_135);

        int256 C031_136 = int256(EP002 + EP003);
        report.addValue(reportID, "cashFlow", "operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.weightedAverageCost", C031_136);
        report.addValue(reportID, "cashFlow", "operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.amount", C031_136);

        int256 C049_051_137 = int256(EP001 - EP002);
        report.addValue(reportID, "cashFlow", "operatingActivities.weightedAverageCost", C049_051_137);
        report.addValue(reportID, "cashFlow", "otherSupplementaryItems.details.relatedToCash.cashCashEquivalentsAndRestrictedCashEndOfPeriod.weightedAverageCost", C049_051_137);
        report.addValue(reportID, "cashFlow", "operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.weightedAverageCost", C049_051_137);
    }
}
