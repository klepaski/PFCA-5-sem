//TCP-сервер
//приним поток 32-чисел (1 за отпр)
//суммир + к.5сек ответ

const net=require('net');
let HOST='0.0.0.0';
let PORT = 40000;
let server =net.createServer();

server.on('connection',(sock)=>
{
    let sum=0;
    console.log('Server Connected: '+ sock.remoteAddress+':'+sock.remoteAddress);
    
    sock.on('data',(data)=>
    {
        console.log('Number: ',data.readInt32LE());
        sum+=data.readInt32LE();
    });
    
    let buf=Buffer.alloc(4);
    let x = setInterval(()=>
    {
        buf.writeInt32LE(sum);
        sock.write(buf);
    },5000);

    /*
    let x = setInterval(()=>
    { sock.write(sum);
    },5000);
    */

    sock.on('close',(data)=>
    {
        console.log("Server closed");
        clearInterval(x);
    });
});

server.listen(PORT,HOST);
console.log('Server is listening to '+PORT);