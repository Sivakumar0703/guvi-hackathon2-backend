const express = require("express");
require('dotenv').config();
const app_server = express();

const productRouter = require("./controllers/product.controller");
const userRouter = require("./controllers/user.controller");
const cartRouter = require("./controllers/cartItem.controller")
const paymentRouter = require("./controllers/payment.controller")
const razorRouter = require("./controllers/razorpay")
const cors = require('cors')
require("./dbconfig");



app_server.use(cors());
app_server.use(express.json());
app_server.use("/products" , productRouter);
app_server.use("/users",userRouter);
 app_server.use("/cart",cartRouter);
app_server.use("/payment",paymentRouter); // cart payment
app_server.use("/razor" , razorRouter);




module.exports = app_server;