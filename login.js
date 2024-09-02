const { Router } = require("express")
const router = Router();
const {Otp} = require("./db");
const {emailSchema} = require("./types")
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const fs = require('fs');

const refresh_token = "1//04wI8JUIrlLhiCgYIARAAGAQSNwF-L9IrM6MNoFMMabsZqFmSDzEqhfMEru4Kw4N2A2SpbrFs7PoDYo0a8V-mCiAb4Rcds8jSYfc"
const client_id =  "606398992485-vafmj5p1n2vskkbsjqob90ass0cftp63.apps.googleusercontent.com"
const redirect_uris =  "https://developers.google.com/oauthplayground"
const client_secret = "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"

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  client_id ,
  client_secret ,
  redirect_uris
);

// Set the refresh token
var htmlTemplate = fs.readFileSync('./mailContent.html', 'utf8');

oauth2Client.setCredentials({
  refresh_token: refresh_token
});
async function sendOTP(email , otp){
    try {
        // Generate an access token
        const accessToken = await oauth2Client.getAccessToken();
        htmlTemplate = htmlTemplate.replace('{{otp}}',otp)
        //console.log("access token is-------------->" + accessToken.token)
        // Create a Nodemailer transporter with OAuth2
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: "yourculturabot@gmail.com",
                clientId: client_id,
                clientSecret: client_secret,
                refreshToken: refresh_token,
                accessToken: accessToken.token // Use the token from OAuth2 client
            },
        });
        // Define email options
        const mailOptions = {
            from: "Cultura Bot",
            to: email, // Replace with the recipient's email
            subject: 'OTP for login',
            //text: 'Dear user your OTP is ',
            html : htmlTemplate
        };

        // Send the email
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
    
}

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
        sendOTP(email,otp);
        
        res.json({status : "success", message : "OTP sent"});
    }
})


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

