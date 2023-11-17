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
        string[] memory keysForA001_2_3_4_5_14 = new string[](6);
        keysForA001_2_3_4_5_14[0] = "assets.details.cashAndCashEquivalent.totalAmountFairValue";
        keysForA001_2_3_4_5_14[1] = "assets.details.cashAndCashEquivalent.breakdown.USD.amount";
        keysForA001_2_3_4_5_14[2] = "assets.details.cashAndCashEquivalent.breakdown.USD.fairValue";
        keysForA001_2_3_4_5_14[3] = "assets.totalAmountFairValue";
        keysForA001_2_3_4_5_14[4] = "totalAssetsFairValue";
        keysForA001_2_3_4_5_14[5] = "totalLiabilitiesAndEquityFairValue";
        report.addValue(reportID, "balanceSheet", keysForA001_2_3_4_5_14[0], A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_2_3_4_5_14[1], A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_2_3_4_5_14[2], A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_2_3_4_5_14[3], A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_2_3_4_5_14[4], A001_2_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_2_3_4_5_14[5], A001_2_3_4_5_14);

        int256 A006_7_8_9 =  EP001 - EP002;
        string[] memory keysForA006_7_8_9 = new string[](4);
        keysForA006_7_8_9[0] = "liabilities.details.userDeposit.totalAmountFairValue";
        keysForA006_7_8_9[1] = "liabilities.details.userDeposit.breakdown.USD.amount";
        keysForA006_7_8_9[2] = "liabilities.details.userDeposit.breakdown.USD.fairValue";
        keysForA006_7_8_9[3] = "liabilities.totalAmountFairValue";
        report.addValue(reportID, "balanceSheet", keysForA006_7_8_9[0], A006_7_8_9);
        report.addValue(reportID, "balanceSheet", keysForA006_7_8_9[1], A006_7_8_9);
        report.addValue(reportID, "balanceSheet", keysForA006_7_8_9[2], A006_7_8_9);
        report.addValue(reportID, "balanceSheet", keysForA006_7_8_9[3], A006_7_8_9);
        report.addValue(reportID, "balanceSheet", keysForA006_7_8_9[4], A006_7_8_9);


        int256 A010_11 =  EP002 + EP003;
        string[] memory keysForA010_11 = new string[](2);
        keysForA010_11[0] = "equity.details.retainedEarnings.totalAmountFairValue";
        keysForA010_11[1] = "equity.details.retainedEarnings.breakdown.USD.amount";
        report.addValue(reportID, "balanceSheet", keysForA010_11[0], A010_11);
        report.addValue(reportID, "balanceSheet", keysForA010_11[1], A010_11);
        report.addValue(reportID, "balanceSheet", keysForA010_11[2], A010_11);
    }

    function computeComprehesiveIncome() internal {
        int256 B001_2_3_4 = EP002 + EP003;
        string[] memory keysForB001_2_3_4 = new string[](4);
        keysForB001_2_3_4[0] = "income.details.depositFee.weightedAverageCost";
        keysForB001_2_3_4[1] = "income.details.depositFee.breakdown.USD.amount";
        keysForB001_2_3_4[2] = "income.details.depositFee.breakdown.USD.weightedAverageCost";
        keysForB001_2_3_4[3] = "netProfit";
        report.addValue(reportID, "comprehensiveIncome", keysForB001_2_3_4[0], B001_2_3_4);
        report.addValue(reportID, "comprehensiveIncome", keysForB001_2_3_4[1], B001_2_3_4);
        report.addValue(reportID, "comprehensiveIncome", keysForB001_2_3_4[2], B001_2_3_4);
        report.addValue(reportID, "comprehensiveIncome", keysForB001_2_3_4[3], B001_2_3_4);
    }

    function computeCashFlow() internal {
        int256 C027_134_135 = int256(EP001 - EP002);
        string[] memory keysForC027_134_135= new string[](3);
        keysForC027_134_135[0] = "operatingActivities.details.cashDepositedByCustomers.weightedAverageCost"; 
        keysForC027_134_135[1] = "operatingActivities.details.cashDepositedByCustomers.breakdown.USD.amount";
        keysForC027_134_135[2] = "operatingActivities.details.cashDepositedByCustomers.breakdown.USD.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC027_134_135[0], C027_134_135);
        report.addValue(reportID, "cashFlow", keysForC027_134_135[1], C027_134_135);
        report.addValue(reportID, "cashFlow", keysForC027_134_135[2], C027_134_135);
//
        int256 C031_136 = int256(EP002 + EP003);
        string[] memory keysForC031_136 = new string[](2);
        keysForC031_136[0] = "operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.weightedAverageCost"; 
        keysForC031_136[1] = "operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.amount ";
        report.addValue(reportID, "cashFlow", keysForC031_136[0], C031_136);
        report.addValue(reportID, "cashFlow", keysForC031_136[1], C031_136);
//
        int256 C049_051_137 = int256(EP001 - EP002);
        string[] memory keysForC049_051_137= new string[](3);
        keysForC049_051_137[0] = "operatingActivities.weightedAverageCost"; 
        keysForC049_051_137[1] = "otherSupplementaryItems.details.relatedToCash.cashCashEquivalentsAndRestrictedCashEndOfPeriod.weightedAverageCost";
        keysForC049_051_137[2] = "operatingActivities.details.cashReceivedFromCustomersAsTransactionFee.breakdown.USD.weightedAverageCost";
        report.addValue(reportID, "cashFlow", keysForC049_051_137[0], C049_051_137);
        report.addValue(reportID, "cashFlow", keysForC049_051_137[1], C049_051_137);
        report.addValue(reportID, "cashFlow", keysForC049_051_137[2], C049_051_137);
    }
}
