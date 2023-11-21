// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./transactionContract.sol";
import "./reports.sol";
import "./parser.sol";
import "../interfaces/iTransactionHandler.sol";
//Info: (20231115 - Yang){This contract is to calculate the variables based on the excel reports, and to record transaction data from transactionContract.sol, the logic is the same in other handlers contracts}
contract E00020001Handler is ITransactionHandler{

    Reports public report;
    IParser public Iparser;
    TransactionContract private transactionContract;

    event EventIdAndRateReceived(string eventId, int256 SP002, int256 SP003, int256 SP004);
    event EventEP001(string eventId, int256 EP001,int256 EP002);
    int256 latestSP002;
    int256 latestSP003;
    int256 latestSP004;
    int256 EP001;
    int256 EP002;
    string eventIdFromTimeSpan;
    string reportID;

    constructor(address _transactionContractAddress, address _Parser ,address _reportAddress) {
        transactionContract = TransactionContract(_transactionContractAddress);
        Iparser = IParser(_Parser);
        report = Reports(_reportAddress);
    }

    //Info: (20231115 - Yang){This is function is to record event data in arrays}
    function processTransaction(bytes32[] memory data, address recorder) external override {
   
        require(data.length == 4, "Data length for E00020001 must be 4");
        
        bytes32[] memory paramKeys = new bytes32[](3);
        int256[] memory paramValues = new int256[](3);
        
        paramKeys[0] = Iparser.stringToBytes32("EP001");
        paramValues[0] = int256(uint256(data[2]));
        paramKeys[1] = Iparser.stringToBytes32("EP002");
        paramValues[1] = int256(uint256(data[3]));
        paramKeys[2] = Iparser.stringToBytes32("trans_time");
        paramValues[2] = int256(uint256(data[4]));
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

        emit EventEP001(Iparser.bytes32ToString(_eventId), EP001,EP002);
        
        computeBalanceSheet();
    }

    //Info: (20231115 - Yang){This contract calculates BalanceSheet's column, then add them to existing column in report.sol contract}
    function computeBalanceSheet() internal  {

        int256 A006_45 = int256((-EP001) * latestSP004 / 10**18);
        string[] memory keysForA006_45 = new string[](2);
        keysForA006_45[0] = "liabilities.details.userDeposit.totalAmountFairValue";
        keysForA006_45[1] = "liabilities.details.userDeposit.breakdown.BTC.fairValue";
        report.addValue(reportID, "balanceSheet", keysForA006_45[0], A006_45);
        report.addValue(reportID, "balanceSheet", keysForA006_45[1], A006_45);

        int256 A044 = int256( (-EP001));
        string[] memory keysForA044 = new string[](1);
        keysForA044[0] = "liabilities.details.userDeposit.breakdown.BTC.amount";
        report.addValue(reportID, "balanceSheet", keysForA044[0], A044);

        int256 A031_37 = A006_45*(-1);
        string[] memory keysForA031_37 = new string[](2);
        keysForA031_37[0] = "liabilities.details.accountsPayable.totalAmountFairValue";
        keysForA031_37[1] = "liabilities.details.accountsPayable.breakdown.BTC.fairValue";
        report.addValue(reportID, "balanceSheet", keysForA031_37[0], A031_37);
        report.addValue(reportID, "balanceSheet", keysForA031_37[1], A031_37);

        int256 A036 = int256(EP001);
        string[] memory keysForA036 = new string[](1);
        keysForA036[0] = "liabilities.details.accountsPayable.breakdown.BTC.amount";
        report.addValue(reportID, "balanceSheet", keysForA036[0], A036);

        int256 A009_014 = A006_45 + A031_37;
        string[] memory keysForA009_014 = new string[](2);
        keysForA009_014[0] = "liabilities.totalAmountFairValue";
        keysForA009_014[1] = "totalLiabilitiesAndEquityFairValue";
        report.addValue(reportID, "balanceSheet", keysForA009_014[0], A009_014);
        report.addValue(reportID, "balanceSheet", keysForA009_014[1], A009_014);


    }
}
