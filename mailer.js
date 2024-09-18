const nodemailer = require('nodemailer');
const { google } = require('googleapis');



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
            subject: 'Cultura Bot',
            //text: 'Dear user your OTP is ',
            html : content
        };

        // Send the email
        const result = await transporter.sendMail(mailOptions);
        cconsole.log('Email sent successfully:');
        console.log('Accepted:', result.accepted);
        console.log('Rejected:', result.rejected);
        console.log('Response:', result.response);
        console.log('Message ID:', result.messageId);
    } catch (error) {
        console.log('Error sending email:', error);
    }
    
}
module.exports = sendEmail