require('dotenv').config();
const {Router} = require('express');
const router = Router();
const { Booking, museumUserDataSchema } = require('./db');
const {bookingValue} = require('./types');
const mongoose = require('mongoose');

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
            museumCode : createBooking.museumCode,
            noOfTickets : createBooking.noOfTickets,
            time : createBooking.time,
            phone : createBooking.phone,
            email : createBooking.email
        });
        sendBookingToMuseum(createBooking);
        res.json({status : "success", message : "Booking done"});
    }

});

async function sendBookingToMuseum(createBooking){
    const mongoURI = process.env.MONGO_DB_URI
    mongoose.connect(mongoURI);
    const UserData = mongoose.model(createBooking.museumCode, museumUserDataSchema);

    await UserData.create({
        name : createBooking.name,
        noOfTickets : createBooking.noOfTickets,
        time : createBooking.time,
        phone: createBooking.phone,
        email : createBooking.email

    })
}
module.exports = router;