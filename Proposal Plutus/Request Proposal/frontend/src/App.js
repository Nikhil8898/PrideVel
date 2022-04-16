
import React from "react"
import Card from "./component/Card"
import Search from "./component/Search"
import Ticket from "./component/Ticket"
import { useEffect, useState } from "react"
import axios from "axios";
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "primereact/resources/themes/tailwind-light/theme.css"
import 'primeflex/primeflex.css';





export default function App() {

  //const [search, setSearch] = React.useState("")
  //console.log(search)
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("");


  useEffect(() => {
    sendSearch(0)
  }, [search, category])


  console.log(search)

  const sendSearch = async () => {

    let searchApi = await axios.post('http://localhost:8080/fetch/', { search: search, category: category });
    console.log("Data : ", searchApi);
    setData(searchApi.data.data)

  }


  console.log(data)
  const cards = data.map(item => {


    return (
      <Card
        key={item._id}
        {...item}
      />)

  })

  return (
    <>
      <div className="ps-customMarginLeft">
        <div className="grid ml-6 mr-6">
          <p className="text-3xl">Suggestion</p>
        </div>


        <div className="grid ml-6 mr-6">
          <div className="col-8">
            <div className="ps-request-box2">
              <Search
                setSearch={setSearch}
                search={search}
                setCategory={setCategory}
                category={category}
              />
              {cards}

            </div>

          </div>

          <div className="col-4">
            <Ticket />
          </ div>
        </div>



      </div>

    </>

  )
}
