
import React from "react"
import Card from "./component/Card"
import data from "./data.js"



import { useEffect, useState } from "react";
//import { ethers } from "ethers";
import erc20abi from "./ERC20ABI.json";
import pairABI from "./PairABI.json";
import tokenABI from "./TokenABI.json";
import Web3 from "web3";

import { Button } from 'primereact/button';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import axios from"axios";
import { ConnectedOverlayScrollHandler } from "primereact/utils";

export default function App() {
    
    const [p, setP] = useState([]) 
    const [data,setData]= useState([])
    
    

    const pool = []
    function setPoolData(da) {
        if (Array.isArray(pool)) {
            pool.push(da)
        } else {
            console.log('arr variable does not store an array');
        }

    }
    
    const sendSearch = async()=>{
        
        let searchApi = await axios.get('http://localhost:8080/fetch/');
        console.log("Data : ",searchApi);
        setData(searchApi.data)
        console.log(searchApi.data)
      
     }
     

    useEffect(async () => {
        await sendSearch();

        //connection with smart contact
        // const { mightSelfdestruct } = require("selfdestruct-detect");
        const web3 = new Web3("https://kovan.infura.io/v3/e38c5a84fbdc477ea4135859cb9ab33f")
        
        // after deploy contract address. change it if you have made any chages in smart contract
        const contractAddr = "0xdc99FbdE706F3b20CeDDE2dEba36680Ec1F37893"; 

        
            const web3Instance = new web3.eth.Contract(erc20abi, contractAddr);
            // const getResults =  await web3Instance.methods.getResult(2).call();
            //console.log("getResult ", getResults)
            let token0Price = 0, token1Price = 0, token0Decimal = 0, token1Decimal = 0;
            
            for (let i = 0; i < 10; i++) {
                // fetching each pair and there reseve from uniswap

                const getResults = await web3Instance.methods.getResult(i).call();
                //console.log("contract Addr : ", getResults[0]);
                //console.log("Token 1 Reserve : ", getResults[1]);
                //console.log("Token 2 Reserve : ", getResults[2]);

                const Name = ''
                const Token0 = ''
                const Token1 = ''
                const Token0Symbol = ''
                const Token1Symbol = ''

                if (getResults[1] !== '0' && getResults[2] !== '0') {
                    //fetching token from respected pair
                    //console.log("This is IF ")
                    const pairAddressData = new web3.eth.Contract(pairABI, getResults[0]);

                    Name = await pairAddressData.methods.name().call();
                    //console.log("Name of Protocol : ", Name);

                    Token0 = await pairAddressData.methods.token0().call();
                    //console.log("Token 0 : ", Token0);
                    Token1 = await pairAddressData.methods.token1().call();
                    //console.log("Token 1 : ", Token1);

                    // fetching symbol of  token 0
                    try {

                        const Token0_Data = new web3.eth.Contract(tokenABI, Token0);
                        // if(Token0_Data.methods.symbol().call())
                        Token0Symbol = await Token0_Data.methods.symbol().call();

                        console.log("Token 0 Symbol : ", Token0Symbol);

                    } catch (e) {
                        console.log('Error')
                    }

                    // fetching symbol of  token 1
                    try {

                        const Token1_Data = new web3.eth.Contract(tokenABI, Token1);
                        Token1Symbol = await Token1_Data.methods.symbol().call();
                        console.log("Token 1 Symbol : ", Token1Symbol);

                    } catch (e) {
                        console.log('Error')
                    }

                }

                const d = {
                    contractAddress: getResults[0],
                    token0Reserve: getResults[1],
                    token1Reserve: getResults[2],
                    name: Name,
                    token0: Token0,
                    token1: Token1,
                    t0Symbol: Token0Symbol,
                    t1Symbol: Token1Symbol
                }
                if (Token0Symbol !== '' && Token1Symbol !== '')
                    setPoolData(d)        
            }
        
        setP(pool)
    },[]);

    console.log(pool)
    
    const cards = p.map(item => {
            return (
                <Card
                    //{...item}
                    t0={item.t0Symbol}
                    t1={item.t1Symbol}
                    name={item.name}
                />
    )})

    return(
            <div className="components">                 
                     <div className="header">
                        <h2>Available Pool</h2>
                        <h2>Liquidity</h2>
                        <h2>Free APR</h2>
                        <h2>Protocol</h2>
                        {/* change this header text */}
                        <h2 className="hide-header-text">Protocol</h2>
                     </div>
                     <section className="cards-list">
                        {cards}
                     </section>
                
            </div>
        )
}

