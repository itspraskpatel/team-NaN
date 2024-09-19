const { Router } = require("express")
const router = Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
//const sendEmail   = require('./mailer.js');
const {userDataSchema} = require('./types.js')
//let confirmationEmailContent = require("./ConfirmationEmailContent")
let confirmationEmailContent = `
<style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f0f4f8;
      color: #333;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .container {
      background-color: #fff;
      padding: 50px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      text-align: center;
    }
    h1 {
      color: #007acc;
      margin-bottom: 36px;
      
    }
    p {
      font-size: 16px;
      line-height: 1;
      margin-bottom: 1px;
      text-align: left;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Booking Done!!</h1>
    <p>Name: {{name}}</p>
    <p>Museum Name: {{museumName}}</p>
    <p>Tickets: {{noOfTickets}}</p>
    <p>Time: {{time}}</p>
  </div>`


router.post('/', (req,res)=>{
    const userData  = req.body;
    const parseUserData = userDataSchema.safeParse(userData)
    if(!parseUserData.success){
        res.status(400).json({staus : "error", message : "Something wrong with the inputs"});
    }else{
        confirmationEmailContent = setValues(confirmationEmailContent , userData)
        sendEmail(userData.email ,confirmationEmailContent);
        res.json({status : "success", message : "Receipt Sent"})

    }

})
function setValues(confirmationEmailContent, userData){
    confirmationEmailContent = confirmationEmailContent
                                .replace('{{name}}', userData.name)
                                .replace('{{museumName}}', userData.museumName)
                                .replace('{{noOfTickets}}', userData.noOfTickets)
                                .replace('{{time}}', userData.time);
    return confirmationEmailContent
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
module.exports = router