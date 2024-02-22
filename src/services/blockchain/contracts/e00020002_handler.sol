// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./transaction_contract.sol";
import "./reports.sol";
import "./parser.sol";
import "../interfaces/i_transaction_handler.sol";
//Info: (20231115 - Yang){This contract is to calculate the variables based on the excel reports, and to record transaction data from transactionContract.sol, the logic is the same in other handlers contracts}
contract E00020002Handler is ITransactionHandler{

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
    int256 EP003;
    string eventIdFromTimeSpan;
    string reportName;

    constructor(address _transactionContractAddress, address _Parser ,address _reportAddress) {
        transactionContract = TransactionContract(_transactionContractAddress);
        Iparser = IParser(_Parser);
        report = Reports(_reportAddress);
    }

    //Info: (20231115 - Yang){This is function is to record event data in arrays}
    function processTransaction(bytes32[] memory data, address recorder) external override {

        require(data.length == 5, "Data length for E00020002 must be 5");

        bytes32[] memory paramKeys = new bytes32[](3);
        int256[] memory paramValues = new int256[](3);

        paramKeys[0] = Iparser.stringToBytes32("EP001");
        paramValues[0] = int256(uint256(data[2]));
        paramKeys[1] = Iparser.stringToBytes32("EP002");
        paramValues[1] = int256(uint256(data[3]));
        paramKeys[2] = Iparser.stringToBytes32("EP003");
        paramValues[2] = int256(uint256(data[4]));
        transactionContract.addProcessedTransaction(data[0], data[1], recorder, paramKeys, paramValues);
    }

    /*Info: (20231115 - Yang){This function gets the rates and eventIDs, then calls transactionContract to get full data based on the eventIDs,
    finally, store them in variables in order to calculate}*/
    function getEventIdAndRate(bytes32 _eventId,bytes32 _reportName ,bytes32 _SP002, bytes32 _SP003, bytes32 _SP004) external override{
        latestSP002 = int256(uint256(_SP002));
        latestSP003 = int256(uint256(_SP003));
        latestSP004 = int256(uint256(_SP004));
        eventIdFromTimeSpan = Iparser.bytes32ToString(_eventId);
        reportName = Iparser.bytes32ToString(_reportName);
        emit EventIdAndRateReceived(eventIdFromTimeSpan, latestSP002, latestSP003, latestSP004);

        EP001  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP001"));
        EP002  = transactionContract.getTransactionParamByEventId(_eventId,Iparser.stringToBytes32("EP002"));

        emit EventEP001(Iparser.bytes32ToString(_eventId), EP001,EP002);

        computeBalanceSheet();
    }

    //Info: (20231115 - Yang){This contract calculates BalanceSheet's column, then add them to existing column in report.sol contract}
    function computeBalanceSheet() internal  {

        int256 A006_45 = int256((-EP001) * latestSP004 / 10**18);
        report.addValue(reportName, "balanceSheet", "liabilities.details.userDeposit.totalAmountFairValue", A006_45);
        report.addValue(reportName, "balanceSheet", "liabilities.details.userDeposit.breakdown.BTC.fairValue", A006_45);

        int256 A044 = int256( (-EP001));
        report.addValue(reportName, "balanceSheet", "liabilities.details.userDeposit.breakdown.BTC.amount", A044);

        int256 A031_37 = A006_45*(-1);
        report.addValue(reportName, "balanceSheet", "liabilities.details.accountsPayable.totalAmountFairValue", A031_37);
        report.addValue(reportName, "balanceSheet", "liabilities.details.accountsPayable.breakdown.BTC.fairValue", A031_37);

        int256 A036 = int256(EP001);
        report.addValue(reportName, "balanceSheet",  "liabilities.details.accountsPayable.breakdown.BTC.amount", A036);

        int256 A009_014 = A006_45 + A031_37;
        report.addValue(reportName, "balanceSheet", "liabilities.totalAmountFairValue", A009_014);
        report.addValue(reportName, "balanceSheet", "totalLiabilitiesAndEquityFairValue", A009_014);


    }
}
