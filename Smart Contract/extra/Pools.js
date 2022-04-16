                                                                         
															POOLS 
													------------------------
													
						
    10000000000000000000


            MetaMAsk Wallet ( Person Account)   ----->   addLiquidity.sol  ---> UniswapV2(addLiquidity())
			
			Balance 1000 USDC  100 BAT   				 addLiquidty.sol		           --->  addLiquidity() external  ()
		


TestUniswapLiquidity : 0xf7c2BE3c35D9c9e0873e774e13eB33042Fa106bF



USDC-BAT V2 :  0x771c424eD5514cb96c6DAfb3582938bea9c2B376



token A : USDC : 0xb7a4F3E9097C08dA09517b5aB877F7a917224ede    Allowed : 50000000 (50 USDC)

token B : BAT : 0x482dC9bB08111CB875109B075A40881E48aE02Cd     Allowed : 10000000000000000000 (10 BAT)

Amount A Desired : 10000000  (10 USDC)

amount B Desired : 5000000000000000000 (5 BAT)

amount A min :  2000000

amount B min :  2000000000000000000

address to : 0x3793f758a36c04B51a520a59520e4d845f94F9F2

deadline : block.timestamp +5 min


-------------------------------------------------------------------

uniswap_addLiquidity.sol    0x93841046156ff07C50240bc8925d21B78b0B81BF


Add Liquidty :
---------------

Fail :     https://kovan.etherscan.io/tx/0xe13c9599c565dae519e440255f34fb23613f3a61226c2022bc3b49cb46e209b5

Success : https://kovan.etherscan.io/tx/0x9aec51b3ea3d0c7c6a8d85d4f4ed33490a4c11e22562a68c0d003135412e8a02

Remove Liquidity : 

https://kovan.etherscan.io/tx/0x2b5e2319028df23fe85fe3f28878cb90bae353f20b8b44b2406239ed9c082d0a



 0.7 USDC  =  1 BAT 
 
  1 USDC = 1/0.7  BAT 
  
  1 USDC = 1.42 BAT
  
 
  -------------------------------------------------------------------
		  
	uniswapV2addLiquidty.sol (After changes)

	TestUniswapLiquidity : 0xEcB0737314656c83f3CDc1101Cb393f0E2BE5371
                         : 0x3c6903aA813603592dCA3912788c152CB1B832db   addliquidity : https://kovan.etherscan.io/tx/0xcb4a1ffcf131dfe52c5d3f51270b8bf9b27ede35771105baf69243774152063f
	                                                                    removeLiquidity : fail :https://kovan.etherscan.io/tx/0x5f8838d98efd58670d66fc78c85d5fd699a805ca4551cb0b25c7fa9b3b0d8b17
	
Add Liquidty :

Success : 
https://kovan.etherscan.io/tx/0xd359f576655de8abe4bbc85d4706659a8479f670754ed453fc40e7ddb23d177d


Remove Liquidity : 

Remove Liquidity Fails : As msg.sender is the contract itself and not the external wallet



* When you add liquidity in uniswap , it does not take all of your tokens , it will take till it maintian reserve ratio
  It will take that much amount till it preserve the reserve ratio
  
 * How much tokens : https://www.youtube.com/watch?v=YfLmaCaVYn8





--------------------------------------------------------------------

UNI V2 : WETH - DAI POOL  Address on Kovan : 0xB10cf58E08b94480fCb81d341A63295eBb2062C2

WETH :  0xd0a1e359811322d97991e03f863a0c30c2cf029c
DAI : 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa



token A : WETH : 0xd0a1e359811322d97991e03f863a0c30c2cf029c    Allowed : 8000000000000000000 (0.08 WETH)

token B : DAI : 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa     Allowed : 100000000000000000000 (100 DAI)

Amount A Desired : 5000000000000000000  ( 0.05 WETH)

amount B Desired : 50000000000000000000  (50 DAI)

amount A min :  10000000000000000     (0.001 WETH)

amount B min :  2000000000000000000    (2 DAI)

address to : 0x3793f758a36c04B51a520a59520e4d845f94F9F2

deadline : block.timestamp +5 min




QUES: 1 :  Does different LP tokens have different contract addresses?

QUES : 2 :  Is LP tokens are ERC20 token? Does LP tokens have seprate contract ,from which I can derive its ABI , or copy the function
     : signature in an interface to derive its interface and thus call its instance.
	 
QUES: 3:  Are we adding up any fee on top of (Add_liquidity) . We should not though. And if not , then we should do all the write operations directly
     :    from the frontend. (Reasons : 1) Extra gas , 2) Msg.sender functions restrictions)
	 
QUES 4  : removeLiquidityWithPermit : Research    : Approve  : TransferFrom  ()

	 
        
   


--------------------------------------------------------------------

-------------------------------------------------------------------


 






															
													