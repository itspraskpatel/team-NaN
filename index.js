const express = require('express');
const cors = require('cors');
const app = express();
const bookingRouter = require('./bookings');
const loginRouter = require('./login'); 
const receiptRouter = require('./receipt')




app.use(cors());
app.use(express.json());
app.use("/login", loginRouter);

app.use("/bookings", bookingRouter);
app.use("/receipt",receiptRouter)

app.listen(3000,"0.0.0.0", ()=>{console.log("Listening on port 3000")});
// module.exports = app;