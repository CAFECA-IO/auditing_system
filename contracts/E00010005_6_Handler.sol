// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TransactionContract.sol";
import "../interfaces/ITransactionHandler.sol";

contract E00010005_6_Processor is TransactionHandler {

    IParser public Iparser;
    TransactionContract private transactionContract;

    constructor(TransactionContract _transactionContract, address _parser) {
        transactionContract = _transactionContract;
        Iparser = IParser(_parser);
    }

    function processTransaction(bytes32[] memory data, address recorder) public override {
   
        require(data.length == 6, "Data length for E00010001_2_3_7 must be 6");
        
        bytes32[] memory paramKeys = new bytes32[](6);
        int256[] memory paramValues = new int256[](6);
        
        paramKeys[0] = Iparser.stringToBytes32("EP001");
        paramValues[0] = int256(uint256(data[2])   );
        paramKeys[1] = Iparser.stringToBytes32("EP002");
        paramValues[1] = int256(uint256(data[3])   );
        paramKeys[2] = Iparser.stringToBytes32("EP003");
        paramValues[2] = int256(uint256(data[4])   );
        paramKeys[3] = Iparser.stringToBytes32("EP004");
        paramValues[3] = int256(uint256(data[5])   );
        paramKeys[4] = Iparser.stringToBytes32("trans_time");
        paramValues[4] = int256(block.timestamp);
        paramKeys[5] = Iparser.stringToBytes32("EP006");
        paramValues[5] = int256(uint256(data[6])   );
      

    
        transactionContract.addProcessedTransaction(data[0], data[1], recorder, paramKeys, paramValues);
    }
}