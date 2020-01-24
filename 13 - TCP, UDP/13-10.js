var dgram = require('dgram');
var client = dgram.createSocket('udp4');


client.on('close', function () {
    process.exit(0);
});


process.stdin.on('data', function (data) {

    client.send(data, 0, data.length, 3000, '127.0.0.1', () =>
    {
        console.log('successful');
    });
});


client.on('message', (message)=> {
    console.log('client got: ' + message);
    client.close();
});