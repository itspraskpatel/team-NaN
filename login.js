require('dotenv').config();
const { Router } = require("express")
const router = Router();
const {Otp} = require("./db");
const {emailSchema} = require("./types")
//const sendEmail   = require('./mailer.js');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
//let htmlTemplate = require("./OtpEmailContent")
let htmlTemplate = `
<td>
  <div><div></div></div>
  <table
    border="0"
    cellspacing="0"
    cellpadding="0"
    style="padding-bottom: 20px; max-width: 516px; min-width: 220px"
  >
    <tbody>
      <tr>
        <td width="8" style="width: 8px"></td>
        <td>
          <div
            style="
              width:100%;
              border-style: solid;
              border-width: thin;
              border-color: #c1c2c5;
              border-radius: 8px;
              padding: 40px 20px;
              align-self: center;
              margin-left: 20; "
          >
            
            <div
              style="
                font-family: 'Google Sans', Roboto, RobotoDraft, Helvetica,
                  Arial, sans-serif;
                border-bottom: thin solid #dadce0;
                color: rgba(0, 0, 0, 0.87);
                line-height: 32px;
                padding-bottom: 24px;
                text-align: center;
                word-break: break-word;
              "
            >
              <div style="font-size: 24px">Verify your  email</div>
            </div>

            <div
              style="
                font-family: Roboto-Regular, Helvetica, Arial, sans-serif;
                font-size: 14px;
                color: rgb(0, 0, 0);
                line-height: 20px;
                padding-top: 20px;
                text-align: left;
              "
            >
              <div style="color: black;">


                <a>OTP to login in  </a> 
                <a style="font-weight: bold">Cultura Bot</a
              > is <br />

              </div>

              <div
                style="
                  text-align: center;
                  font-size: 36px;
                  margin-top: 20px;
                  line-height: 44px;">
                {{otp}}
              </div>


              <br/><a> code will expire in 24 hours. </a><br /><br />
              
            </div>
          </div>
          <div style="text-align: left">
            <div
              style="
                font-family: Roboto-Regular, Helvetica, Arial, sans-serif;
                color: rgba(0, 0, 0, 0.54);
                font-size: 11px;
                line-height: 18px;
                padding-top: 12px;
                text-align: center;
              "
            >
            </div>
          </div>
        </td>
        <td width="8" style="width: 8px"></td>
      </tr>
    </tbody>
  </table>
</td>`

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

const refresh_token = process.env.REFRESH_TOKEN
const client_id =  process.env.CLIENT_ID
const redirect_uris =  process.env.REDIRECT_URIS
const client_secret = process.env.CLIENT_SECRET

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  client_id ,
  client_secret ,
  redirect_uris
);



oauth2Client.setCredentials({
  refresh_token: refresh_token
});


async function sendEmail(email,content){
    console.log("Sending to: "  + email)
    try {
        
        // Generate an access token
        const accessToken = await oauth2Client.getAccessToken();
        console.log("access token is-------------->" + accessToken.token)
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
            subject: 'Cultura Bot',
            //text: 'Dear user your OTP is ',
            html : content
        };

        // Send the email
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:');
        console.log('Accepted:', result.accepted);
        console.log('Rejected:', result.rejected);
        console.log('Response:', result.response);
        console.log('Message ID:', result.messageId);
    } catch (error) {
        console.log('Error sending email:', error);
    }
    console.log("out of try block")
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

