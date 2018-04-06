import express = require('express');
import bodyParser = require('body-parser');
var path = require('path');

console.log("starting server");

let server = express();

server.use(bodyParser.json());

server.use(express.static(__dirname + '/../streamingFrontend'));

server.listen(3000);