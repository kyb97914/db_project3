var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mainRouter = require('./api/main');


var mysql=require('mysql');
var connection= mysql.createConnection({
    host: 'localhost',
    user:"test1",
    password:"4717",
    port:3306,
    database :"project"
})
connection.connect();

connection.query('SELECT * from users', function(err, rows, fields) {
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.', err);
  });



app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

app.use(express.static('public'));
app.use('/',mainRouter);