// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface TransactionHandler {
    function processTransaction(bytes32[] memory data, address recorder) external;
}
