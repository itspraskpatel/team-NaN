const zod = require("zod")

const bookingValue = zod.object({ 
    name : zod.string(),
    time : zod.string(),
    place : zod.string(),
    noOfTickets : zod.number(),
    age : zod.number(),

})

module.exports = { bookingValue }