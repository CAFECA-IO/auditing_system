// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./transactionContract.sol";
import "./parser.sol";
import "./reports.sol";

contract GetTransactionTimeSpan {

    event TransactionProcessed(bytes32 indexed reportID, bytes32 eventType);
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
    Reports public reports;
    mapping(bytes32 => bool) private usedReportIDs;
    mapping(bytes32 => bool) private usedReportIDsInFilter;

    constructor(address _transactionContractAddress,address _parser , address _reports) {
        transactionContract = TransactionContract(_transactionContractAddress);
        Iparser = IParser(_parser);
        reports = Reports(_reports);
    }

    //Info: (20231115 - Yang){This function is for testing, users should use setRate function to input a bytes32 array}
    function setRate(bytes32 _SP002, bytes32 _SP003, bytes32 _SP004, bytes32 _reportID)external {
        require(!usedReportIDs[_reportID], "Report ID already used");
        Settlement memory newRate = Settlement({
            SP001 : int256(block.timestamp),
            SP002: _SP002,
            SP003: _SP003,
            SP004: _SP004,
            reportID: _reportID
        });
        usedReportIDs[_reportID] = true;
        rateHistory.push(newRate);
    }

    //Info: (20231115 - Yang){This function is to set a timeSpan and then filtered every event to get the eventIDs which are in the timeSpan}
    function filterTransactionsInRange(int256 startTime, int256 endTime, bytes32 _reportID)
        external
        returns (FilteredData memory)
    {
        require(!usedReportIDsInFilter[_reportID], "Report ID already used in generating report");
        reports.addValue(Iparser.bytes32ToString(_reportID), "time", "startTime", startTime);
        reports.addValue(Iparser.bytes32ToString(_reportID), "time", "endTime", endTime);

        usedReportIDsInFilter[_reportID] = true;
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

    //Info: (20231115 - Yang){This function transfers the filtered eventIDs, pass them to handlers contracts}
    function processFilteredTransactions(FilteredData memory data) internal {
        Settlement memory latestRate = rateHistory[rateHistory.length - 1];

        for (uint256 i = 0; i < data.types.length; i++) {
            ITransactionHandler handler = transactionContract.getHandler(data.types[i]);
            require(address(handler) != address(0),"handler not exist");

            handler.getEventIdAndRate(data.eventIds[i], data.reportID ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
            emit TransactionProcessed(data.reportID, data.types[i]);

        }
    }

}
