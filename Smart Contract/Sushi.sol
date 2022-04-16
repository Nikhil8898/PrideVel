pragma solidity >=0.5.0;
import 'hardhat/console.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//import "./interfaces/SushiSwap.sol";

interface SushiV2Factory {  

    function allPairs(uint) external view returns (address pair);  
    function getPair(address tokenA, address tokenB) external view returns (address pair);
    function allPairsLength() external view returns (uint);

 }
 interface SushiV2Router02 {
     function tokenA() external view returns (address);
     function tokenB() external view returns (address);

      function getReserves() external view returns (uint reserveA, uint reserveB);

}
interface SushiRoll{
     function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB);
}

contract MySolidityProject{
     address sushiSwapFactoryAddr = 0xc35DADB65012eC5796536bD9864eD8773aBc74C4; 
    SushiV2Factory factory =  SushiV2Factory(sushiSwapFactoryAddr);


    function getResult(uint i) external view  returns(address , uint, uint ){
        address addr = SushiV2Factory(factory).allPairs(i);
        (uint reserve0 ,uint reserve1)= SushiV2Router02(addr).getReserves();

        return (addr,reserve0,reserve1);
  }

//}
//contract TestUniswapLiquidity {
  address private constant FACTORY = 0xc35DADB65012eC5796536bD9864eD8773aBc74C4;
  address private constant ROUTER = 0xCaAbdD9Cf4b61813D4a52f980d6BC1B713FE66F5;
  address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

  event Log(string message, uint val);

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
      SushiRoll(ROUTER).addLiquidity(
        _tokenA,
        _tokenB,
        _amountA,
        _amountB,
        1,
        1,
        address(this),
        block.timestamp
      );

    emit Log("amountA", amountA);
    emit Log("amountB", amountB);
    emit Log("liquidity", liquidity);
  }

  function removeLiquidity(address _tokenA, address _tokenB) external {
    address pair = SushiV2Factory(FACTORY).getPair(_tokenA, _tokenB);

    uint liquidity = IERC20(pair).balanceOf(address(this));
    IERC20(pair).approve(ROUTER, liquidity);

    (uint amountA, uint amountB) =
      SushiRoll(ROUTER).removeLiquidity(
        _tokenA,
        _tokenB,
        liquidity,
        1,
        1,
        address(this),
        block.timestamp
      );

    emit Log("amountA", amountA);
    emit Log("amountB", amountB);
  }
} 

