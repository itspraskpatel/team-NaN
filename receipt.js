const { Router } = require("express")
const router = Router();
const sendEmail   = require('./mailer.js');
const {userDataSchema} = require('./types.js')
let confirmationEmailContent = require("./ConfirmationEmailContent")



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
module.exports = router