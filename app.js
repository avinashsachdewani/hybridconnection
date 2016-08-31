//var sql = require('mssql');
var express = require('express');
var sql = require('mssql');
var config = {
    user: 'sa',
    password: 'user11',
    server: 'TESTVM', // You can use 'localhost\\instance' to connect to named instance
    database: 'OnPremisesDB'
}
var app = express();
app.set('port', process.env.PORT || 3000);
app.get('/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        var request = new sql.Request();
        request.query('SELECT * FROM AspNetUsers', function (err, recordset) {
            res.send(recordset);
        });
    });
});
app.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;