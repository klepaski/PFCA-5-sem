const http = require('http');
const url = require('url');
const fs = require('fs');

var factorial = function(n) {
    if(n == 0) {
        return 1
    } else {
        return n * factorial(n - 1);
    }
}

const server = http.createServer(function (request, response) {
    let rc = JSON.stringify({ k:0 });
    if (url.parse(request.url).pathname === '/fact') {
        console.log(request.url);
        var url_parts = url.parse(request.url, true);
        var query = url_parts.query;
        var k = query["k"];

        if (k.toString() == "x") {
            fs.readFile("./03-04.html", (err, data) => {
                response.end(data);
            });
        }
        else if (typeof url.parse(request.url, true).query.k != 'undefined') {
            let k = parseInt(url.parse(request.url, true).query.k);
            if (Number.isInteger(k)) {
                response.writeHead(200, {'Content-Type' : 'application/json'});
                response.end(JSON.stringify({ k:k , fact : factorial(k) }));
            }
        }
    }
    else {
        response.end(rc)
    }
}).listen(5000)