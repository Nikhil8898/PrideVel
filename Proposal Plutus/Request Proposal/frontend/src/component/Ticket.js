import React, { useEffect, useState } from "react"
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import { InputTextarea } from 'primereact/inputtextarea';
import axios from "axios";

import { PrimeIcons } from 'primereact/api';
// import { RadioButton } from 'primereact/radiobutton';


export default function Search(props) {
    const [description, setDescription] = useState();
    const [title, setTitle] = useState();
    const [category, setCategory] = useState();
    const [walletID, setWalletId] = useState();

    useEffect(async()=>{
        let manager = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });
    
          setWalletId(manager[0]);
    } ,[])

    const selectItems = [
        {label: 'Suggest New Token', value: 'Suggest New Token'},
        {label: 'Suggest New Chain', value: 'Suggest New Chain'},
        {label: 'Suggest New Pool', value: 'Suggest New Pool'},
       
    ];

    const PostData = async (e)=> {

        e.preventDefault();
        const newRecord = {Category: category, Title : title, Description : description, WalletID:walletID, Status : "posted"} 
        console.log(newRecord);

        try{

            let insertDetail = await axios.post('http://localhost:8080/insert/',{data:newRecord});
            console.log("insert Data .. ",  insertDetail)

        }
        catch(err){
            console.log("Error : ",err);
        }


        setCategory('');
        setDescription('');
        setTitle('');
    

    }



    return (
        <div className="ps-request-box1">
            <div className="text-2xl font-medium pt-3 pb-2"> Raise a Ticket</div>
            <div className="border-bottom-1 border-200"></div>
            <Dropdown className="w-full p-inputtext-sm mt-3 mb-3" placeholder="Category" value={category} options={selectItems} onChange={(e) => setCategory(e.value)} />

            <InputText
              autoComplete="off"
              value={title} onChange={(e)=> setTitle(e.target.value)} 
             className="w-full p-inputtext-sm mb-3"
             placeholder="Title"
             name="title"
            />

            <InputTextarea className="w-full p-inputtext-sm mb-3" rows={5} cols={30}  
                  value={description} onChange={(e)=> setDescription(e.target.value)} 
                  autoComplete="off"
                  placeholder="Description"
                  />

            <Button className="p-button-sm"label="Submit" onClick={PostData}/>
            
        </ div>
    )
}

