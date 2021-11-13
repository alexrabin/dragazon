var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

const dotenv = require('dotenv');
dotenv.config();

var mongoose = require("mongoose");

var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var tasksRouter = require("./routes/tasks");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

//var mongoDB = "mongodb://127.0.0.1/database";
var mongoDB =
`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@dragdb.v2dr9.mongodb.net/Dragazon?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("connected", () => console.log(`Mongoose connection open to ${mongoDB}`));
db.on("disconnected", () => console.log("Mongoose connection disconnected"));
db.on("error", console.error.bind(console, "Mongoose connection error:"));

module.exports = app;
