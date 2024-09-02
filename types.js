const zod = require("zod")

const bookingValue = zod.object({ 
    name : zod.string(),
    time : zod.string(),
    place : zod.string(),
    noOfTickets : zod.number(),
    age : zod.number(),

})
const emailSchema = zod.object({
    email: zod.string().email(),
    otp : zod.number()
})

module.exports = { bookingValue , emailSchema}