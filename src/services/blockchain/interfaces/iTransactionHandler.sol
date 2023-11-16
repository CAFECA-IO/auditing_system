// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface ITransactionHandler {
    function processTransaction(bytes32[] memory data, address recorder) external;
}
