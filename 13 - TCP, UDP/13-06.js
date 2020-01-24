//приним числ. парам X
//отпр 1/сек Х
const net=require('net');
let HOST='127.0.0.1';
let PORT = 40000;
let client=new net.Socket();
let buf=new Buffer.alloc(4);
let timerID=null;
let i = 0;

client.connect(PORT,HOST,()=>
{
    console.log('Client connected:',client.remoteAddress+' '+client.remotePort);
    
    timerID= setInterval(()=>
    { 
        i=i+1;
        client.write((buf.writeInt32LE(process.argv[i]),buf));
    },1000);

    setTimeout(()=>
    {
        clearInterval(timerID);
        client.end();
    },20000);
})
client.on('data',(data)=>
{
    console.log('Client DATA: ', data.readInt32LE());
});