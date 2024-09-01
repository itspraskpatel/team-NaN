the API has 1 endpoints as of now

-bookings:

it is a POST method
takes body as input
paramters and syntax of body is as follow:

{
    "name" : "Rahul",
    "time" : "1155",
    "place" : "delhi",
    "noOfTickets" : 5,
    "age" : 27
}

if sucess responds back with

{status : "success", message : "Booking done"}