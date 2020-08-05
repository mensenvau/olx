const express = require('express')
const app = express()
const path = require('path');
const router = require('./app/index');
const tapp = require("./app/tapp")

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use("/", router)
app.use("/tel", tapp)

app.listen(process.env.PORT || 5000, () => {
    console.log("Create server and Port : 5000 !.");
})