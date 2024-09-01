const express = require('express');
const cors = require('cors');
const zod = require("zod")
const mongoose = require('mongoose');
const app = express();
const { Booking } = require('./db');
const {bookingValue} = require('./types');

app.use(cors());
app.use(express.json());


app.post("/bookings" , async (req, res) => {
    console.log(req.body);
    const createBooking = req.body;
    const parseBooking = bookingValue.safeParse(createBooking);
    if(!parseBooking.success) {
        res.status(400).json({staus : "error", message : "Something wrong with the inputs"});
    }else{

        await Booking.create({
            name : createBooking.name,
            time : createBooking.time,
            place : createBooking.place,
            noOfTickets : createBooking.noOfTickets,
            age : createBooking.age,
        });

        res.json({status : "success", message : "Booking done"});
    }

});

app.listen(3000,"0.0.0.0", ()=>{console.log("Listening on port 3000")});