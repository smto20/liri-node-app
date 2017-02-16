//dependency for npm packages
var request = require("request");

var Twitter = require('twitter');
var keys = require('./keys.js');

var Spotify = require('spotify');

var input = process.argv;
var command = input[2];
var info = input[3];

//Creating LIRI
var liri = {

        //Tweets - show last 20 and dates posted 
        tweets: function() {
            var client = new Twitter(keys.twitterKeys);
            const params = {
                screen_name: 'smto20',
                count: 20
            };

            client.get('statuses/user_timeline', params, function(error, tweets, response) {
                if (!error) {
                    for (var i = 0; i < tweets.length; i++) {
                        console.log(`My Tweets:\n ${i+1}: ${tweets[i].text}\n${tweets[i].created_at}`);
                    }
                } else {
                    console.log(error);
                }
            });
        },


        //spotify show artist, name, preview link, album - default to ace of base, "The Sign"
        songs: function() {
            Spotify.search({ type: 'track', query: 'ace of base the sign', limit: 1 }, function(error, data) {
                if (!error) {
                    console.log(JSON.stringify(data.items, null, 4));

                    var artistName = data.tracks.items[0].album.artists[0].name;
                    var songName = data.tracks.items[0].name;
                    var songLink = data.tracks.items[0].

                    console.log(`
          `);
                } else {
                    console.log('Error occurred: ' + error);
                    return;
                }
            });

        },

        movies: function() {
            function movie() {

                var movieName = value;
                var movieDefault = "Mr.Nobody";
                var url = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';
                var urlDefault = 'http://www.omdbapi.com/?t=' + movieDefault + '&y=&plot=short&r=json';

                if (movieName != null) {
                    request(url, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log("Title: " + value);
                            console.log("Year: " + JSON.parse(body)["Year"]);
                            console.log("Rating: " + JSON.parse(body)["imdbRating"]);
                            console.log("Country of Production: " + JSON.parse(body)["Country"]);
                            console.log("Language: " + JSON.parse(body)["Language"]);
                            console.log("Plot: " + JSON.parse(body)["Plot"]);
                            console.log("Actors: " + JSON.parse(body)["Actors"]);
                            console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["rottentomatoesRating"]);
                            console.log("Rotten Tomatoes URL: " + JSON.parse(body)["rottentomatoesUrl"]);

                        }; 
                    }); 

                    // if user doesn't enter a value default to Mr.Nobody
                } else {
                    request(urlDefault, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log("Title: " + movieDefault);
                            console.log("Year: " + JSON.parse(body)["Year"]);
                            console.log("Rating: " + JSON.parse(body)["imdbRating"]);
                            console.log("Country of Production: " + JSON.parse(body)["Country"]);
                            console.log("Language: " + JSON.parse(body)["Language"]);
                            console.log("Plot: " + JSON.parse(body)["Plot"]);
                            console.log("Actors: " + JSON.parse(body)["Actors"]);
                        };
                    });
                } 
            }
            do: function() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
      if(err) throw err;
      console.log(data.toString());

      var cmds = data.toString().split(',');

      app[cmds[0].trim()](cmds[1].trim());
    });
  },
};//Close LIRI


        // ----- Events ----- //

        switch (command) {
            case "my-tweets":
                liri.tweets();
                break;

            case "spotify-this-song":
                liri.songs();
                break;

            case "movie-this":
                liri.movies();
                break;

            case "do-what-it-says":
                liri.do();
                break;

            default:
                console.log("Error with command");
        }
