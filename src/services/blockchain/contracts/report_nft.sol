// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IERC721Extended.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

contract ReportNFT is IERC721Extended {
    uint256 private _tokenIdCounter;
    string private _name;
    string private _symbol;


    struct Report {
        string name;
        uint256 startTime;
        uint256 endTime;
    }


    mapping(uint256 => Report) private _reports;
    mapping(uint256 tokenId => address) private _owners;
    mapping(address owner => uint256) private _balances;
    mapping(uint256 tokenId => address) private _tokenApprovals;
    mapping(address owner => mapping(address operator => bool)) private _operatorApprovals;
    bytes4 private constant _ERC721_INTERFACE_ID = 0x80ac58cd;
    mapping(bytes4 => bool) private _supportedInterfaces;
    string private _collectionName;
    string private _collectionSymbol;

    address private _owner;


    event ReportNFTMinted(address recipient, uint256 tokenId, string reportName, uint256 startTime, uint256 endTime);


    constructor(string memory collectionName, string memory collectionSymbol) {
        _registerInterface(0x80ac58cd); // ERC721 interface id
        _registerInterface(0x5b5e139f);
        _collectionName = collectionName;
        _collectionSymbol = collectionSymbol;
        _owner = msg.sender;
        _tokenIdCounter = 0;
    }

     function supportsInterface(bytes4 interfaceId) public view returns (bool) {
        return _supportedInterfaces[interfaceId];
    }

    function _registerInterface(bytes4 interfaceId) internal {
        require(interfaceId != 0xffffffff, "Invalid interface id");
        _supportedInterfaces[interfaceId] = true;
    }


    function balanceOf(address tokenOwner) public view virtual returns (uint256) {
        if (tokenOwner == address(0)) {
            revert ERC721InvalidOwner(address(0));
        }
        return _balances[tokenOwner];
    }


    function mintReportNFT(address recipient, uint256 startTime, uint256 endTime, string memory reportName) external onlyOwner returns (uint256) {
        require(recipient != address(0), "Recipient address cannot be zero");
        require(endTime > startTime, "EndTime must be greater than StartTime");

        _tokenIdCounter += 1;
        uint256 newItemId = _tokenIdCounter;

        _reports[newItemId] = Report(reportName, startTime, endTime);
        _mint(recipient, newItemId);

        emit ReportNFTMinted(recipient, newItemId, reportName, startTime, endTime);

        return newItemId;
    }



    function transferFrom(address from, address to, uint256 tokenId) public virtual {
        if (to == address(0)) {
            revert ERC721InvalidReceiver(address(0));
        }
        address previousOwner = _update(to, tokenId, msg.sender);
        if (previousOwner != from) {
            revert ERC721IncorrectOwner(from, tokenId, previousOwner);
        }
    }

    function _transfer(address from, address to, uint256 tokenId) internal {
        if (to == address(0)) {
            revert ERC721InvalidReceiver(address(0));
        }
        address previousOwner = _update(to, tokenId, address(0));
        if (previousOwner == address(0)) {
            revert ERC721NonexistentToken(tokenId);
        } else if (previousOwner != from) {
            revert ERC721IncorrectOwner(from, tokenId, previousOwner);
        }
    }

    function tokenURI(uint256 tokenId) public view virtual returns (string memory) {
        _requireOwned(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, uintToString(tokenId))) : "";
    }

    function name() public view returns (string memory) {
        return _collectionName;
    }

    function symbol() public view returns (string memory) {
        return _collectionSymbol;
    }

    function uintToString(uint256 value) internal pure returns (string memory) {
    if (value == 0) {
        return "0";
    }



    uint256 temp = value;
    uint256 digits;
    while (temp != 0) {
        digits++;
        temp /= 10;
    }

    bytes memory buffer = new bytes(digits);
    uint256 index = digits - 1;
    temp = value;
    while (temp != 0) {
        buffer[index--] = bytes1(uint8(48 + temp % 10));
        temp /= 10;
    }

    return string(buffer);
}

    function safeTransferFrom(address from, address to, uint256 tokenId) public {
        safeTransferFrom(from, to, tokenId, "");
    }

    function _safeTransfer(address from, address to, uint256 tokenId) internal {
        _safeTransfer(from, to, tokenId, "");
    }

    /**
     * @dev Same as {xref-ERC721-_safeTransfer-address-address-uint256-}[`_safeTransfer`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     */
    function _safeTransfer(address from, address to, uint256 tokenId, bytes memory data) internal virtual {
        _transfer(from, to, tokenId);
        _checkOnERC721Received(from, to, tokenId, data);
    }


    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public virtual {
        transferFrom(from, to, tokenId);
        _checkOnERC721Received(from, to, tokenId, data);
    }

    function _checkOnERC721Received(address from, address to, uint256 tokenId, bytes memory data) private {
        if (to.code.length > 0) {
            try IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, data) returns (bytes4 retval) {
                if (retval != IERC721Receiver.onERC721Received.selector) {
                    revert ERC721InvalidReceiver(to);
                }
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert ERC721InvalidReceiver(to);
                } else {
                    /// @solidity memory-safe-assembly
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        }
    }

    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    function _approve(address to, uint256 tokenId, address auth) internal {
        _approve(to, tokenId, auth, true);
    }

    function _approve(address to, uint256 tokenId, address auth, bool emitEvent) internal virtual {
        // Avoid reading the owner unless necessary
        if (emitEvent || auth != address(0)) {
            address tokenOwner = _requireOwned(tokenId);

            // We do not use _isAuthorized because single-token approvals should not be able to call approve
            if (auth != address(0) && tokenOwner != auth && !isApprovedForAll(tokenOwner, auth)) {
                revert ERC721InvalidApprover(auth);
            }

            if (emitEvent) {
                emit Approval(tokenOwner, to, tokenId);
            }
        }

        _tokenApprovals[tokenId] = to;
    }

    function _safeMint(address to, uint256 tokenId) internal {
        _safeMint(to, tokenId, "");
    }

    function _safeMint(address to, uint256 tokenId, bytes memory data) internal virtual {
        _mint(to, tokenId);
        _checkOnERC721Received(address(0), to, tokenId, data);
    }

    function _increaseBalance(address account, uint128 value) internal virtual {
        unchecked {
            _balances[account] += value;
        }
    }

    function _burn(uint256 tokenId) internal {
        address previousOwner = _update(address(0), tokenId, address(0));
        if (previousOwner == address(0)) {
            revert ERC721NonexistentToken(tokenId);
        }
    }

    function _setApprovalForAll(address tokenOwner, address operator, bool approved) internal virtual {
        if (operator == address(0)) {
            revert ERC721InvalidOperator(operator);
        }
        _operatorApprovals[tokenOwner][operator] = approved;
        emit ApprovalForAll(tokenOwner, operator, approved);
    }

    function _requireOwned(uint256 tokenId) internal view returns (address) {
        address tokenOwner = _ownerOf(tokenId);
        if (tokenOwner == address(0)) {
            revert ERC721NonexistentToken(tokenId);
        }
        return tokenOwner;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not the owner");
        _;
    }

    function ownerOf(uint256 tokenId) public view  returns (address) {
        address tokenOwner = _owners[tokenId];
        require(tokenOwner != address(0), "ERC721: owner query for nonexistent token");
        return tokenOwner;
    }

    function owner() public view override returns (address) {
        return _owner;
    }

    function getReportData(uint256 tokenId) external view returns (Report memory) {
        require(
            ownerOf(tokenId) == msg.sender || msg.sender == owner(),
            "Caller doesn't have the authority to access the token. Caller must be the NFT contract deployer or the token owner."
        );
        require(ownerOf(tokenId) != address(0), "Report does not exist.");
        return _reports[tokenId];
    }

    function getLatestTokenID() external view returns (uint256) {
        return _tokenIdCounter;
    }

    function _mint(address to, uint256 tokenId) internal {
        if (to == address(0)) {
            revert ERC721InvalidReceiver(address(0));
        }
        address previousOwner = _update(to, tokenId, address(0));
        if (previousOwner != address(0)) {
            revert ERC721InvalidSender(address(0));
        }
    }

    function approve(address to, uint256 tokenId) public virtual {
        _approve(to, tokenId, msg.sender);
    }

    function _update(address to, uint256 tokenId, address auth) internal virtual returns (address) {
        address from = _ownerOf(tokenId);

        // Perform (optional) operator check
        if (auth != address(0)) {
            _checkAuthorized(from, auth, tokenId);
        }

        // Execute the update
        if (from != address(0)) {
            // Clear approval. No need to re-authorize or emit the Approval event
            _approve(address(0), tokenId, address(0), false);

            unchecked {
                _balances[from] -= 1;
            }
        }

        if (to != address(0)) {
            unchecked {
                _balances[to] += 1;
            }
        }

        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);

        return from;
    }

    function _checkAuthorized(address tokenOwner, address spender, uint256 tokenId) internal view virtual {
        if (!_isAuthorized(tokenOwner, spender, tokenId)) {
            if (tokenOwner == address(0)) {
                revert ERC721NonexistentToken(tokenId);
            } else {
                revert ERC721InsufficientApproval(spender, tokenId);
            }
        }
    }

    function share(uint256 tokenId, address targetWallet) external returns (uint256) {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can share this report");
        require(targetWallet != address(0), "Target wallet cannot be zero");

        _tokenIdCounter += 1;
        uint256 newTokenId = _tokenIdCounter;

        Report memory originalReport = _reports[tokenId];
        _reports[newTokenId] = Report(originalReport.name, originalReport.startTime, originalReport.endTime);

        _mint(targetWallet, newTokenId);

        emit ReportNFTMinted(targetWallet, newTokenId, originalReport.name, originalReport.startTime, originalReport.endTime);

        return newTokenId;
    }

    function _ownerOf(uint256 tokenId) internal view virtual returns (address) {
        return _owners[tokenId];
    }

    function _isAuthorized(address tokenOwner, address spender, uint256 tokenId) internal view virtual returns (bool) {
        return
            spender != address(0) &&
            (tokenOwner == spender || isApprovedForAll(tokenOwner, spender) || _getApproved(tokenId) == spender);
    }

    function isApprovedForAll(address tokenOwner, address operator) public view virtual returns (bool) {
        return _operatorApprovals[tokenOwner][operator];
    }

    function _getApproved(uint256 tokenId) internal view virtual returns (address) {
        return _tokenApprovals[tokenId];
    }
}
