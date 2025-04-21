//create http server
//import express module
const exp = require("express");
const app = exp();

const cors=require('cors');
app.use(cors({
  origin:'http://localhost:5173'
}))

require('dotenv').config() //process.env.SECRET_KEY

//import MongoClient
const { MongoClient } = require("mongodb");
//Create MongoClient object
let mClient = new MongoClient(process.env.DB_URL);

//connect to mongodb server
mClient
  .connect()
  .then((connectionObj) => {   
    //connect to a database
    const fsddb=connectionObj.db('pvpdb');
    //connect to a collection
    const usersCollection=fsddb.collection('users')
    const productsCollection=fsddb.collection('products')
    const cartCollection=fsddb.collection('cart')
    //share collection obj tp APIS
    app.set('usersCollection',usersCollection);
    app.set('productsCollection',productsCollection);
    app.set('cartCollection',cartCollection);

    console.log("DB connection success");

    //assign port numbr to http server of express app
    app.listen(process.env.PORT, () => console.log("http server started on port 4000"));
  })
  .catch((err) => console.log("Error in DB connection", err));


  

//import userApp express object
const userApp = require("./APIs/userApi");
const productApp = require("./APIs/productsApi");

//if path starts with /user-api, forward req to userApp
app.use("/user-api", userApp);
//if path starts with /user-api, forward req to userApp
app.use("/product-api", productApp);

//handling invalid path
app.use('*',(req,res,next)=>{
  console.log(req.path)
  res.send({message:`Invalid path`})
})

//error handling middleware
app.use((err,req,res,next)=>{
  res.send({message:"error occurred",errorMessage:err.message})
})