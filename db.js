const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://itspraskpatel:dbpass12@cluster0.xowprk8.mongodb.net/team-NaN");

const bookingSchema = new mongoose.Schema({
    name : String,
    museumName : String,
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

module.exports = { Booking , Otp };