// SPDX-License-Identifier: MIT

import "../interfaces/Iparser.sol";
import "../interfaces/ITransactionHandler.sol";

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
    mapping(bytes32 => TransactionHandler) private handlers;

    //Info: (20231115-Yang){This function is for testing usage, in practice users will have to input their bytes32[] in addRecord funtion directly.}
    function inputWithDecimal(
        string memory _str1,
        string memory _str2,
        int256 _int1,
        int256 _int2,
        int256 _int3,
        int256 _int4
    ) public returns (bytes32[] memory) {
        bytes32[] memory result = new bytes32[](6);
        result[0] = Iparser.stringToBytes32(_str1);
        result[1] = Iparser.stringToBytes32(_str2);
        result[2] = Iparser.intToBytes32(_int1);
        result[3] = Iparser.intToBytes32(_int2);
        result[4] = Iparser.intToBytes32(_int3);
        result[5] = Iparser.intToBytes32(_int4);
        addRecord(result);
        return result;
    }
    ////////////

    constructor(address _parser) {
        Iparser = IParser(_parser);
    }

    //Info:(20231115-Yang){User should first input transaction type and handler addresses in order to register handlers}
    function registerHanlder(bytes32 transactionType, TransactionHandler handler) external {
        handlers[transactionType] = handler;
    }

    function addRecord(bytes32[] memory data) public {
        require(data.length >= 3, "Data must have at least three elements");
        bytes32 transactionType = data[1]; // 約定陣列第二位為transaction type, 第一位為eventID
        TransactionHandler handler = handlers[transactionType];
        require(address(handler) != address(0), "Processor for transaction type not registered");

        handler.processTransaction(data, msg.sender);
        emit transactionAdded(transactionType);
    }
    //Info:(20231115-Yang){After registering handlers, users can use this funtion to record event data}
     function addProcessedTransaction(
        bytes32 eventId,
        bytes32 transactionType,
        address recorder,
        bytes32[] memory paramKeys,
        int256[] memory paramValues
    ) public {
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
    
    function getTransactionParamByEventId(bytes32 _eventId, bytes32 _paramKey) public view returns (int256) {
        Transaction storage transaction = findTransaction(_eventId);
        return transaction.params[_paramKey];
    }
}
