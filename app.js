//var sql = require('mssql');
var express = require('express');
var Connection = require('tedious').Connection;
var config = {
    userName: 'sa',
    password: 'user11',
    server: 'TESTVM',
    // If you are on Microsoft Azure, you need this:  
    options: { encrypt: false, database: 'OnPremisesDB', rowCollectionOnDone: true }
};
var connection = new Connection(config);
connection.on('connect', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    // If no error, then good to proceed.  
    console.log("Connected");
});
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
    request = new Request("SELECT * FROM AspNetUsers", function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.send(request);
});
app.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;