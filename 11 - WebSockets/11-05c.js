const rpcWCSS = require('rpc-websockets').Client;
let ws = new rpcWCSS('ws://localhost:4000');
let k1=0,k2=0,k3=0,k4=0,k5=0;

// Сложное выражение
ws.on('open',()=>
{
    ws.call('square',[3]).then((r)=>{console.log(r);k1=r}).catch(e=>{console.log(e);});
    ws.call('square',[5,4]).then((r)=>{console.log(r); k2=r;}).catch(e=>{console.log(e);});
    ws.call('mul',[3,5,7,9,11,13]).then((r)=>{console.log(r); k3=r;}).catch(e=>{console.log(e);});
    
    ws.login({login:'sys',password:'777'}).then(login=>
        {
            if(login)
            {
                ws.call('fib',[7]).then((r)=>{console.log(r);k4=r;}).catch(e=>{console.log(e);});
            }
            else console.log("Error login");
        });
        ws.call('mul',[2,4,6]).then((r)=>{console.log(r);k5=r;}).catch(e=>{console.log(e);});    
});
ws.on('error',(e)=>{console.log('ws client error',e);});

setTimeout(()=>
{
    ws.call('sum',[k1,k2,k3]).then((r)=>{console.log(r);k3=r;}).catch(e=>{console.log(e);});
},2000);

setTimeout(()=>
{
    k2=k3+k5*k4[6];
    console.log("result=",k2);
},3000)