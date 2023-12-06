// SPDX-License-Identifier: MIT
// 傳進rate的值
pragma solidity ^0.8.0;
import "./eventTransactionRecord.sol";
import "./reports.sol";

contract E00010001 {
    Reports public report;

    event EventIdAndRateReceived(string eventId, uint256 SP002, uint256 SP003, uint256 SP004);
    event EventEP001(string eventId, uint256 EP001,uint256 EP002,uint256 EP003,uint256 EP005);
    uint256 latestSP002;
    uint256 latestSP003;
    uint256 latestSP004;
    uint256 EP001;
    uint256 EP002;
    uint256 EP003;
    uint256 EP005;
    string  eventIdFromTimeSpan;
    string reportID;
    TransactionContract public transactionContract;

    constructor(address _transactionContractAddress, address _reportAddress) {
        transactionContract = TransactionContract(_transactionContractAddress);
        report = Reports(_reportAddress);
    }

    function getEventIdAndRate(string memory _eventId,string memory _reportID ,uint256 _SP002, uint256 _SP003, uint256 _SP004) public {
        latestSP002 = _SP002;
        latestSP003 = _SP003;
        latestSP004 = _SP004;
        eventIdFromTimeSpan = _eventId;
        reportID = _reportID;
        emit EventIdAndRateReceived(_eventId, _SP002, _SP003, _SP004);
        if (keccak256(abi.encodePacked(eventIdFromTimeSpan)) == keccak256(abi.encodePacked(_eventId))) {
            EP001  = transactionContract.getTransactionParamByEventId(_eventId,"EP001");
            EP002  = transactionContract.getTransactionParamByEventId(_eventId,"EP002");
            EP003  = transactionContract.getTransactionParamByEventId(_eventId,"EP003");
            EP005  = transactionContract.getTransactionParamByEventId(_eventId,"EP005");
            emit EventEP001(_eventId, EP001,EP002,EP003,EP005);
        }
        computeBalanceSheet();
    }
    function computeBalanceSheet() internal  {
        uint256 A001_3_4_5_14 = uint256((EP001 + EP003) * latestSP002/100);
        string[] memory keysForA001_3_4_5_14 = new string[](5);
        keysForA001_3_4_5_14[0] = "assets.details.cryptocurrency.totalAmountFairValue";
        keysForA001_3_4_5_14[1] = "assets.details.cryptocurrency.breakdown.USDT.fairValue";
        keysForA001_3_4_5_14[2] = "assets.totalAmountFairValue";
        keysForA001_3_4_5_14[3] = "totalAssetsFairValue";
        keysForA001_3_4_5_14[4] = "totalLiabilitiesAndEquityFairValue";
        report.addValue(reportID, "balanceSheet", keysForA001_3_4_5_14[0], A001_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_3_4_5_14[1], A001_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_3_4_5_14[2], A001_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_3_4_5_14[3], A001_3_4_5_14);
        report.addValue(reportID, "balanceSheet", keysForA001_3_4_5_14[4], A001_3_4_5_14);
    }
 
}