// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IParser {
    function bytes32ToString(bytes32 _bytes32) external pure returns (string memory);
    function stringToBytes32(string calldata source) external pure returns (bytes32);
    function intToBytes32(int256 x) external pure returns (bytes32);
}