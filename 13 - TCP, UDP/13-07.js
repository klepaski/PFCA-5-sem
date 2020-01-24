//TCP-сервер
//прослуш порты 40000 и 50000
//приним потоки 32-чисел
//возвр ECHO .

const net=require('net');
let HOST='0.0.0.0';
let PORT1 = 40000;
let PORT2 = 50000;
let h=(n)=>{return (sock)=>
{
    console.log('Server Connected: '+ sock.remoteAddress+':'+sock.remoteAddress);
    sock.on('data',(data)=>
    {
        console.log('Number: ',data.toString());
        sock.write('ECHO:'+ data);
    });
    sock.on('close',(data)=>
    {
        console.log("Server closed");
    });
  };
};
net.createServer(h(PORT1)).listen(PORT1,HOST).on('listening',()=>
{
    console.log('TCP-server ',HOST+':'+PORT1);
});
net.createServer(h(PORT2)).listen(PORT2,HOST).on('listening',()=>
{
    console.log('TCP-server ',HOST+':'+PORT2);
});