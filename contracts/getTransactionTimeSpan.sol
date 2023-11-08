// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TransactionContract.sol";
import "./E00010001.sol";
import "./E00010002.sol";
import "./E00010003.sol";
import "./E00010004.sol";
import "./E00010005.sol";
import "./E00010006.sol";
import "./E00010007.sol";
import "./E00010008.sol";
import "./parser.sol";

contract createTimeSpanReport {
    event TransactionProcessed(bytes32 indexed reportID, bytes32 eventType);
    event itshere(bytes32 datatypes,bytes32 keccak);
    struct Settlement {
        int256 SP001;     
        bytes32 SP002;
        bytes32 SP003;
        bytes32 SP004;
        bytes32 reportID;
    }

    struct FilteredData {
        bytes32[] types;
        bytes32[] eventIds;
        int256[] transTimes;
        address reportCreater;
        bytes32 reportID;
    }

    Settlement[] public rateHistory;
    TransactionContract public transactionContract;
    IParser public Iparser;
    E00010001 public e00010001;
    E00010002 public e00010002;
    E00010003 public e00010003;
    E00010004 public e00010004;
    E00010005 public e00010005;
    E00010006 public e00010006;
    E00010007 public e00010007;
    E00010008 public e00010008;


    constructor(address _transactionContractAddress,address _parser ,address _E00010001,address _E00010002,address _E00010003,address _E00010004,address _E00010005,address _E00010006,address _E00010007,address _E00010008) {
        transactionContract = TransactionContract(_transactionContractAddress);
        Iparser = IParser(_parser);
        e00010001 = E00010001(_E00010001);
        e00010002 = E00010002(_E00010002);
        e00010003 = E00010003(_E00010003);
        e00010004 = E00010004(_E00010004);
        e00010005 = E00010005(_E00010005);
        e00010006 = E00010006(_E00010006);
        e00010007 = E00010007(_E00010007);
        e00010008 = E00010008(_E00010008);
    }

    // This function is for temporary usage.
    function setRateDecimal(int256 _SP002, int256 _SP003, int256 _SP004)public{
        setRate(bytes32(uint256(_SP002)),bytes32(uint256(_SP003)),bytes32(uint256(_SP004)),Iparser.stringToBytes32("first_report"));
    }
    ////////////////

    function setRate(bytes32 _SP002, bytes32 _SP003, bytes32 _SP004, bytes32 _reportID)public {
        Settlement memory newRate = Settlement({
            SP001 : int256(block.timestamp),
            SP002: _SP002,
            SP003: _SP003,
            SP004: _SP004,
            reportID: _reportID
        });
        rateHistory.push(newRate);
    }

    function filterTransactionsInRange(int256 startTime, int256 endTime, bytes32 _reportID)
        public 
        returns (FilteredData memory)
    {
        uint256 count = transactionContract.getTransactionsCount();
        bytes32[] memory types = new bytes32[](count);
        bytes32[] memory eventIds = new bytes32[](count);
        int256[] memory transTimes = new int256[](count);
        address reportCreater = msg.sender;

        uint256 resultCount = 0;
        for (uint256 i = 0; i < count; i++) {
            int256 transTime = transactionContract.getTransactionTime(i);
            if (transTime >= startTime && transTime <= endTime) {
                types[resultCount] = transactionContract.getTransactionType(i);
                eventIds[resultCount] = transactionContract.getTransactionEventId(i);
                transTimes[resultCount] = transTime;
                resultCount++;
            }
        }

        bytes32[] memory filteredTypes = new bytes32[](resultCount);
        bytes32[] memory filteredEventIds = new bytes32[](resultCount);
        int256[] memory filteredTransTimes = new int256[](resultCount);

        for (uint256 i = 0; i < resultCount; i++) {
            filteredTypes[i] = types[i];
            filteredEventIds[i] = eventIds[i];
            filteredTransTimes[i] = transTimes[i];
        }

        FilteredData memory data = FilteredData({
            types: filteredTypes,
            eventIds: filteredEventIds,
            transTimes: filteredTransTimes,
            reportCreater: reportCreater,
            reportID: _reportID
        });

        processFilteredTransactions(data);
        return data;
    }

    function processFilteredTransactions(FilteredData memory data) internal {
        Settlement memory latestRate = rateHistory[rateHistory.length - 1];
        emit itshere(keccak256(abi.encodePacked(data.types[0])), keccak256(abi.encodePacked(Iparser.stringToBytes32("E00010001"))));
        for (uint256 i = 0; i < data.types.length; i++) {
            if (keccak256(abi.encodePacked(data.types[0]))== keccak256(abi.encodePacked(Iparser.stringToBytes32("E00010001")))) {
                e00010001.getEventIdAndRate(data.eventIds[i], data.reportID ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
                emit TransactionProcessed(data.reportID, data.types[i]);
            }
            if (keccak256(abi.encodePacked(data.types[0]))== keccak256(abi.encodePacked(Iparser.stringToBytes32("E00010002")))) {
                e00010002.getEventIdAndRate(data.eventIds[i], data.reportID ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
                emit TransactionProcessed(data.reportID, data.types[i]);
            }
            if (keccak256(abi.encodePacked(data.types[0]))== keccak256(abi.encodePacked(Iparser.stringToBytes32("E00010003")))) {
                e00010003.getEventIdAndRate(data.eventIds[i], data.reportID ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
                emit TransactionProcessed(data.reportID, data.types[i]);
            }
            if (keccak256(abi.encodePacked(data.types[0]))== keccak256(abi.encodePacked(Iparser.stringToBytes32("E00010004")))) {
                e00010004.getEventIdAndRate(data.eventIds[i], data.reportID ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
                emit TransactionProcessed(data.reportID, data.types[i]);
            }
            if (keccak256(abi.encodePacked(data.types[0]))== keccak256(abi.encodePacked(Iparser.stringToBytes32("E00010005")))) {
                e00010005.getEventIdAndRate(data.eventIds[i], data.reportID ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
                emit TransactionProcessed(data.reportID, data.types[i]);
            }
            if (keccak256(abi.encodePacked(data.types[0]))== keccak256(abi.encodePacked(Iparser.stringToBytes32("E00010006")))) {
                e00010006.getEventIdAndRate(data.eventIds[i], data.reportID ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
                emit TransactionProcessed(data.reportID, data.types[i]);
            }
            if (keccak256(abi.encodePacked(data.types[0]))== keccak256(abi.encodePacked(Iparser.stringToBytes32("E00010007")))) {
                e00010007.getEventIdAndRate(data.eventIds[i], data.reportID ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
                emit TransactionProcessed(data.reportID, data.types[i]);
            }
            if (keccak256(abi.encodePacked(data.types[0]))== keccak256(abi.encodePacked(Iparser.stringToBytes32("E00010008")))) {
                e00010008.getEventIdAndRate(data.eventIds[i], data.reportID ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
                emit TransactionProcessed(data.reportID, data.types[i]);
            }

        }
    }

}