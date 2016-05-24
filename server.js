var app = require('express')();
var http = require('http').Server(app);
var io = require('./socket.js')(http);
var bodyParser = require('body-parser');

//create application/json parser
var jsonParser = bodyParser.json()

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/', jsonParser, function(req, res){
    console.log('POST /');
    console.dir(req.body);

    io.sendToFirst('char-received', 'A');

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('thanks');
});



http.listen(3000, function(){
	console.log('listening on *:3000');
});