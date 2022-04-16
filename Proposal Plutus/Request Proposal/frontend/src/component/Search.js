import React, { useState } from "react"
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { PrimeIcons } from 'primereact/api';
import axios from "axios";
// import { RadioButton } from 'primereact/radiobutton';


export default function Search(props) {

    const selectItems = [
        { label: 'Suggest New Token', value: 'Suggest New Token' },
        { label: 'Suggest New Chain', value: 'Suggest New Chain' },
        { label: 'Suggest New Pool', value: 'Suggest New Pool' },

    ];


    return (
        <div className="flex">
            <div className="p-input-icon-right w-full p-inputtext-sm">
                <InputText className="w-full"
                    placeholder="Select your token"
                    value={props.search}
                    //onChange={(e) => { setValue(e.target.value); props.enter(value)}}
                    onChange={(e) => { props.setSearch(e.target.value) }}
                /><i className="pi pi-search" />
            </div>
            <button class="p-button p-component p-button-outlined bg-white border-300 p-1 pr-3 pl-2 ml-1 mr-1">
                <i className="pi pi-sort-alt" />
            </button>

            <div className="p-inputtext-sm w-5">
                <Dropdown className="w-full p-inputtext-sm" placeholder="Category" value={props.category} options={selectItems}
                    onChange={(e) => {
                        props.setCategory(e.value)

                    }} />
            </div>
        </ div>
    )
}



