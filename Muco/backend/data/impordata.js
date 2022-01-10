const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: `./config.env` });
const City = require("./../Models/cityModel");
const fs = require("fs");
console.log(process.env.DATABASE);
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));
const citydata = JSON.parse(
  fs.readFileSync(`${__dirname}/dev_data.json`, "utf-8")
);
const importdata = async function () {
  await City.create(citydata);
};
importdata();
