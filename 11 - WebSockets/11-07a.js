const rpcWSC = WebSocket = require('rpc-websockets').Client;
let ws = new rpcWSC('ws://localhost:4000');
process.stdin.setEncoding('utf-8');

//Шлет уведомления серверу при вводе в поток
process.stdin.on('readable',()=>{
let chunk2=null;
while ((chunk2 = process.stdin.read()) !=null){
	if	(chunk2.trim() == 'A') {
        ws.notify('A', {message:"MessageA"});
    }
    if	(chunk2.trim() == 'B') {
        ws.notify('B', {message:"MessageB"});
    }
    if	(chunk2.trim() == 'C') {
        ws.notify('C', {message:"MessageC"});
    }
}
});