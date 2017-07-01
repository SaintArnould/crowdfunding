pragma solidity ^0.4.4;

/// @title SaintArnould (Tokyo) Token (SAT) -
contract SaintArnouldToken {
    string public constant name = "Saint Arnould Token";
    string public constant symbol = "SAT";
    uint8 public constant decimals = 18;  // 18 decimal places, the same as ETH.

    uint256 public constant tokenCreationRate = 5000;  //creation rate 1 ETH = 5000 SAT
    uint256 public constant firstTokenCap = 10 ether * tokenCreationRate; 
    uint256 public constant secondTokenCap = 1081 ether * tokenCreationRate; //32,500,000 YEN

    uint256 public fundingStartBlock;
    uint256 public fundingEndBlock;
    uint256 public locked_allocation;
    uint256 public unlockingBlock;
    
    address public founders;

    // The flag indicates if the SAT contract is in Funding state.
    bool public funding_ended = false;

    // Receives ETH for founders.
    address public SATfounders;

    // The current total token supply.
    uint256 totalTokens;

    mapping (address => uint256) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    function SaintArnouldToken(address _founders,
                               uint256 _fundingStartBlock,
                               uint256 _fundingEndBlock) {

        if (_founders == 0) throw;
        if (_fundingStartBlock <= block.number) throw;
        if (_fundingEndBlock   <= _fundingStartBlock) throw;

        founders = _founders;
        fundingStartBlock = _fundingStartBlock;
        fundingEndBlock = _fundingEndBlock;
    }

    /// @notice Transfer `_value` SAT tokens from sender's account
    /// `msg.sender` to provided account address `_to`.
    /// @param _to The address of the tokens recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) public returns (bool) {
        // Abort if not in Operational state.
        if (!funding_ended) throw;
        if (msg.sender == founders) throw;
        var senderBalance = balances[msg.sender];
        if (senderBalance >= _value && _value > 0) {
            senderBalance -= _value;
            balances[msg.sender] = senderBalance;
            balances[_to] += _value;
            Transfer(msg.sender, _to, _value);
            return true;
        }
        return false;
    }

    function totalSupply() external constant returns (uint256) {
        return totalTokens;
    }

    function balanceOf(address _owner) external constant returns (uint256) {
        return balances[_owner];
    }

    // Crowdfunding:

    /// @notice Create tokens when funding is active.
    /// @dev Required state: Funding Active
    /// @dev State transition: -> Funding Success (only if cap reached)
    function buy(address _senders) internal {
        // Abort if not in Funding Active state.
        // The checks are split (instead of using or operator) because it is
        // cheaper this way.
        if (funding_ended) throw;
        if (block.number < fundingStartBlock) throw;
        if (block.number > fundingEndBlock) throw;

        // Do not allow creating 0 or more than the cap tokens.
        if (msg.value == 0) throw;

        var numTokens = msg.value * tokenCreationRate;
        totalTokens += numTokens;

        // Assign new tokens to the sender
        balances[_senders] += numTokens;

        // sending funds to founders
        founders.transfer(msg.value);

        // Log token creation event
        Transfer(0, _senders, numTokens);
    }

    /// @notice Finalize crowdfunding
    function finalize() external {
        if (block.number <= fundingEndBlock) throw;

        //locked allocation for founders 
        locked_allocation = totalTokens * 10 / 100;
        balances[founders] = locked_allocation;
        totalTokens += locked_allocation;
        
        unlockingBlock = block.number + 914823
        funding_ended = true;
    }

    function transferFounders(address _to, uint256 _value) public returns (bool) {
        // Abort if not in Operational state.
        if (!funding_ended) throw;
        if (block.number <= unlockingBlock) throw;
        if (msg.sender != founders) throw;
        var senderBalance = balances[msg.sender];
        if (senderBalance >= _value && _value > 0) {
            senderBalance -= _value;
            balances[msg.sender] = senderBalance;
            balances[_to] += _value;
            Transfer(msg.sender, _to, _value);
            return true;
        }
        return false;
    }

    /// @notice If anybody sends Ether directly to this contract, consider he is
    function() public payable {
        buy(msg.sender);
    }
}
