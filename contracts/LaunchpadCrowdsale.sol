// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LaunchpadCrowdsale is Ownable, ReentrancyGuard {
    IERC20 public token;
    uint256 public rate; // 1 ETH = X tokens
    uint256 public softCap;
    uint256 public hardCap;
    uint256 public totalRaised;
    uint256 public minAllocation;
    uint256 public maxAllocation;
    uint256 public startTime;
    uint256 public endTime;
    
    mapping(address => uint256) public contributions;
    mapping(address => bool) public whitelist;
    
    event TokensPurchased(address indexed purchaser, uint256 value, uint256 amount);
    event RefundIssued(address indexed recipient, uint256 amount);

    constructor(
        address _token,
        uint256 _rate,
        uint256 _softCap,
        uint256 _hardCap,
        uint256 _minAllocation,
        uint256 _maxAllocation,
        uint256 _startTime,
        uint256 _endTime
    ) {
        token = IERC20(_token);
        rate = _rate;
        softCap = _softCap;
        hardCap = _hardCap;
        minAllocation = _minAllocation;
        maxAllocation = _maxAllocation;
        startTime = _startTime;
        endTime = _endTime;
    }

    function buyTokens() public payable nonReentrant {
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Sale not active");
        require(whitelist[msg.sender], "Not whitelisted");
        require(msg.value >= minAllocation, "Below min allocation");
        require(contributions[msg.sender] + msg.value <= maxAllocation, "Exceeds max allocation");
        require(totalRaised + msg.value <= hardCap, "Hard cap reached");

        contributions[msg.sender] += msg.value;
        totalRaised += msg.value;
        
        uint256 tokenAmount = msg.value * rate;
        require(token.transfer(msg.sender, tokenAmount), "Token transfer failed");
        
        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
    }

    function setWhitelisted(address[] calldata accounts, bool status) external onlyOwner {
        for(uint i=0; i<accounts.length; i++) {
            whitelist[accounts[i]] = status;
        }
    }

    function claimRefund() external nonReentrant {
        require(block.timestamp > endTime, "Sale not ended");
        require(totalRaised < softCap, "Soft cap reached, no refunds");
        
        uint256 amount = contributions[msg.sender];
        require(amount > 0, "No contribution to refund");
        
        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        
        emit RefundIssued(msg.sender, amount);
    }

    function withdrawFunds() external onlyOwner {
        require(totalRaised >= softCap, "Soft cap not reached");
        payable(owner()).transfer(address(this).balance);
    }
}