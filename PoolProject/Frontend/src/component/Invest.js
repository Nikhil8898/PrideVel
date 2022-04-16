import React from "react"
import { useState } from "react";


import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export default function Invest(props) {

    const token0 = props.t0
    const token1 = props.t1
    const balance = 0 //user balance
    const equiDollars = 0 //dollars equivalent to provied token
    const lpTokens = 0
    const poolShare = 0
    const slippageTolerance = 0

    const [selectedToken, setselectedToken] = useState(null);

    const tokens = [
        { name: token0, code: 't0' },
        { name: token1, code: 't1' }
    ];

    const onTokenChange = (e) => {
        setselectedToken(e.value);
    }

    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');

    return(
        <div> 
            <hr />

            <div className="align-content-end flex">
                    <h5>Balance: {balance}</h5>
            </div>
            <div>
                <Dropdown
                    className="mr-8"
                    value={selectedToken} options={tokens} onChange={onTokenChange} optionLabel="name" placeholder="Select a Token"
                />
                <InputText
                    value={value2} onChange={(e) => setValue2(e.target.value)}
                />
            </div>
            <div className="align-content-end flex">
                <h5>=$ {equiDollars}</h5>
            </div>

            <hr/>

            <div className=" flex flex-row flex-wrap justify-content-between	">
                <h3>{token0}/{token1} Pool &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {lpTokens}</h3>
            </div>
            <div>
                <h5>Est. Pool Allocation</h5>
                <h6>{token0}:</h6>    
                <h6>{token1}:</h6>
                <h5>Pool share: {poolShare}%</h5>

            </div>

            <hr />

            <div>
                <h5>Transaction Settings:</h5>
                <h6>Slippage Tolerance: {slippageTolerance}</h6>
            </div>
        </div>
    )
}