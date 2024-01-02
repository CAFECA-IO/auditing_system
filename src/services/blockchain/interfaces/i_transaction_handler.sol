// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface ITransactionHandler {
    function processTransaction(bytes32[] memory data, address recorder) external;
    function getEventIdAndRate(bytes32 _eventId,bytes32 _reportID ,bytes32 _SP002, bytes32 _SP003, bytes32 _SP004) external;
}
