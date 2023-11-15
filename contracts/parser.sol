// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../interfaces/Iparser.sol";
// Info: (20231115-Yang){This contracts realize the functions to decode or encode different variables types}
contract Parser is IParser{
    function bytes32ToString(bytes32 _bytes32) public pure override returns  (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (uint8 j = 0; j < i; j++) {
            bytesArray[j] = _bytes32[j];
        }
        return string(bytesArray);
    }

    function intToBytes32(int256 x) public pure override returns (bytes32) {
        return bytes32(uint256(x));
    }
    
    function stringToBytes32(string memory source) public pure override returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
}
