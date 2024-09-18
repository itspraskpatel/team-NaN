let confirmationMailConetnt = `
<style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f0f4f8;
      color: #333;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .container {
      background-color: #fff;
      padding: 50px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      text-align: center;
    }
    h1 {
      color: #007acc;
      margin-bottom: 36px;
      
    }
    p {
      font-size: 16px;
      line-height: 1;
      margin-bottom: 1px;
      text-align: left;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Booking Done!!</h1>
    <p>Name: {{name}}</p>
    <p>Museum Name: {{museumName}}</p>
    <p>Tickets: {{noOfTickets}}</p>
    <p>Time: {{time}}</p>
  </div>`

module.exports = confirmationMailConetnt