const productRouter = require("express").Router();
const productModel = require("../models/products.model");



// get request
productRouter.get("/", async(req, res, next) => {
    try {
        let products = await productModel.find();
        res.status(200).json({products,message:"all product data are fetched"})
    } catch (error) {
        res.status(400).json({message:"not able to get product data",error})
    }
});



productRouter.post("/getProductById", async(req, res) => {

    const productId = req.body.productId
    try {
        let product = await productModel.findOne({_id:productId});
        res.status(200).json({product,message:" product data are fetched"})
    } catch (error) {
        res.status(400).json({message:"not able to get product data",error})
    }
});









// post => add new product
productRouter.post("/addProducts", (req, res) => {

    const { name, type, price , description, image , quantity} = req.body;

    const newProduct = new productModel({
        name: name,
        type: type,
        price: price,
        description : description,
        image : image,
        quantity : quantity 
    });

    newProduct.save()
        .then((response) => {
            if (response._id) {
                return res.status(200).json({
                    message:"product added successfully",
                    response
                })
            }
        })
        .catch((error) => {
            return res.status(400).json({
                message : error,
                error:"error in adding product"
            })
        })
});

// put - update 
productRouter.put('/:id', async(req,res,next) => {
    try {
        let product = await productModel.findOne({_id:req.params.id})
        if(product){
            product.name = req.body.name
            product.type = req.body.type
            product.price = req.body.price
            product.description = req.body.description
            product.image = req.body.image
            product.quantity = req.body.quantity // delete

            await product.save()

            res.status(200).json({message:"product updated"})
        }
    } catch (error) {
        res.status(500).json({message:"product doen't exists",error})
        console.log(error);
    }
})



module.exports = productRouter;