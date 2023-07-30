
const paymentRouter = require("express").Router();
const paymentModel = require("../models/payment.model");

// get payment data
paymentRouter.get("/",async(req,res) => {
    try {
        let payment = await paymentModel.find();
        //console.log(payment)
      
        res.status(200).json({payment,message:"all payment data are fetched"})
    } catch (error) {
        console.log(error)
        res.status(200).json({message:"not able to fetch payment data"})
    }
});




// create payment data
paymentRouter.post('/cartPayment',async(req,res) => {
  const { cartItems ,  userName ,  totalAmount , email  , orderId } = req.body
try {
    const newCart = new paymentModel({
        cartItems : cartItems,
        email:email,
        userName : userName,
        totalAmount : totalAmount,
        orderId : orderId 
    })
   await newCart.save()
    res.status(200).json({newCart,message:"payment done"}) 
} catch (error) {
    //console.log(error)
    res.status(500).json({message:"error occured in payment process",error})
}
})


module.exports = paymentRouter;