const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://itspraskpatel:dbpass12@cluster0.xowprk8.mongodb.net/team-NaN");

const bookingSchema = new mongoose.Schema({
    name : String,
    time : String,
    place : String,
    noOfTickets : Number,
    age : Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Booking }