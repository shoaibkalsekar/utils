var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));
console.log("Server running on localhost listening to port : 8080");
app.listen(8080);