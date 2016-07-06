var express = require('express');
var app = express();
var moment = require("moment");
var path = require("path");

app.use(express.static(path.join(__dirname, "./client")));
app.use(express.static(path.join(__dirname, "./node_modules")));


port = 8000
app.listen(port, function(){
	console.log("********** PORT ", port , " **********")
})