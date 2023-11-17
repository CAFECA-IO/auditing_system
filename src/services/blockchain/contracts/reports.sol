// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


// Info:(20231115-Yang){This smart Contract provides functions to add value to existing column, and to enables users to read data}
contract Reports {
    mapping(string => mapping(string => mapping(string => int256))) public data;

    function addValue(string memory reportID, string memory reportType, string memory reportColumn, int256 value) external {
        data[reportID][reportType][reportColumn] += value;
    }

    function getValue(string memory reportID, string memory reportType, string memory reportColumn) external view returns (int256) {
        int256 result;
        result = data[reportID][reportType][reportColumn];
        return result;
    }
    
}
