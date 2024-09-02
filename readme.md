# Cultura BOT

## The API has 3 endpoints as of now

- /bookings  (POST):

    Takes body as input paramter.
    example:

        {
            "name" : "Rahul",
            "time" : "11:55",
            "place" : "delhi",
            "noOfTickets" : 5,
            "age" : 27
        }

    If sucess responds back with

        {
            status : "success", 
            message : "Booking done"
        }

- /login (POST):

    Takes body as input paramter.
                
    example:

        {
            email : "abc@gmail.com"
        }
    
    If sucess responds back with

        {
            "status": "success",
            "message": "OTP sent"
        }


- /login/verify (POST):

    Takes body as input paramter.

    example:

        {
            email : "abc@gmail.com",
            otp : 0000
        }
    
    If sucess responds back with

        {
            "status": "success",
            "message": "OTP verified"
        }

- Any error message will be given as a JSON:

        {
            "status": "error",
            "message": "error message"
        }

