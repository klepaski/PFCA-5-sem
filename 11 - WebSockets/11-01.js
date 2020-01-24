let http=require('http');
let fs=require('fs');
const WebSocket=require('ws');

//клиент отпр файл MyFile.txt
//сервер запис в /upload
const wsserver=new WebSocket.Server({ port:4000, host:'localhost', path:'/wsserver'});
let k=0;

wsserver.on('connection', (ws)=>{
    const duplex=WebSocket.createWebSocketStream(ws,{encoding:'utf-8'});
    let wfile=fs.createWriteStream(`./upload/file${++k}.txt`);
    duplex.pipe(wfile);
});



const ws=new WebSocket('ws://localhost:4000/wsserver');
ws.on('open',()=>
{
    const duplex=WebSocket.createWebSocketStream(ws,{encoding:'utf-8'});
    let rfile=fs.createReadStream(`./MyFile.txt`);
    rfile.pipe(duplex);
})