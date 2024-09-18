const zod = require("zod")

const bookingValue = zod.object({ 
    name : zod.string(),
    museumName : zod.string(),
    museumCode : zod.string(),
    noOfTickets : zod.number(),
    time : zod.string(),
    phone : zod.number(),
    email : zod.string()
    

})
const emailSchema = zod.object({
    email: zod.string().email(),
    otp : zod.number()
})

const userDataSchema = zod.object({
    name : zod.string(),
    museumName : zod.string(),
    noOfTickets : zod.number(),
    time : zod.string(),
    email : zod.string()
})

module.exports = { bookingValue , emailSchema , userDataSchema}