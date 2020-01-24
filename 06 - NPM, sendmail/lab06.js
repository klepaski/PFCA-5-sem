var http = require('http');
var fs = require('fs');
var url = require('url');
const { parse } = require('querystring');
const { send } = require('./lab06Send');

/*const SMTPConnection=require("nodemailer/lib/smtp-connection");
let connection = SMTPConnection({port:25});
connection.connect();*/

const sendmail = require('sendmail')({silent: true, smtpHost: 'localhost'});

let http_handler = (req, resp)=>{

    resp.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    if(url.parse(req.url).pathname =='/' && req.method == 'GET'){
        resp.end(fs.readFileSync('./lab06.html'));
    }
    

    else if(url.parse(req.url).pathname == '/' && req.method == 'POST'){
        let body = '';
        req.on('data', chunk => {body += chunk.toString();});
       
        req.on('end', ()=>{
            let parm = parse(body);
            sendmail({
                from: parm.reciver,
                to: parm.sender,
                subject: 'test sendmail',
                html: parm.message
            }, function (err, reply){
                console.log(err && err.stack);
                console.dir(reply);
            });
            resp.end('<h1>OK: '+ parm.reciver + ', ' + parm.sender + ', ' + parm.message + '</h1>');
        });
    }

    //письмо на ящик по умолчанию, заданный в lab06Send.js
    else if(url.parse(req.url).pathname == '/send')
    {
        send('Hello');
    }
    else resp.end('<h1>Not support</h1>');
}

let server = http.createServer(http_handler);
server.listen(5000);
console.log('Server running at http://localhost:5000/');