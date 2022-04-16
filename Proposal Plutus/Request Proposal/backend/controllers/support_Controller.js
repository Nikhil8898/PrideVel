const { search } = require('../app');
var supportModel= require('../model/Support_model');
module.exports={

    insertDetails: async function (req, res){


    console.log("cat : ", !req.body?.data.Category)
    console.log("DATA Presnet ", !req.body.data)

    const data = req.body?.data;
    const { Category , Title, Description, WalletID, Status} = data

    console.log("Wallet ID : ", WalletID)


    let qry = {Category , Title, Description, WalletID, Status, Date : Date.now()};
        console.log("query : ", qry)

    
    await supportModel.insertMany(qry).then(item => res.json({data: item}) 
      .catch(error => console.log("Error", error))
      
    )
    .catch(err=>{
        res.json({success:false}) 
        console.log("Unable To insert..", err)}
    )
    console.log("I Insert It ... ")

     }, 


     fetchDetails: async function (req, res){
      let search = req.body.search
      let category = req.body.category
      console.log(search)
      console.log(category)
      
  
      if(category !=='' && search !=='' ){
        console.log("Category Search...")
        let qry =  { $text:{ $search: search }} 

        const searchresult = await supportModel.aggregate( [
            { $match: qry },
            { $sort: { score: { $meta: "textScore" },Date:-1} }
          ])
          console.log("search filter",searchresult)
          const data = []
          searchresult.map(item => {
            if (item.Category === category){
              data.push(item)
            }
          })
          console.log("category filter",data)
          return res.json({data: data})                  
        

      }else if(search ==='' && category !==''){
        //let qry = {Category:category}
        supportModel.find({Category:category}).sort({Date:-1}).then( item => res.json({data: item}) )
        .catch(error => console.log("Error", error))
          console.log("Search Null ... ",)

      }else if (search !== '' && category ===''){
        console.log("catgeory null...")
        let qry =  { $text:{ $search: search }} 

        await supportModel.aggregate( [
            { $match: qry },
            { $sort: { score: { $meta: "textScore" },Date:-1} }
          ])
            .then( item => res.json({data: item}) )
          .catch(error => console.log("Error", error))

      }else{
        supportModel.find().sort({Date:-1}).then( item => res.json({data: item}) )
        .catch(error => console.log("Error", error))
          console.log("I Found It ... ",)
        
      }
     
  }}
  