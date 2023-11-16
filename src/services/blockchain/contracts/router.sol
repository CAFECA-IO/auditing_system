// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./transactionContract.sol";
import "./getTransactionTimeSpan.sol";
import "../interfaces/iTransactionHandler.sol";

//Info:(20231115-Yang){This contract provides a clean interface for users to manipulate}
contract RouterContract {
    
    TransactionContract private transactionContract;
    GetTransactionTimeSpan private timeSpanReport;

    constructor(address _transactionContract, address _timeSpanReport) {
        transactionContract = TransactionContract(_transactionContract);
        timeSpanReport = GetTransactionTimeSpan(_timeSpanReport);
    }
    //Info:(20231115-Yang){User should first input transaction type and handler addresses in order to register handlers}
    function registerHandler(bytes32 transactionType, address handlerAddress) public {
        ITransactionHandler handler = ITransactionHandler(handlerAddress);
        transactionContract.registerHanlder(transactionType, handler);
    }

    function inputWithDecimal(string memory _str1,string memory _str2,int256 _int1,int256 _int2,int256 _int3,int256 _int4)public{
        transactionContract.inputWithDecimal(_str1,_str2,_int1,_int2,_int3,_int4);
    }
    //Info:(20231115-Yang){After registering handlers, users can use this funtion to record event data}
    function addTransactionRecord(bytes32[] memory data) public {
        transactionContract.addRecord(data);
    }
    //Info:(20231115-Yang){If users never set rates, they should first set rates before providing time span}
    function setRate(bytes32 _SP002, bytes32 _SP003, bytes32 _SP004, bytes32 _reportID) public {
        timeSpanReport.setRate(_SP002, _SP003, _SP004, _reportID);
    }
     //Info:(20231115-Yang){Users can set a time span and reportID to get events within the time span}
    function generateReport(int256 startTime, int256 endTime, bytes32 reportID) public {
        timeSpanReport.filterTransactionsInRange(startTime, endTime, reportID);
    }

    function setRateDecimal(int256 _SP002, int256 _SP003, int256 _SP004)public{
        timeSpanReport.setRate(bytes32(uint256(_SP002)),bytes32(uint256(_SP003)),bytes32(uint256(_SP004)),stringToBytes32("first_report"));
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

