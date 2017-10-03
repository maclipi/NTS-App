var express = require('express');
var http = require('http');
var path = require('path');
var twit = require('twitter');
var bodyParser = require('body-parser');



const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });




var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var staticRoot = __dirname;
var twitter = new twit({
  consumer_key: '0RIfIXExdMm9FyDntSLVUcdGw',
  consumer_secret: 'TMgXyfK4CpdICoRYXcBgmoSPp4IntjZ6bCYshe2OhTnz1J24Ca',
  access_token_key: '794910928076537856-jdYLprWx6sZJ5JSzZWBg39NaDHj8hhe',
  access_token_secret: 'Bh5uFhnfMYCfCnJniFANMNugh6vnDPk67xuufnCGwG5Ue'

});

var server = http.createServer(function (req, res) {
    
        // Send HTML headers and message
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>Hello Socket Lover!</h1>');
    });


app.set('port', (port));
app.use(express.static(staticRoot));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

var server = http.createServer(app).listen(port, function() {
  console.log('Server listening on port ' + port);
});

var io = require('socket.io').listen(server);


  var searchquery = "hello";

  twitter.stream('statuses/filter', {track: "hello"}, function(stream) {
    stream.on('data', function(data) {

      data.location = data.geo ? data.geo.coordinates:[];

      var tweet ={
        created_at : data.created_at,
        text:data.text,
        username:data.user.screen_name,
        followers_count: data.user.followers_count,
        following_count: data.user.friends_count,
        statuses_count: data.user.statuses_count,
        profile_image_url:data.user.profile_image_url,
        coordinates:data.location
      };
      io.emit('tweet', tweet);

      
    
      console.log(tweet.text);
      io.send(tweet);

      wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
          console.log('received: %s', message);
        });
       
        ws.send(tweet.text);

       });
      
    });

    stream.on('error', function(error) {
      throw error;
    });
  });
