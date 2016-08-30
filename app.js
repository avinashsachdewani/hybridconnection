//var sql = require('mssql');
var express = require('express');
//var sql = require('sqlserver');
var app = express();
app.set('port', process.env.PORT || 3000);
app.get('/getData', function (request, res) {
    var onPremConnString = request.service.config.appSettings.onPremisesDatabase;
    console.log(onPremConnString);
    return response.send(onPremConnString);
});
app.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;