let http=require('http');
let fs=require('fs');
const WebSocket=require('ws');
let n=0;
let count=0;


//ws-сервер всем клиентам каждые 15 сек - 'server n'
//ping/pong: к. 5 сек сервер провер соед + кол-во в консоль
const wsserver=new WebSocket.Server({ port:4000, host:'localhost', path:'/wsserver'});

function heartbeat() { this.isAlive = true;}

wsserver.on('connection', (ws)=>{
  ws.isAlive = true;
    ws.on('pong', heartbeat);
});


const interval = setInterval(function ping() {
    count=0;
    wsserver.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();
        else count++;
        ws.isAlive = false;
        ws.ping('123');
      });
      console.log('Connections:',count);
  }, 500);


const interval2 = setInterval(function send() {
    wsserver.clients.forEach(function each(ws) {
        ws.send(`11-03 server: ${++n}`);
    });
  }, 1500);



const ws=new WebSocket('ws://localhost:4000/wsserver');
ws.on('open',()=>
{
    ws.on('message',message=>{
        console.log(`Received message=>${message}`);
    });
});