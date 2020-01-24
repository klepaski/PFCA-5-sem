const http = require('http');
const fs   = require('fs')//.promises;
const port = 3000;

http.createServer((req, res) => {
	if (req.url === '/html') {
		fs.readFile('index.html', (err,data)=>{
			res.contentType = 'text/plain';
			res.end(data);
		});
	}

	else if (req.url === '/png') {
		fs.readFile('image.png', (err,data)=>{
			res.writeHead(200, {'Content-Type':'image/png'});
			res.end(data);
		});
	}

	else if (req.url === '/api/name') {
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.end('Chistyakova Julia');
	}

	else if (req.url === '/xmlhttprequest') {
		fs.readFile('xmlhttprequest.html', (err,data)=>{
			res.contentType = 'text/plain';
			res.end(data);
		});
	}

	else if (req.url === '/fetch') {
		fs.readFile('fetch.html', (err,data)=>{
			res.contentType = 'text/plain';
			res.end(data);
		});
	}

	else if (req.url === '/jquery') {
		fs.readFile('jquery.html', (err,data)=>{
			res.contentType = 'text/plain';
			res.end(data);
		});
	}
}).listen(3000)

console.log(`server is listening on ${port}`);
