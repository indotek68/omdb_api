var express = require("express");
var request = require("request");
var bodyParser = require("body-parser")
var path = require('path');

var favorites = [];

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());

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

//should imdb details
app.get('/movie/:id', function(req, res){
	var id = req.params.id
	var url = "http://www.omdbapi.com/?i=" + id;

	request(url, function(error, response, body){
		if(!error){
			var body = JSON.parse(body);
			// console.log(body);
			res.render("movie", {movieList: body})
		}
	})
});

app.post('/favorites', function(req, res){
	var title = req.body.title;
	var id = req.body.id;
	var movieFav = {title: title, id: id}
	//console.log("this title " + movieFav)
	favorites.push(movieFav)
	res.redirect("/favorites")

})

app.get('/favorites', function(req, res){
	res.render("favorites",  {movieArray: favorites})
})

app.listen(3000);
