var express = require("express");
var request = require("request");
var bodyParser = require("body-parser")
var path = require('path');

var app = express();
app.use(express.static(__dirname + '/public'));


app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/search', function(req, res){
  var query = req.query.searchTerm;
  var url = "http://www.omdbapi.com/?s=" + query;

  request(url, function(error, response, body){
  	if(!error){
  		var body = JSON.parse(body);
  		res.render('results', {movieList: body.Search});
  	}
  });
});

//should have title and imdb id
app.get('/movie/:id', function(req, res){
	res.render("movie")
});

app.listen(3000);
