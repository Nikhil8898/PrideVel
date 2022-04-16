import React from "react"
//import data from "../data"
import image from "../image/profile.png"
import { Divider } from 'primereact/divider';

export default function Card(props) {

   var category = props.Category
   var title = props.Title
   var walletAddress = props.WalletID
   var description = props.Description
   var status = props.Status

   const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
   let current_datetime = new Date(props.Date)
   //console.log(current_datetime)

   var date = (current_datetime.getDate()) + " " + months[current_datetime.getMonth()] + ", " + current_datetime.getFullYear()
   //console.log(date) 
   return (
      <>
         
            <div className="grid p-0 m-0">
               <div className="col-12">
                  <div className="text-2xl font-medium pb-2 pt-2">
                     {title}
                  </div>
                  <div className="flex align-items-center">
                     <div>
                        <img className="card--profile" src={image} alt="Avatar" />
                     </div>

                     <div className="text-sm font-medium">
                        {walletAddress}
                     </div>
                  </div>

                  <div>
                     <p className="card--desc">
                        {description}
                     </p>
                  </ div>
                  
                  <div className="justify-content-between flex">
                     
                     <div className="ps-request-box text-sm font-medium"> Category: {category} </div>
                     <div className="ps-request-box text-sm font-medium"> Posted: {date} </div>
                     <div className="ps-request-box text-sm font-medium"> Status: {status} </div>
                  </ div>
                  <div className="border-bottom-1 border-200 mt-4"></div>
               </div>
            </div>
         


      </>

   )





}