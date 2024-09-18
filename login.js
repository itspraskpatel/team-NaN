require('dotenv').config();
const { Router } = require("express")
const router = Router();
const {Otp} = require("./db");
const {emailSchema} = require("./types")
const sendEmail   = require('./mailer.js');
let htmlTemplate = require("./OtpEmailContent")


router.post("/",async( req,res) =>{
    const email = req.body.email;
    //console.log(email);
    const otp = Math.floor(1000 + Math.random() * 9000);
    const emailwithOTP = {email : email, otp : otp};
    console.log(emailwithOTP);
    const parseEmail = emailSchema.safeParse(emailwithOTP);
    if(!parseEmail.success){
        res.status(400).json({status : "error", message : "Invalid email"});
    }else{
        await Otp.create({
            email : email,
            otp : otp
        });
        sendOTP(email, otp);
        
        res.json({status : "success", message : "OTP sent"});
    }
})

function sendOTP(email,otp){
    const content = htmlTemplate.replace('{{otp}}',otp)
    sendEmail(email , content)

}

router.post("/verify", async (req,res) =>{
    const email = req.body.email;
    const otp = req.body.otp;
    const alluserandotp = await Otp.find({email : email});
    //console.log(alluserandotp);
    //console.log(otp);
    let hasOTP = false
    alluserandotp.map(user=>{if(user.otp == otp) hasOTP = true})
    console.log(hasOTP)
    if(hasOTP){
        await Otp.deleteMany({email : email});
        res.json({status : "success", message : "OTP verified"});

    }else{
      res.json({status: "error" , message: "Wrong Otp"})
    }
  
  })
module.exports = router;

