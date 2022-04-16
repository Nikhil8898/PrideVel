// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

/**
* @dev by Ankit Agarwal(aagarwal.agarwal800@gmail.com)
*/
contract testUniSwapLiquidity{

    IUniswapV2Factory public immutable uniswapV2Factory;
    IUniswapV2Router02 public immutable uniswapV2Router;

    IERC20 TokenA;
    IERC20 TokenB;

    constructor() {
        // uniswap router address
        IUniswapV2Router02 _uniswapV2Router = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
        uniswapV2Factory = IUniswapV2Factory(_uniswapV2Router.factory());

        // set the rest of the contract variables
        uniswapV2Router = _uniswapV2Router;
    }

    event liquidityadded(address user, address token1, address address2, uint256 tokenAamount, uint256 tokenBamount);
    event liquidityremove(address user, address pairAddress, uint256 lptoken);

    function addLiquidity(address _tokenA, address _tokenB, uint256 _amountA, uint256 _amountB) public {
        require(_amountA > 0, "Less TokenA Supply");
        require(_amountB > 0, "Less TokenB Supply");
        require(_tokenA != address(0), "DeAd address not allowed");
        require(_tokenB != address(0), "DeAd address not allowed");
        IERC20 token = IERC20(_tokenA);
        IERC20 token2 = IERC20(_tokenB);
        require(CheckAllowance(token) >= _amountA ,"Less Supply");
        require(CheckAllowance(token2) >= _amountB ,"Less Supply");
        token.transferFrom(msg.sender, address(this), _amountA);
        token2.transferFrom(msg.sender, address(this), _amountB);
        // tokens are approving router 
        token.approve(address(uniswapV2Router), _amountA);
        token2.approve(address(uniswapV2Router), _amountB);
        uniswapV2Router.addLiquidity(
            _tokenA,
            _tokenB,
            _amountA,
            _amountB,
            0,
            0,
            msg.sender,
            block.timestamp
        );
        emit liquidityadded(msg.sender, _tokenA, _tokenB, _amountA, _amountB);
    }
    
    function CheckAllowance(IERC20 _Token) internal view returns(uint256) {
        return IERC20(_Token).allowance(msg.sender, address(this));
    }

    function pairAddress(address _tokenA, address _tokenB) public view returns(IERC20){
        return IERC20(uniswapV2Factory.getPair(_tokenA, _tokenB));
    }

    function removingLiquidity(address _tokenA, address _tokenB) public{
        require(_tokenA != address(0), "DeAd address not allowed");
        require(_tokenB != address(0), "DeAd address not allowed");
        IERC20 pair = pairAddress(_tokenA, _tokenB);
        uint256 lptoken = IERC20(pair).balanceOf(msg.sender);
        pair.transferFrom(msg.sender, address(this), lptoken);
        pair.approve(address(uniswapV2Router), lptoken);
        uniswapV2Router.removeLiquidity(_tokenA, _tokenB,lptoken, 1, 1, msg.sender, block.timestamp);
        emit liquidityremove(msg.sender, address(pair), lptoken);
    }
}