// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC_ISUNCLOUD {

     struct Report {
        string name;
        uint256 startTime;
        uint256 endTime;
    }

    event ReportNFTMinted(address indexed recipient,uint256 indexed newItemId, int256 indexed _ispublic,string reportName, uint256 startTime, uint256 endTime , address creator, address report_address);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event ReportNFTShared(address indexed from, address indexed to, uint256 indexed tokenId);


    error ERC721InvalidOwner(address owner);
    error ERC721InvalidReceiver(address receiver);
    error ERC721InvalidSender(address sender);
    error ERC721IncorrectOwner(address owner, uint256 tokenId, address previousOwner);
    error ERC721InvalidApprover(address approver);
    error ERC721NonexistentToken(uint256 tokenId);
    error ERC721InvalidOperator(address operator);
    error ERC721InsufficientApproval(address spender, uint256 tokenId);

    //Info: (20231229 - Yang){ supportsInterface(bytes4 interfaceId) is a function that is based on ERC165.}
    //Info: (20231229 - Yang){ Checks if the contract supports a specific interface.}
    function supportsInterface(bytes4 interfaceId) external view returns (bool);

    //Info: (20231229 - Yang){ the following functions are based on by ERC721.}
    //Info: (20231229 - Yang){ Returns the name of the token.}
    function name() external view returns (string memory);
    //Info: (20231229 - Yang){ Returns the symbol of the token, usually a shorter version of the name.}
    function symbol() external view returns (string memory);
    //Info: (20231229 - Yang){ Returns the number of tokens owned by a given address.}
    function balanceOf(address tokenOwner) external view returns (uint256);
    //Info: (20231229 - Yang){ Returns the URI for a given token ID, usually pointing to a JSON file containing the token's metadata.}
    function tokenURI(uint256 tokenId) external view returns (string memory);
    //Info: (20231229 - Yang){ Safely transfers a token from one address to another.}
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    //Info: (20231229 - Yang){ Safely transfers a token from one address to another, and includes an additional data parameter}
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) external;
    //Info: (20231229 - Yang){ Returns the owner address of a given token ID.}
    function ownerOf(uint256 tokenId) external view returns (address);
    //Info: (20231229 - Yang){ Returns the owner address of the contract.}
    function owner() external view returns (address);
    //Info: (20231229 - Yang){ Approves a given address to manage a specific token ID.}
    function approve(address to, uint256 tokenId) external;

    //Info: (20231229 - Yang){ The following functions are created originally by isuncloud.}
    //Info: (20231229 - Yang){ Shares a report by minting a new token for a specified wallet address.}
    function share(uint256 tokenId, address targetWallet) external returns (uint256);
    //Info: (20231229 - Yang){ Returns the report data for a given token ID.}
    function getReportData(uint256 tokenId) external view returns (Report memory);
    //Info: (20231229 - Yang){ Returns the latest token ID.}
    function getLatestTokenID() external view returns (uint256);
    //Info: (20231229 - Yang){ Mints a new report NFT and assigns it to the specified recipient.}
    function mintReportNFT(address recipient, uint256 startTime, uint256 endTime, string memory reportName,int256 _ispublic) external returns (uint256);


}
