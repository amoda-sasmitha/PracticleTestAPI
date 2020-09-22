const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
mongoose.set("useCreateIndex", true);
require('dotenv').config()


//import routes------------------------------------
const users_routes = require("./routes/users.router");
const transaction_routes = require("./routes/transactions.router");


//user routes
app.use("/users", users_routes);
app.use("/transaction", transaction_routes);

app.get( '/' , (req, res) => {
  res.status(200).json({
    message : 'Welcome to API'
  })
})

//error handling ------------------------
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

app.use((error, req, res, next) => {

res.status(error.status || 500);
res.json({
    error: {
    message: error.message,
    },
});
});

mongoose
    .connect( process.env.DB_URL,  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to the database now");
    })
    .catch((err) => {
      console.log("Could not connect to the database. Exiting now...", err);
      process.exit();
    });
  
  // open server
  app.listen(process.env.PORT , () => {
    console.log("Server is up and running on port numner " + process.env.PORT );
  });