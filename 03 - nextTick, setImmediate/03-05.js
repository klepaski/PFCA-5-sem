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

function Factor(n, cb) {
    this.fn=n;
    this.ffactorial=factorial;
    this.fcb=cb;
    this.calc= ()=>{setImmediate(()=>{this.fcb(null, this.ffactorial(this.fn));});}
}
const server = http.createServer(function (request, response) {
    let rc = JSON.stringify({ k:0, fact:0});
    if (url.parse(request.url).pathname === '/fact') {
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
                let f=new Factor(k,(err,result)=>{response.end(JSON.stringify({ k:k , fact : result}));});
                f.calc();
            }
        }
    }
    else {
        response.end(rc)
    }
}).listen(5000)