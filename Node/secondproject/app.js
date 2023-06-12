const port = 8080

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.set("view engine", "hbs")
app.set("views", "./view");

var indexRouter = require('./routes/routing');
const { result } = require("underscore");

app.use('/', indexRouter)

// Server running Port Number
app.listen(port, (err) => {
    if (err) {
        throw err
    } else {
        console.log("Server is running at port %d:", port);
    }
});