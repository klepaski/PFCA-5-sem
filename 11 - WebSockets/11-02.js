let http=require('http');
let fs=require('fs');
const WebSocket=require('ws');

//ws-сервер отпр файл из /download по каналу
const wsserver=new WebSocket.Server({ port:4000, host:'localhost', path:'/wsserver'});
let k=0;

wsserver.on('connection', (ws)=>{
    const duplex=WebSocket.createWebSocketStream(ws,{encoding:'utf-8'});
    let rfile=fs.createReadStream(`./download/file.txt`);
    rfile.pipe(duplex);
});


const ws=new WebSocket('ws://localhost:4000/wsserver');
ws.on('open',()=>
{
    const duplex=WebSocket.createWebSocketStream(ws,{encoding:'utf-8'});
    let wfile=fs.createWriteStream(`./File${++k}.txt`);
    duplex.pipe(wfile);
})


