// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract TransactionContract {
   
    struct Transaction {
        bytes32 eventId;
        bytes32 transactionType;
        address Recorder;
        mapping(bytes32 => int256) params;
    }
    
    Transaction[] public transactions;

    //This funtion is just for me to test. 
    //In practice users will have to input their bytes32[] in addRecord funtion directly.
    function inputWithDecimal(
        string memory _str1,
        string memory _str2,
        int256 _int1,
        int256 _int2,
        int256 _int3,
        int256 _int4
    ) public returns (bytes32[] memory) {
        bytes32[] memory result = new bytes32[](6);
        result[0] = stringToBytes32(_str1);
        result[1] = stringToBytes32(_str2);
        result[2] = intToBytes32(_int1);
        result[3] = intToBytes32(_int2);
        result[4] = intToBytes32(_int3);
        result[5] = intToBytes32(_int4);
        addRecord(result);
        return result;
    }
    ////////////

    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }

    function intToBytes32(int256 x) internal pure returns (bytes32) {
        return bytes32(uint256(x));
    }


    function addRecord(bytes32[] memory data) public {
        require(data.length >= 3, "Data must have at least three elements");
        bytes32 transactionType = data[1];
        if (transactionType == bytes32("E00010001")||transactionType == bytes32("E00010002")||transactionType == bytes32("E00010003")) {
            E00010001_2_3_7(data);
        } 
        else if(transactionType == bytes32("E00010004")){
            E00010004_8(data);
        }
        else if(transactionType == bytes32("E00010005")||transactionType == bytes32("E00010006")){
            E00010005_6(data);
        }else {
            revert("Unsupported transaction type");
        }
    }

    function E00010001_2_3_7(bytes32[] memory data) internal {
        require(data.length == 6, "Data length for E00010001 must be 6");
        uint256 index = transactions.length;
        transactions.push();
        Transaction storage transaction = transactions[index];

        transaction.eventId = data[0];
        transaction.transactionType = data[1];
        transaction.Recorder = msg.sender;

        transaction.params[stringToBytes32("EP001")] = int256(uint256(data[2]));
        transaction.params[stringToBytes32("EP002")] = int256(uint256(data[3]));
        transaction.params[stringToBytes32("EP003")] = int256(uint256(data[4]));
        transaction.params[stringToBytes32("trans_time")] = int256(block.timestamp);
        transaction.params[stringToBytes32("EP005")] = int256(uint256(data[5]));
    }

    function E00010004_8(bytes32[] memory data) internal {
        require(data.length == 8, "Data length for E00010001 must be 8");
        uint256 index = transactions.length;
        transactions.push();
        Transaction storage transaction = transactions[index];

        transaction.eventId = data[0];
        transaction.transactionType = data[1];
        transaction.Recorder = msg.sender;

        transaction.params[stringToBytes32("EP001")] = int256(uint256(data[2]));
        transaction.params[stringToBytes32("EP002")] = int256(uint256(data[3]));
        transaction.params[stringToBytes32("EP003")] = int256(uint256(data[4]));
        transaction.params[stringToBytes32("EP004")] = int256(uint256(data[5]));
        transaction.params[stringToBytes32("trans_time")] = int256(block.timestamp);
        transaction.params[stringToBytes32("EP006")] = int256(uint256(data[6]));
        transaction.params[stringToBytes32("EP007")] = int256(uint256(data[7]));
    }

    function E00010005_6(bytes32[] memory data) internal {
        require(data.length == 7, "Data length for E00010001 must be 7");
        uint256 index = transactions.length;
        transactions.push();
        Transaction storage transaction = transactions[index];

        transaction.eventId = data[0];
        transaction.transactionType = data[1];
        transaction.Recorder = msg.sender;

        transaction.params[stringToBytes32("EP001")] = int256(uint256(data[2]));
        transaction.params[stringToBytes32("EP002")] = int256(uint256(data[3]));
        transaction.params[stringToBytes32("EP003")] = int256(uint256(data[4]));
        transaction.params[stringToBytes32("EP004")] = int256(uint256(data[5]));
        transaction.params[stringToBytes32("trans_time")] = int256(block.timestamp);
        transaction.params[stringToBytes32("EP006")] = int256(uint256(data[6]));
    }



    function getTransaction(bytes32 _eventId) public view returns (bytes32, bytes32, address) {
        Transaction storage transaction = findTransaction(_eventId);
        return (
            transaction.transactionType,
            transaction.eventId,
            transaction.Recorder
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
        return transactions[index].params[stringToBytes32("trans_time")];
    }
    
    function getTransactionParamByEventId(bytes32 _eventId, bytes32 _paramKey) public view returns (int256) {
        Transaction storage transaction = findTransaction(_eventId);
        return transaction.params[_paramKey];
    }
}
