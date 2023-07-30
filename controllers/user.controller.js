const userRouter = require("express").Router();
const userModel = require('../models/user.model'); 
const { hashPassword, hashCompare,createToken } = require('./authorization.controller');
const nodemailer = require('nodemailer')



// get request
userRouter.get('/',async(req,res)=>{
    try {
        let user = await userModel.find({},{"password":0});
        res.status(200).json({user,message:"done"})
    } catch (error) {
        res.send({message:"unable to get user data",error})
    }
})

// sign up or register
userRouter.post('/signup', async (req, res) => {

    try {

        let hashedPassword = await hashPassword(req.body.password)
        req.body.password = hashedPassword

        let user = await userModel.findOne({ email: req.body.email })
        
        if (!user) {
            let user = await userModel.create(req.body);
            res.status(201).json({
                message: "Signup successfull"
            })
        } else {
            res.status(400).json({ message: "user already exist!" })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })

    }

})



// login 
userRouter.post('/login', async (req, res) => {

    try {
        
        let user = await userModel.findOne({ email: req.body.email });

        if (user) {
            
            if(await hashCompare(req.body.password , user.password)){
                //create token
                let token = await createToken({
                    userName:user.userName,
                    email:user.email,
                    id:user._id,
                    role:user.role
                })
                
             const userData = {
               userName : user.userName,
               email : user.email,
               cartItem : user.cartItem,
               mobile:user.mobile,
               role:user.role
             }

                res.status(200).json({
                    message: "Login successfull",
                    token,
                   userData  
                    
                })
                
            } else {
                res.status(400).json({ message: "invalid password" })
            }
        } else {
            res.status(400).json({ message: "Wrong Email Id" })
        }


    } catch (error) {
       // console.log(error)
        res.status(500).json({
            message: "Internal Server Error!",
            error: error   
        })

    }

})

// sending mail - ( contact(request/feedback) mail from user )
userRouter.post('/send_mail' , async(req , res) => {
    const contact_us_msg = req.body;
    console.log(contact_us_msg)
    try {
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.USER,
                pass : process.env.PASS
            }
        })
        const mailOption = {
            from : process.env.USER , // website's mail id
            to : process.env.RECEIVING_MAIL_ID ,  // receiving mail id
            subject : 'Online Rental' ,
            html : 
            `
             <li> <h4> REQUEST/FEEDBACK FROM CLIENT </h4> </li> <ul>
             <li> <p> Client Name : ${contact_us_msg.userName} </p> </li>
             <li> <p>  Email : ${contact_us_msg.email} </p> </li>
             <li> <p>  Mobile Number : ${contact_us_msg.mobile} </p> </li>
             <li> <p> Client Request/Feedback : ${contact_us_msg.message} </p> </li>
            </ul> `
        }
        transporter.sendMail(mailOption , (error , info) => {
                 if(error){
                     console.log(error);
                 } else {
                    //console.log(`Email sent successfully : ${info.response}`)
                    res.status(200).send('mail sent successfully')
                 }
        })
        transporter.close()
    } catch (error) {
        res.status(500).json({message: "Internal Server Error!", error: error , spot:"error in nodemailer"})
    }
})



module.exports = userRouter;
