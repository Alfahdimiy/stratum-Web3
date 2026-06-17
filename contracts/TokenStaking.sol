// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TokenStaking is Ownable, ReentrancyGuard {
    IERC20 public stakingToken;
    
    struct Stake {
        uint256 amount;
        uint256 timestamp;
        uint256 lockDuration;
        uint256 apy;
        bool active;
    }
    
    mapping(address => Stake[]) public userStakes;
    mapping(uint256 => uint256) public tierApys; // duration => APY basis points (100 = 1%)

    event Staked(address indexed user, uint256 amount, uint256 duration);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);

    constructor(address _stakingToken) {
        stakingToken = IERC20(_stakingToken);
        tierApys[30 days] = 850;   // 8.5%
        tierApys[90 days] = 1420;  // 14.2%
        tierApys[180 days] = 2280; // 22.8%
    }

    function stake(uint256 _amount, uint256 _duration) external nonReentrant {
        require(_amount > 0, "Cannot stake 0");
        require(tierApys[_duration] > 0, "Invalid tier");
        
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        
        userStakes[msg.sender].push(Stake({
            amount: _amount,
            timestamp: block.timestamp,
            lockDuration: _duration,
            apy: tierApys[_duration],
            active: true
        }));
        
        emit Staked(msg.sender, _amount, _duration);
    }

    function unstake(uint256 _index) external nonReentrant {
        Stake storage s = userStakes[msg.sender][_index];
        require(s.active, "Stake not active");
        require(block.timestamp >= s.timestamp + s.lockDuration, "Lock period active");
        
        uint256 reward = calculateReward(s);
        uint256 total = s.amount + reward;
        
        s.active = false;
        stakingToken.transfer(msg.sender, total);
        
        emit Unstaked(msg.sender, s.amount, reward);
    }

    function calculateReward(Stake memory _stake) public pure returns (uint256) {
        return (_stake.amount * _stake.apy * _stake.lockDuration) / (365 days * 10000);
    }
}