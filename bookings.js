const {Router} = require('express');
const router = Router();
const { Booking } = require('./db');
const {bookingValue} = require('./types');



router.post("/" , async (req, res) => {
    console.log(req.body);
    const createBooking = req.body;
    const parseBooking = bookingValue.safeParse(createBooking);
    if(!parseBooking.success) {
        res.status(400).json({staus : "error", message : "Something wrong with the inputs"});
    }else{

        await Booking.create({
            name : createBooking.name,
            museumName : createBooking.museumName,
            noOfTickets : createBooking.noOfTickets,
            time : createBooking.time,
            phone : createBooking.phone,
            email : createBooking.email
        });

        res.json({status : "success", message : "Booking done"});
    }

});
module.exports = router;