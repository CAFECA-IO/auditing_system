// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ReportNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    mapping(uint256 => string) private _reportData;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender) {
        _tokenIdCounter = 0;
    }

    function mintReportNFT(address recipient, string memory reportData) public onlyOwner returns (uint256) {
        require(recipient != address(0), "Recipient address cannot be zero");
        _tokenIdCounter += 1;
        uint256 newItemId = _tokenIdCounter;

        _reportData[newItemId] = reportData;
        _mint(recipient, newItemId);

        return newItemId;
    }

    function getReportData(uint256 tokenId) external view returns (string memory) {
        require(ownerOf(tokenId) == msg.sender, "Caller is not the owner");
        return _reportData[tokenId];
    }
}
