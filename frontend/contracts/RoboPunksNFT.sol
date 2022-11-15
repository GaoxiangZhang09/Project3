// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol'; // import smart contract template
import '@openzeppelin/contracts/access/Ownable.sol'; // allow us to define function only owner can use

// RoboPunksNFT will inherit from ERC721 and Ownable, so we can use the function
contract RoboPunksNFT is ERC721, Ownable {
    uint256 public mintPrice;  // mint price
    uint256 public totalSupply; // current NFT numbers while minting 
    uint256 public maxSupply; // maximum number of NFTs that would be in the collection
    uint256 public maxPerWallet; // maximum number one wallet can mint
    bool public isPublicMintEnabled; // determine when users can mint, owner can toggle true or false
    string internal baseTokenUri; // determine the URL that opensea can use to locate the image
    address payable public withdrawWallet; // withdraw the money that goes into the contract
    mapping(address => uint256) public walletMints; // keep track of how many number has each wallet minted


    constructor() payable ERC721('RoboPunks', 'RP') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        // set withdraw wallet address
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist!');
        // allow opensea to grab image url
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
    }

    // only allow owner to withdraw the fund 
    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'withdraw dailed');
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, 'minting not enable');
        require(msg.value == quantity_ + mintPrice, 'wrong mint value');
        require(totalSupply + quantity_ <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceed max wallet');

        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}

