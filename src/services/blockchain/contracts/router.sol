// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./transaction_contract.sol";
import "./get_transaction_time_span.sol";
import "./reports.sol";
import "../interfaces/i_transaction_handler.sol";

//Info:(20231115-Yang){This contract provides a clean interface for users to manipulate}
contract RouterContract {

    TransactionContract private transactionContract;
    GetTransactionTimeSpan private timeSpanReport;
    Reports private reports;

    constructor(address _transactionContract, address _timeSpanReport, address _reports) {
        transactionContract = TransactionContract(_transactionContract);
        timeSpanReport = GetTransactionTimeSpan(_timeSpanReport);
        reports = Reports(_reports);
    }
    //Info:(20231115-Yang){User should first input transaction type and handler addresses in order to register handlers}
    function registerHandler(bytes32 transactionType, address handlerAddress) external {
        ITransactionHandler handler = ITransactionHandler(handlerAddress);
        transactionContract.registerHanlder(transactionType, handler);
    }
    //Info:(20231115-Yang){After registering handlers, users can use this funtion to record event data}
    function addTransactionRecord(bytes32[] memory data) external {
        transactionContract.addRecord(data);
    }
    //Info:(20231115-Yang){If users never set rates, they should first set rates before providing time span}
    function setRate(bytes32 _SP002, bytes32 _SP003, bytes32 _SP004, bytes32 _reportName) external {
        timeSpanReport.setRate(_SP002, _SP003, _SP004, _reportName);
    }
    //Info:(20231115-Yang){Users can set a time span and reportName to get events within the time span}
    function generateReport(int256 startTime, int256 endTime, bytes32 reportName, int256 _ispublic) external {
        timeSpanReport.filterTransactionsInRange(startTime, endTime, reportName,_ispublic);
    }
    //Info:(20231115-Yang){Users can read the latest transaction time}
    function getLatestTransactionTime() external view returns (int256) {
        return transactionContract.getLatestTransactionTime();
    }
    //Info:(20231201-Yang){User can read reports columns}
    function getValue(string memory reportName, string memory reportType, string memory reportColumn)external view returns(int256){
        return reports.getValue(reportName, reportType, reportColumn);
    }
    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

}
