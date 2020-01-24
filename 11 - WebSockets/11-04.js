let http=require('http');
let fs=require('fs');
const WebSocket=require('ws');
let s=0;

//клиент отпр client:x timestamp:t (json) x-имя из к.с.
//сервер отпр server:n client"x timestamp:t (json)
const wsserver=new WebSocket.Server({ port:4000, host:'localhost', path:'/wsserver'});

wsserver.on('connection', (ws)=>{
let k=0;
ws.on('message',message=>{
    console.log('on message: ',JSON.parse(message));
    k=JSON.parse(message).x;
    ws.send(JSON.stringify({server:++s,client: k,timestamp:new Date().toISOString()}));
    });
});



const ws=new WebSocket('ws://localhost:4000/wsserver');
let parm2=process.argv[2];
ws.on('open',()=>
{
    ws.on('message',data=>{
        console.log('on message:',JSON.parse(data));
    });
    setInterval(()=>{
        ws.send(JSON.stringify({client: parm2, timestamp: new Date().toISOString()}));
    },2000);
})