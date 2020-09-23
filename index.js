const express = require("express");
const morgan = require("morgan");

const cors = require('./middlewares/cors');

//Call express
const app = express();

//Port
const PORT = process.env.PORT || 3000;

//Connection to db
require("./config/mongoose");


//Middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev"));

app.use(express.json());
  
app.use(cors);
  
//Router
const userRouter = require("./routes/users");

//Endpoint Router
app.use("/users", userRouter);


//Server up
app.listen(PORT, () => console.log(">>> SERVER ONLINE ON PORT " + PORT + "."));