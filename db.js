const mongoose = require('mongoose');
require('dotenv').config();


const mongoURI = process.env.MONGO_DB_URI
mongoose.connect(mongoURI);

const bookingSchema = new mongoose.Schema({
    name : String,
    museumName : String,
    museumCode : String,
    noOfTickets : Number,
    time : String,
    phone : Number,
    email : String
});

const museumUserDataSchema= new mongoose.Schema({
    name : String,
    noOfTickets : Number,
    time : String,
    phone : Number,
    email : String
});

const otpSchema = new mongoose.Schema({
    email : String,
    otp : Number
});

const Booking = mongoose.model('Booking', bookingSchema);
const Otp = mongoose.model('Otp', otpSchema);

module.exports = { Booking , Otp ,museumUserDataSchema};