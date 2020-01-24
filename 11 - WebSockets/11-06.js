const rpcWSS = require('rpc-websockets').Server;

// Генер 3 события: A, B, C (ввод через поток)
let server = new rpcWSS({port:4000, host:"localhost"});
server.event('A');
server.event('B');
server.event('C');
process.stdin.setEncoding('utf-8');
process.stdin.on('readable',()=>{
let chunk2=null;
while ((chunk2 = process.stdin.read()) !=null){
	if	(chunk2.trim() == 'A') {
        server.emit('A');
    }
    if	(chunk2.trim() == 'B') {
        server.emit('B');
    }
    if	(chunk2.trim() == 'C') {
        server.emit('C');
    }
}
});