// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventParserRouter {

    enum EventType {
        100010001,
        E00010002,
        E00010003,
        E00010004
    }

    // 儲存每個eventType 的解析器地址//只能指向合約
    mapping(EventType => function(bytes32) external returns(bytes32)) public parsers;
    bytes32[] public events;

    // 添加解析器// 添加event
    function addParser(EventType eventType, function(bytes32) external returns(bytes32) parser) external {
        parsers[eventType] = parser;
    }
    function addEvent(bytes32[] calldata newEvents) external {
        for (uint i = 0; i < newEvents.length; i++) {
            events.push(newEvents[i]);
        }
    }

    // 解析event
    function parseEvent(bytes32[] eventBytes) external returns() {
        EventType eventType = EventType(uint8(eventBytes[0])); // 設第一個byte為eventType
        function(bytes32) external returns(bytes32) parser = parsers[eventType];
        //return parser(eventBytes);
    }
}
