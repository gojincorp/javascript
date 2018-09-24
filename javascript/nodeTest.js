const http = require('http');

const server = http.createServer(function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.end(JSON.stringify({
		platform: process.platform,
		nodeVersion: process.version,
		uptime: Math.round(process.uptime()),
	}));
});

//const hostname = '127.0.0.1';
const hostname = '0.0.0.0';
const port = 7071;
server.listen(port, hostname, function() {
	console.log(`Ajax server started on port ${port}`);
})