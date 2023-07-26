const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectToDb = require("./config/dbConnection");
const app = express();

connectToDb();

const port = process.env.port || 2001;

app.use(express.json());

app.use("/contacts", require("./Route/contactRoutes"));
app.use("/auth", require("./Route/authRoutes"));

app.use(errorHandler);

app.listen(port, function () {
  console.log(`server runing on port ${port}`);
});
