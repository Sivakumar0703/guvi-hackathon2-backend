const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 const secretKey = process.env.SECRET_KEY ;
  

const hashPassword = async(password)=>{
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword
}


const hashCompare= async(password,hashedPassword)=> { // password = req.body.password(from client side) & hashedPassword = user.password(from DB)
    return await bcrypt.compare(password,hashedPassword)

}

const createToken = async(payload) => { // payload => name,email,id,role 
    let token =  jwt.sign(payload,secretKey) 
    return token
}

module.exports = {hashPassword,hashCompare,createToken}