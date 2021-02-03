//solcjs --help
pragma solidity >0.5.0;

import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap Instant Exchange";
    Token public token;
    uint256 public rate = 100;

    event tokensPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    event tokensSold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        //Calculate the nuber of tokens to buy
        uint256 tokenAmount = msg.value * rate; //msg.value = web3.utils.toWei(n, "ether")

        //Require that EthSwap has enough tokens
        require((token.balanceOf(address(this)) >= tokenAmount));

        token.transfer(msg.sender, tokenAmount); //msg.sender = investor

        //Emit an event
        emit tokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint256 _amount) public {
        //User can't sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount);

        //Caculate the amount of Ehter to redeem
        uint256 etherAmount = _amount / rate;

        //Require that EthSwap has enough Ehter
        require(address(this).balance >= etherAmount);

        //Perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);

        //Emit an event
        emit tokensSold(msg.sender, address(token), _amount, rate);
    }
}
