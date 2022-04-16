
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'TokenInfo',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('Connected to TokenInfo database'));

// Schema for users of app
const UserSchema = new mongoose.Schema({
    id: {
        type: String,     
    },
    name: {
        type: String,
    },
    symbol: {
        type: String,   
    },
    platform: {
        type: Object,
    },
    image: {
        type: Object,
    },
    price: {
        type: Number,
    }
   
});
const User = mongoose.model('CoinInfo', UserSchema);


// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

    resp.send("App is Working");
  
});

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }

    } catch (e) {
        resp.send("Something Went Wrong");
    }
});
app.listen(5000); 
// get Data from API


const axios = require('axios');
const { response } = require('express');
const { tokenData } = require('express');
const per_page = 10;
const page = 1;

axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false`)
  .then(response => {
    const data = response.data
   
    for (var i = 0; i < data.length; i++) {
        let tokenId = data[i].id
    
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
              
              User.insertMany(qry).then(
                console.log("Inserting Data") 
                )
                .catch(err=>{

                    console.log("Unable To insert..", err)}
                )
                console.log("I Insert It ... ")


            }).catch(error => {
                console.log(error);
              })
              
    } 
  })
  .catch(error => {
    console.log(error);
  });


