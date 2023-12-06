// SPDX-License-Identifier: MIT

import "../interfaces/iParser.sol";
import "../interfaces/iTransactionHandler.sol";

pragma solidity ^0.8.0;

contract TransactionContract {


    struct Transaction {
        bytes32 eventId;
        bytes32 transactionType;
        address recorder;
        mapping(bytes32 => int256) params;
    }

    event transactionAdded(bytes32 transactionType);
    IParser public Iparser;
    Transaction[] public transactions;
    mapping(bytes32 => ITransactionHandler) private handlers;
    mapping(bytes32 => bool) private recordedEvents;
    bool private locked;

    constructor(address _parser) {
        Iparser = IParser(_parser);
    }
    modifier noReentrancy() {
        require(!locked, "Reentrancy not allowed");
        locked = true;
        _;
        locked = false;
    }

    //Info:(20231115-Yang){User should first input transaction type and handler addresses in order to register handlers}
    function registerHanlder(bytes32 transactionType, ITransactionHandler handler) external {
        require(handlers[transactionType] == ITransactionHandler(address(0)), "Handler already registered");
        require(isContract(address(handler)), "Provided address must be a contract.");
        handlers[transactionType] = handler;
    }

    function getHandler(bytes32 transactionType) public view returns (ITransactionHandler) {
        return handlers[transactionType];
    }

    //Info:(20231117-Yang){the first element of data should be eventID, the second one should be event Type}
    function addRecord(bytes32[] memory data) public noReentrancy{
        require(data.length >= 3, "Data must have at least three elements");
        bytes32 eventId = data[0];
        require(!recordedEvents[eventId], "Event ID has already been used");
        bytes32 transactionType = data[1];
        ITransactionHandler handler = handlers[transactionType];
        require(address(handler) != address(0), "Transaction type handler not registered");
        handler.processTransaction(data, msg.sender);
        emit transactionAdded(transactionType);
        recordedEvents[eventId] = true;
    }

     function addProcessedTransaction(
        bytes32 eventId,
        bytes32 transactionType,
        address recorder,
        bytes32[] memory paramKeys,
        int256[] memory paramValues
    ) external {
        require(paramKeys.length == paramValues.length, "Param keys and values must match in length");

        uint256 index = transactions.length;
        transactions.push();
        Transaction storage transaction = transactions[index];

        transaction.eventId = eventId;
        transaction.transactionType = transactionType;
        transaction.recorder = recorder;

        for (uint i = 0; i < paramKeys.length; i++) {
            transaction.params[paramKeys[i]] = paramValues[i];
        }

        emit transactionAdded(transactionType);
    }

    //Info:(20231115-Yang){the functions beneath are several functions that enables users or other contracts to call and get respective information}
    function getTransaction(bytes32 _eventId) public view returns (bytes32, bytes32, address) {
        Transaction storage transaction = findTransaction(_eventId);
        return (
            transaction.transactionType,
            transaction.eventId,
            transaction.recorder
        );
    }

    function findTransaction(bytes32 _eventId) internal view returns (Transaction storage) {
        for (uint i = 0; i < transactions.length; i++) {
            if (transactions[i].eventId == _eventId) {
                return transactions[i];
            }
        }
        revert("Transaction with given eventId not found");
    }

    function getTransactionsCount() public view returns (uint256) {
        return transactions.length;
    }

    function getTransactionType(uint256 index) public view returns (bytes32) {
        return transactions[index].transactionType;
    }

    function getTransactionEventId(uint256 index) public view returns (bytes32) {
        return transactions[index].eventId;
    }

    function getTransactionParam(uint256 index, bytes32 paramKey) public view returns (int256) {
        return transactions[index].params[paramKey];
    }

    function getTransactionTime(uint256 index) public view returns (int256) {
        return transactions[index].params[Iparser.stringToBytes32("trans_time")];
    }

    function getLatestTransactionTime() public view returns (int256) {
        require(transactions.length > 0, "No transactions recorded");
        Transaction storage latestTransaction = transactions[transactions.length - 1];
        return latestTransaction.params[Iparser.stringToBytes32("trans_time")];
    }

    function getTransactionParamByEventId(bytes32 _eventId, bytes32 _paramKey) external view returns (int256) {
        Transaction storage transaction = findTransaction(_eventId);
        return transaction.params[_paramKey];
    }

    function isContract(address _addr) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(_addr)
        }
        return size > 0;
    }
}
