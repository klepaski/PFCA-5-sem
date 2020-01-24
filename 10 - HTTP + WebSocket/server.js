let http = require('http');
let fs = require('fs');
let url = require('url');
http.createServer((req, res)=>{
    if(req.method == 'GET'){
        if(url.parse(req.url).pathname === '/start'){
            res.writeHead(200,{'Content-Type' : 'text/html; charset=utf-8'});
            res.end(fs.readFileSync('./index.html'));
        }
        else if (url.parse(req.url).pathname === '/chat'){
            res.writeHead(200,{'Content-Type' : 'text/html; charset=utf-8'});
            res.end(fs.readFileSync('./chat.html'));
        }
    }
    else console.log('use GET method');
}).listen(3000,()=>{console.log('server listen on port 3000')})

let k = 0;
let n = 0;
const WebSocket = require('ws');
const socket = new WebSocket.Server({port:4000,host:'localhost',path:'/'});
const broadcastSocket = new WebSocket.Server({port:5000,host:'localhost',path:'/'});

broadcastSocket.on('connection',ws=>{
    ws.on('message', message=>{
        broadcastSocket.clients.forEach((client)=>{
                if(client.readyState===WebSocket.OPEN){
                    client.send(message);
                }
        });
    });
});

socket.on('connection',ws=>{
    ws.on('message', message=>{
        console.log(message);
        n = JSON.parse(message)._10_01_client;
    })
    setInterval(() => {
        ws.send(`10-01-server: ${n} -> ${++k}`);
    }, 5000);
});