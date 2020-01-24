const rpcWCSS = require('rpc-websockets').Client;
let ws = new rpcWCSS('ws://localhost:4000');
ws.on('open',()=>
{
    ws.call('square',[3]).then((r)=>{console.log('square param 3 =',r);}).catch(e=>{console.log(e);});
    ws.call('square',[5,4]).then((r)=>{console.log('square params 5,4 =',r);}).catch(e=>{console.log(e);});
    ws.call('sum',[2]).then((r)=>{console.log('sum 2 =',r);}).catch(e=>{console.log(e);});
    ws.call('sum',[2,4,6,8,10]).then((r)=>{console.log('sum 2,4,6,8,10 =',r);}).catch(e=>{console.log(e);});
    ws.call('mul',[3]).then((r)=>{console.log('mul 3 =',r);}).catch(e=>{console.log(e);});
    ws.call('mul',[3,5,7,9,11,13]).then((r)=>{console.log('mul 3,5,7,9,11,13 =',r);}).catch(e=>{console.log(e);});
    ws.login({login:'sys',password:'777'}).then(login=>
        {
            if(login)
            {
                ws.call('fib',[1]).then((r)=>{console.log('fib 1 =',r);}).catch(e=>{console.log(e);});
                ws.call('fib',[2]).then((r)=>{console.log('fib 2 =',r);}).catch(e=>{console.log(e);});
                ws.call('fib',[7]).then((r)=>{console.log('fib 7 =',r);}).catch(e=>{console.log(e);});
                ws.call('fact',[0]).then((r)=>{console.log('fact 0 =',r);}).catch(e=>{console.log(e);});
                ws.call('fact',[5]).then((r)=>{console.log('fact 5 =',r);}).catch(e=>{console.log(e);});
                ws.call('fact',[10]).then((r)=>{console.log('fact 10 =',r);}).catch(e=>{console.log(e);});
            }
            else console.log("Error login");
        });

});
ws.on('error',(e)=>{console.log('ws client error',e);});