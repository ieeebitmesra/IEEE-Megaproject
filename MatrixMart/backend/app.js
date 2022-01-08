const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const middleware = require('./middleware/error');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports

//Product Route
const product = require("./routes/productRoute");

//User Route
const user = require("./routes/userRoutes");

//Order Route
const order = require("./routes/orderRoute");

//Payment Route
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//middleware for errors 
app.use(middleware);

module.exports = app;