
var io = require('socket.io');
var sockets = [];

var api = {

	sendToAll:function(event, content){
		io.emit(event, content);
	},

	sendToAllRegisteredSockets:function(event, content){
		sockets.forEach(function(socket){
	    	socket.emit(event, content);
	    });
	},

	sendToSocket:function(index, event, content){
		sockets[index].emit(event, content);
	},

	sendToFirst:function(event, content){
		this.sendToSocket(0, event, content);
	}
};


module.exports = function (http) {
	io = io(http);
	io.on('connection', function(socket){
		console.log('a user connected');
		socket.on('disconnect', function(){
			console.log('user disconnected');
			var index = sockets.indexOf(socket);
			if( index > -1){
				sockets.splice(index,1);
			}

		});
		sockets.push(socket);

	});

	return api;
};

