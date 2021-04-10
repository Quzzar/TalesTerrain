const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname));

const port = 8000;
app.listen(port, function () {
    console.log("Server is running on "+ port +" port");
});

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname +'/index.html'));
});