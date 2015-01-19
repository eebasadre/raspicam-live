
var TEST_MODE = process.argv[2] === 'test' // flag for test mode
var TEST_INTERVAL = process.argv[3] || 1000;

var SERVER_URL = process.env.SERVER_URL || 'http://local.host:3000';
var socket = require('socket.io-client')(SERVER_URL + '/stream', {
		query: "type=client",
		transports: ['websocket']
});

// startCamera();

socket.on('connect_error', function(){
	console.log('Connection Failed');
});
socket.on('disconnect', function () {
	console.log('Disconnected');
});
socket.on('connect', function(){
	console.log('Connected.');
	if (TEST_MODE) return require('./lib/sendTestImage')(socket, TEST_INTERVAL);
	// init camera
	require('./lib/startCamera')(socket);
});


