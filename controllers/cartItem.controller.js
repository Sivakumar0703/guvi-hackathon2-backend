const cartRouter = require("express").Router();
const userModel = require('../models/user.model');


//get cart
cartRouter.post('/getCart' , async(req,res)=>{
    const user = await userModel.findOne({ email: req.body.email });

    if(!user){
        return res.status(200).json({message:"User not found"})
    }

    const cart = user.cartItem ;

    res.status(200).json({cart ,message:'cart items fetched successfully'})

})

// create cart
cartRouter.post('/addCartItems' , async(req,res) => {
    const email = req.body.email;
    const cartItem = req.body.cartItem;
    //console.log('cart item' , cartItem)
    //console.log('request' , req.body)
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(200).json({message:'user not found'})
    }

    user.cartItem.push(cartItem)
    //console.log(user)
    user.save()
    res.status(200).json({message:'cart added successfully'})
})

// update cart item
cartRouter.patch('/updateCart' , async(req,res)=>{
    //console.log('request' , req.body)
     const email = req.body.email;
     const cartItem = req.body.updatedCart;
   await userModel.findOneAndUpdate({email:email} , {cartItem:cartItem }, {new:true})
    // console.log(user , 'user data')
    res.status(200).json({message:'done'})
})


module.exports = cartRouter;