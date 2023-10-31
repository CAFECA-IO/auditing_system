// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./eventTransactionRecord.sol";
import "./E00010001.sol";
import "./E00010002.sol";
import "./E00010003.sol";
import "./E00010004.sol";
import "./E00010005.sol";

contract createTimeSpanReport {
    
    struct Settlement {
        int256 SP001;     
        int256 SP002;
        int256 SP003;
        int256 SP004;
        string reportID;
    }

    struct FilteredData {
        string[] types;
        string[] eventIds;
        int256[] transTimes;
        address reportCreater;
        string reportID;
    }

    //uint256[] public balanceSheet;
    Settlement[] public rateHistory;
    TransactionContract public transactionContract;
    E00010001 public e00010001;
    E00010002 public e00010002;
    E00010003 public e00010003;
    E00010004 public e00010004;
    E00010005 public e00010005;

    constructor(address _transactionContractAddress, address _E00010001, address _E00010002, address _E00010003, address _E00010004, address _E00010005) {
        transactionContract = TransactionContract(_transactionContractAddress);
        e00010001 = E00010001(_E00010001);
        e00010002 = E00010002(_E00010002);
        e00010003 = E00010003(_E00010003);
        e00010004 = E00010004(_E00010004);
        e00010005 = E00010005(_E00010005);
    }

    function setRate(int256 _SP002, int256 _SP003, int256 _SP004, string memory _reportID)public {
        Settlement memory newRate = Settlement({
            SP001 : int256(block.timestamp),
            SP002: _SP002,
            SP003: _SP003,
            SP004: _SP004,
            reportID: _reportID
        });
        rateHistory.push(newRate);
    }

    function filterTransactionsInRange(int256 startTime, int256 endTime, string memory _reportID)
        public 
        returns (FilteredData memory)
    {
        uint256 count = transactionContract.getTransactionsCount();
        string[] memory types = new string[](count);
        string[] memory eventIds = new string[](count);
        int256[] memory transTimes = new int256[](count);
        address reportCreater = msg.sender;

        uint256 resultCount = 0;
        for (uint256 i = 0; i < count; i++) {
            int256 transTime = transactionContract.getTransactionParam(i, "trans_time");
            if (transTime >= startTime && transTime <= endTime) {
                types[resultCount] = transactionContract.getTransactionType(i);
                eventIds[resultCount] = transactionContract.getTransactionEventId(i);
                transTimes[resultCount] = transTime;
                resultCount++;
            }
        }

        string[] memory filteredTypes = new string[](resultCount);
        string[] memory filteredEventIds = new string[](resultCount);
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
        for (uint256 i = 0; i < data.types.length; i++) {
            if (keccak256(abi.encodePacked(data.types[i])) == keccak256(abi.encodePacked("E00010001"))) {
                e00010001.getEventIdAndRate(data.eventIds[i], data.reportID ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
            }
            if (keccak256(abi.encodePacked(data.types[i])) == keccak256(abi.encodePacked("E00010002"))) {
                e00010002.getEventIdAndRate(data.eventIds[i], data.reportID ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
            }
            if (keccak256(abi.encodePacked(data.types[i])) == keccak256(abi.encodePacked("E00010003"))) {
                e00010003.getEventIdAndRate(data.eventIds[i], data.reportID ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
            }
            if (keccak256(abi.encodePacked(data.types[i])) == keccak256(abi.encodePacked("E00010004"))) {
                e00010003.getEventIdAndRate(data.eventIds[i], data.reportID ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
            }
            if (keccak256(abi.encodePacked(data.types[i])) == keccak256(abi.encodePacked("E00010005"))) {
                e00010003.getEventIdAndRate(data.eventIds[i], data.reportID ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
            }

        }
    }

}