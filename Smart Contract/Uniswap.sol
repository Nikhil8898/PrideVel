// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Uniswap.sol";

/*
## How to run AddLiquidity File ##

Step 1 : deploy main contract
Step 2 : a) Erc20 contct donot deploy in AtAdress pass Token1 address (usdc)
         b) Erc20 contct donot deploy in AtAdress pass Token2 address (Bat)
Step 3 : a) extract ERC20 deployed function in that extract approve
          spender :  Main contarct deployed address
          amount : amt+tokenDigit (eg for usdc : 50000000 )
          now extract allowance
          spender :  Main contarct deployed address
          owner : account address 

          b) extract ERC20 deployed function in that extract approve
          spender :  Main contarct deployed address
          amount : amt+tokenDigit (eg for bat : 10000000000000000000     )
          now extract allowance
          spender :  Main contarct deployed address
          owner : account address
Step 4 : extract main contract deployed function in that extract add liquidity function
          _tokenA : address of tokenA (usdc)
          _tokenB : address of tokenB (Bat)
          _amountA : 10000000  (10 USDC)
          _amountA :  5000000000000000000 (5 BAT)
Step 5: import LP Token 

*/

contract TestUniswapLiquidity {
   address uniSwapFactoryAddr = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    IUniswapV2Factory factory =  IUniswapV2Factory(uniSwapFactoryAddr);

    function getResult(uint i) external view  returns(address , uint, uint ){
        address addr = IUniswapV2Factory(factory).allPairs(i);
        (uint reserve0 ,uint reserve1)= IUniswapV2Pair(addr).getReserves();

        return (addr,reserve0,reserve1);
  }
  //address private constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
  //address private constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  //address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

////// sushi details ///
  address private constant FACTORY = 0xc35DADB65012eC5796536bD9864eD8773aBc74C4;
  address private constant ROUTER = 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506;
    /// sushi details ends ///

  event Log(string message, uint val);

   //  web3Instnace . methods. aprove() .transferFrom() .addliquidity()
  function addLiquidity(
    address _tokenA,
    address _tokenB,
    uint _amountA,
    uint _amountB
  ) external {
    IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
    IERC20(_tokenB).transferFrom(msg.sender, address(this), _amountB);

    IERC20(_tokenA).approve(ROUTER, _amountA);
    IERC20(_tokenB).approve(ROUTER, _amountB);

    (uint amountA, uint amountB, uint liquidity) =
      IUniswapV2Router(ROUTER).addLiquidity(
        _tokenA,
        _tokenB,
        _amountA,
        _amountB,
        1,
        1,
        msg.sender,
        block.timestamp
      );

    emit Log("amountA", amountA);
    emit Log("amountB", amountB);
    emit Log("liquidity", liquidity);
  }

  //  External Wallet :  0x3793f758a36c04B51a520a59520e4d845f94F9F2 : 000000850735129977 Uni LP Token


  //  Uniswap V2 Router -> Pool -> BAT and USDC

  // Now remove liquidity

    //Ex wallet-> This Contract -> Router -> Remove Liquidity

  // 1: LP (ERC20 Token) : Let external metamask wallet account to approve thier LP token to this contract address
  // 2. 

  function removeLiquidity(address _tokenA, address _tokenB) external {
    address pair = IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB);

    uint liquidity = IERC20(pair).balanceOf(msg.sender);

    // LiquidityToken(LP_Token_Contract_address).transferFrom(msg.sender, address(this), liquidity);   // approving 'this' contract to fetch LP token from external wallet
    // IERC20(LP_Token_Contract_address).transferFrom(msg.sender, address(this), liquidity); 
   
     IERC20(0x03b4965F967fb08D22E4C69b55F7A66342dDb2fd).transferFrom(msg.sender, address(this), liquidity); // LP token addresss
   
     // LP Token

    IERC20(pair).approve(ROUTER, liquidity);                            //// here the issue  // Approve 

    (uint amountA, uint amountB) =
      IUniswapV2Router(ROUTER).removeLiquidity(
        _tokenA,
        _tokenB,
        liquidity,
        1,
        1,
        msg.sender,                                        // here msg.sender will be this contract account
        block.timestamp
      );

    emit Log("amountA", amountA);
    emit Log("amountB", amountB);
  }
}
