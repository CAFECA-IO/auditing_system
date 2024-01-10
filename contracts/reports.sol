// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Reports {
    mapping(string => mapping(string => mapping(string => int256))) public data;

    function addValue(string memory reportID, string memory reportType, string memory reportColumn, int256 value) public {
        data[reportID][reportType][reportColumn] += value;
    }

    function getValue(string memory reportID, string memory reportType, string memory reportColumn) public view returns (int256) {
        return data[reportID][reportType][reportColumn];
    }
}