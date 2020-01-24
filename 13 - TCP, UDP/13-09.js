//UDP-сервер
//приним строк сообщ + возвр ECHO .

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('message', (message, rinfo)=> {

    console.log('server got: ' + message + ' from client ' + rinfo.address + ':' + rinfo.port);    
    var answer = "ECHO. " + message;
    server.send(answer, 0, answer.length, rinfo.port, '127.0.0.1', () =>{});
});


server.bind(3000, '127.0.0.1', ()=> {
    console.log('server is listening on 127.0.0.1:3000');
});


server.on('error', function (error) {
    console.log('server error:' + error.stack);
    server.close();
});