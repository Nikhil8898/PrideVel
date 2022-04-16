const { search } = require('../app');
var tokenModel= require('../model/tokenModel');
const axios = require('axios');


    
  const { tokenData } = require('express');
  const per_page = 10;
  const page = 1;
  const coinData = ["ETH","DAI","USDC","USDT","WETH","WBTC","BAT"];
        
// For Mainnet
// axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false`)
// .then(response => {
//   const data = response.data
 
  for (var i = 0; i < coinData.length; i++) {
    axios.get(`https://api.coingecko.com/api/v3/search?query=${coinData[i]}`)
    .then(response => {
      const data = response.data.coins[0];
      console.log(data);
      const tokenId = data.id;
      console.log(tokenId);
  
      axios.get(`https://api.coingecko.com/api/v3/coins/${tokenId}`)
          .then(tokenData => {
              const tokenName = tokenData.data.name
              const tokenSymbol = tokenData.data.symbol
              const tokenPlatform = tokenData.data.platforms
              const tokenImage = tokenData.data.image
              const tokenPrice = tokenData.data.market_data.current_price.usd
              console.log("Token ID:",tokenId)
              console.log("Token Name:",tokenName)
              console.log("Token Symbol:",tokenSymbol)
              console.log("Token Platform:",tokenPlatform)
              console.log("Token Image:",tokenImage)
              console.log("Token Price:",tokenPrice)
            const qry = {"id": tokenId, "name": tokenName, "symbol": tokenSymbol, "platform": tokenPlatform, "image": tokenImage, "price": tokenPrice}
            
            tokenModel.insertMany(qry).then(
              console.log("Inserting Data") 
              )
              .catch(err=>{

                  console.log("Unable To insert..", err)}
              )
              console.log("I Insert It ... ")


          }).catch(error => {
              console.log(error);
            })
            
 // } //old
})

.catch(error => {
  console.log(error);
});
}



module.exports={
     fetchDetails: async function (req, res){
     
        await tokenModel.find().then( item => res.json({data: item}) )
        .catch(error => console.log("Error", error))
          console.log("I Found It ... ",)
        
     
  }}


