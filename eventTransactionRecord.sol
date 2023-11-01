// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/*contract TransactionContract2 {
   
    struct Transaction {
        string transactionType;
        string eventId;
        address Recorder;
        mapping(string => int256) params;
    }
    
    Transaction[] public transactions;

    function E00010001(string memory _eventId, int256 _EP001, int256 _EP002, int256 _EP003, int256 _EP005) public {
        uint256 index = transactions.length;
        transactions.push();
        Transaction storage transaction = transactions[index];

        transaction.transactionType = "E00010001";
        transaction.eventId = _eventId;
        transaction.Recorder = msg.sender;

        transaction.params["EP001"] = _EP001;
        transaction.params["EP002"] = _EP002;
        transaction.params["EP003"] = _EP003;
        transaction.params["trans_time"] = int256(block.timestamp);
        transaction.params["EP005"] = _EP005;
    }

    function E00010002(string memory _eventId, int256 _EP001, int256 _EP002, int256 _EP003, int256 _EP005) public {
        uint256 index = transactions.length;
        transactions.push();
        Transaction storage transaction = transactions[index];

        transaction.transactionType = "E00010002";
        transaction.eventId = _eventId;
        transaction.Recorder = msg.sender;
        transaction.params["EP001"] = _EP001;
        transaction.params["EP002"] = _EP002;
        transaction.params["EP003"] = _EP003;
        transaction.params["trans_time"] = int256(block.timestamp);
        transaction.params["EP005"] = _EP005;
    }

    function E00010003(string memory _eventId, int256 _EP001, int256 _EP002, int256 _EP003, int256 _EP005) public {
        uint256 index = transactions.length;
        transactions.push();
        Transaction storage transaction = transactions[index];

        transaction.transactionType = "E00010003";
        transaction.eventId = _eventId;
        transaction.Recorder = msg.sender;
        transaction.params["EP001"] = _EP001;
        transaction.params["EP002"] = _EP002;
        transaction.params["EP003"] = _EP003;
        transaction.params["trans_time"] = int256(block.timestamp);
        transaction.params["EP005"] = _EP005;
    }

    function E00010004(string memory _eventId, int256 _EP001, int256 _EP002, int256 _EP003, int256 _EP004, int256 _EP006, int256 _EP007) public {
        uint256 index = transactions.length;
        transactions.push();
        Transaction storage transaction = transactions[index];

        transaction.transactionType = "E00010004";
        transaction.eventId = _eventId;
        transaction.Recorder = msg.sender;
        transaction.params["EP001"] = _EP001;
        transaction.params["EP002"] = _EP002;
        transaction.params["EP003"] = _EP003;
        transaction.params["EP004"] = _EP004;
        transaction.params["trans_time"] = int256(block.timestamp);
        transaction.params["EP006"] = _EP006;
        transaction.params["EP007"] = _EP007;
    }

    function E00010005(string memory _eventId, int256 _EP001, int256 _EP002, int256 _EP003, int256 _EP004, int256 _EP006) public {
        uint256 index = transactions.length;
        transactions.push();
        Transaction storage transaction = transactions[index];

        transaction.transactionType = "E00010005";
        transaction.eventId = _eventId;
        transaction.Recorder = msg.sender;
        transaction.params["EP001"] = _EP001;
        transaction.params["EP002"] = _EP002;
        transaction.params["EP003"] = _EP003;
        transaction.params["EP004"] = _EP004;
        transaction.params["trans_time"] = int256(block.timestamp);
        transaction.params["EP006"] = _EP006;
    }

    function E00010006(string memory _eventId, int256 _EP001, int256 _EP002, int256 _EP003,int256 _EP004, int256 _EP006) public {
       uint256 index = transactions.length;
        transactions.push();
        Transaction storage transaction = transactions[index];

        transaction.transactionType = "E00010005";
        transaction.eventId = _eventId;
        transaction.Recorder = msg.sender;
        transaction.params["EP001"] = _EP001;
        transaction.params["EP002"] = _EP002;
        transaction.params["EP003"] = _EP003;
        transaction.params["EP004"] = _EP004;
        transaction.params["trans_time"] = int256(block.timestamp);
        transaction.params["EP006"] = _EP006;
    }

    function E00020001(string memory _eventId, int256 _EP001, int256 _EP002, int256 _BTC, int256 _USDT) public {
       uint256 index = transactions.length;
        transactions.push();
        Transaction storage transaction = transactions[index];

        transaction.transactionType = "E00020001";
        transaction.eventId = _eventId;
        transaction.Recorder = msg.sender;
        transaction.params["EP001"] = _EP001;
        transaction.params["EP002"] = _EP002;
        transaction.params["BTC"] = _BTC;
        transaction.params["USDT"] = _USDT;
        transaction.params["trans_time"] = int256(block.timestamp);
    }
    
    function getTransaction(string memory _eventId) public view returns (string memory, string memory, address) {
        Transaction storage transaction = findTransaction(_eventId);
        return (
            transaction.transactionType,
            transaction.eventId,
            transaction.Recorder
        );
    }
    
    function findTransaction(string memory _eventId) internal view returns (Transaction storage) {
        for (uint i = 0; i < transactions.length; i++) {
            if (keccak256(abi.encodePacked(transactions[i].eventId)) == keccak256(abi.encodePacked(_eventId))) {
                return transactions[i];
            }
        }
        revert("Transaction with given eventId not found");
    }

    function getTransactionsCount() public view returns (uint256) {
        return transactions.length;
    }

    function getTransactionType(uint256 index) public view returns (string memory) {
        return transactions[index].transactionType;
    }

    function getTransactionEventId(uint256 index) public view returns (string memory) {
        return transactions[index].eventId;
    }

    function getTransactionParam(uint256 index, string memory paramKey) public view returns (int256) {
        return transactions[index].params[paramKey];
    }
    function getTransactionParamByEventId(string memory _eventId, string memory _paramKey) public view returns (int256) {
        Transaction storage transaction = findTransaction(_eventId);
        return transaction.params[_paramKey];
    }
        


     
}*/