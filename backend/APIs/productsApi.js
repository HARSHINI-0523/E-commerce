//create mini exp app
const exp=require('express');
const productApp=exp.Router();

const expressAsyncHandler=require('express-async-handler')

//get all products
productApp.get('/products',expressAsyncHandler(async(req,res)=>{
    //get prod coll obj
    let productsCollection=req.app.get('productsCollection')
    //get all products
    let productsList=await productsCollection.find().toArray()
    //send res
    res.send({message:'products',payload:productsList})
}))


//get a product by id
productApp.get('/products/:id',expressAsyncHandler(async(req,res)=>{
      //get prod coll obj
      let productsCollection=req.app.get('productsCollection')
      //get product id from url
      let productId=Number(req.params.id)
      //read product by its id
      let product=await productsCollection.findOne({id:productId})
      //send res
      res.send({message:"product",payload:product})
}))



//export
module.exports=productApp;






