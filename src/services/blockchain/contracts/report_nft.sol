// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ReportNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;


    struct Report {
        string name;
        uint256 startTime;
        uint256 endTime;
    }


    mapping(uint256 => Report) private _reports;


    event ReportNFTMinted(address recipient, uint256 tokenId, string reportName, uint256 startTime, uint256 endTime);


    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
        Ownable(msg.sender)
    {
        _tokenIdCounter = 0;
    }


    function mintReportNFT(address recipient, uint256 startTime, uint256 endTime, string memory reportName) public onlyOwner returns (uint256) {
        require(recipient != address(0), "Recipient address cannot be zero");
        require(endTime > startTime, "EndTime must be greater than StartTime");

        _tokenIdCounter += 1;
        uint256 newItemId = _tokenIdCounter;

        _reports[newItemId] = Report(reportName, startTime, endTime);
        _mint(recipient, newItemId);

        emit ReportNFTMinted(recipient, newItemId, reportName, startTime, endTime);

        return newItemId;
    }


    function getReportData(uint256 tokenId) external view returns (Report memory) {
        require(
            ownerOf(tokenId) == msg.sender || msg.sender == owner(),
            "Caller doesn't have the authority to access the token. Caller must be the NFT contract deployer or the token owner."
        );
        require(ownerOf(tokenId) != address(0), "Report does not exist.");
        return _reports[tokenId];
    }

    function getLatestTokenID() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
