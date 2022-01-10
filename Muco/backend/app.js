const express = require("express");
const hbs = require("hbs");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/userRoute");
const cityRouter = require("./Routes/cityRoute");
const globalErrorHandler = require("./Controllers/errorController");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");
const AppError = require("./utlis/appError");
const postRouter = require("./Routes/postRoute");
const viewRouter = require("./Routes/viewsRouter");
const app = express();
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
  );
  next();
});
// publistatic path

app.use(express.static("public"));

//app.engine("html", require("hbs").renderFile);
app.set("view engine", "pug");

app.set("views");

app.use(cookieParser());
// route imports
app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/city", cityRouter);
app.use("/api/v1/post", postRouter);
////To handle unhandled route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

////Global middleware to handle all sorts of errors
app.use(globalErrorHandler);
module.exports = app;
