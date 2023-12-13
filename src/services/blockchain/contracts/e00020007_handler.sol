// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./transaction_contract.sol";
import "./reports.sol";
import "./parser.sol";
import "../interfaces/iTransaction_handler.sol";
//Info: (20231115 - Yang){This contract is to calculate the variables based on the excel reports, and to record transaction data from transactionContract.sol, the logic is the same in other handlers contracts}
contract E00020007Handler is ITransactionHandler{

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

        int256 A006_8 = int256((-EP001) * latestSP002 / 10**18);
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.totalAmountFairValue", A006_8);
        report.addValue(reportID, "balanceSheet", "liabilities.details.userDeposit.breakdown.USDT.fairValue", A006_8);

        int256 A007 = int256( (-EP001));
        report.addValue(reportID, "balanceSheet","liabilities.details.userDeposit.breakdown.USDT.amount", A007);

        int256 A031_35 = A006_8*(-1);
        report.addValue(reportID, "balanceSheet", "liabilities.details.accountsPayable.totalAmountFairValue", A031_35);
        report.addValue(reportID, "balanceSheet", "liabilities.details.accountsPayable.breakdown.USDT.fairValue", A031_35);

        int256 A034 = int256(EP001);
        report.addValue(reportID, "balanceSheet", "liabilities.details.accountsPayable.breakdown.USDT.amount", A034);

        int256 A009_014 = A006_8 + A031_35;
        report.addValue(reportID, "balanceSheet", "liabilities.totalAmountFairValue", A009_014);
        report.addValue(reportID, "balanceSheet", "totalLiabilitiesAndEquityFairValue", A009_014);


    }
}
