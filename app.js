//var sql = require('mssql');
var express = require('express');
var Connection = require('tedious').Connection;
var config = {
    userName: 'sa',
    password: 'user11',
    server: 'TESTVM',
    // If you are on Microsoft Azure, you need this:  
    options: { encrypt: false, database: 'OnPremisesDB' }
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
    var result = "";
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });

    request.on('done', function (rowCount, more) {
        console.log(rowCount + ' rows returned');
    });
    connection.execSql(request);
});
app.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;