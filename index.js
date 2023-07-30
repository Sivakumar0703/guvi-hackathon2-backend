const express = require("express");
const app_server = require("./app");
const router = express.Router();
//https://webcodetwo.onrender.com/

const  node_server= express()
//require('dotenv').config();

const port = process.env.PORT;


node_server.use("/",app_server);
node_server.use("/",router);

router.get('/', function(req, res) {
  try {
    res.status(200).json({message:`<h1> Wlecome to Express </h1>`})
  } catch (error) {
    res.status(400).json({message:error})
  }
});

node_server.listen(port , ()=>console.log(`server started at port ${port}`));


module.exports =router;