const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const path = require("path");

var PORT = process.env.PORT || 3300;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
});


// routes
app.use(require("./routes/api.js"));

app.listen(process.env.PORT || 3300, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});