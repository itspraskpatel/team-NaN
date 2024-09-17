const zod = require("zod")

const bookingValue = zod.object({ 
    name : zod.string(),
    museumName : zod.string(),
    noOfTickets : zod.number(),
    time : zod.string(),
    phone : zod.number(),
    email : zod.string()
    

})
const emailSchema = zod.object({
    email: zod.string().email(),
    otp : zod.number()
})

module.exports = { bookingValue , emailSchema}