// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721Extended {
     event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
     event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
      event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    function owner() external view returns (address);
    function share(uint256 tokenId, address targetWallet) external returns (uint256);
    error ERC721InvalidReceiver(address receiver);
    error ERC721InvalidSender(address sender);
    error ERC721NonexistentToken(uint256 tokenId);
    error ERC721InsufficientApproval(address operator, uint256 tokenId);
    error ERC721InvalidApprover(address approver);
    error ERC721InvalidOperator(address operator);
    error ERC721InvalidOwner(address owner);
    error ERC721IncorrectOwner(address sender, uint256 tokenId, address owner);
    function ownerOf(uint256 tokenId) external view returns (address);
    function transferFrom(address from, address to, uint256 tokenId) external;
    function tokenURI(uint256 tokenId) external view returns (string memory);
    function supportsInterface(bytes4 interfaceID) external view returns (bool);
}
