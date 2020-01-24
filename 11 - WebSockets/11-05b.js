const async= require('async');
const rpcWCSS = require('rpc-websockets').Client;
let ws = new rpcWCSS('ws://localhost:4000');

//Асинхр вызов

let h=(x=ws)=>async.parallel({
    square1: (cb)=>{ws.call('square',[3]).then((r)=>{cb(null,r);}).catch(e=>{cb(e,null);});},
    square2: (cb)=>{ws.call('square',[5,4]).then((r)=>{cb(null,r);}).catch(e=>{cb(e,null);});},
    sum1: (cb)=> { ws.call('sum',[2]).then((r)=>{cb(null,r);}).catch(e=>{cb(e,null);});},
    sum2: (cb)=>{ ws.call('sum',[2,4,6,8,10]).then((r)=>{cb(null,r);}).catch(e=>{cb(e,null);});},
    mul1: (cb)=>{ws.call('mul',[3]).then((r)=>{cb(null,r);}).catch(e=>{cb(e,null);});},
    mul2: (cb)=>{ws.call('mul',[3,5,7,9,11,13]).then((r)=>{cb(null,r);}).catch(e=>{ccb(e,null);});},
    
    fib1: (cb)=>{
        ws.login({login:'sys',password:'777'}).then(login=>
            {
                if(login)
                {
                    ws.call('fib',[1]).then((r)=>{cb(null,r);}).catch(e=>{cb(e,null);});
                }
                else console.log("Error login");
            });    
    },
    fib2: (cb)=>{
        ws.login({login:'sys',password:'777'}).then(login=>
            {
                if(login)
                {
                    ws.call('fib',[2]).then((r)=>{cb(null,r);}).catch(e=>{cb(e,null);});
                }
                else console.log("Error login");
            });    
    },
    fib3: (cb)=>{
        ws.login({login:'sys',password:'777'}).then(login=>
            {
                if(login)
                {
                    ws.call('fib',[7]).then((r)=>{cb(null,r);}).catch(e=>{cb(e,null);});
                }
                else console.log("Error login");
            });    
    },
    fact: (cb)=>{
        ws.login({login:'sys',password:'777'}).then(login=>
            {
                if(login)
                {  
                    ws.call('fact',[0]).then((r)=>{cb(null,r);}).catch(e=>{cb(e,null);});
                }
                else console.log("Error login");
            });
    },
    fact2: (cb)=>{
        ws.login({login:'sys',password:'777'}).then(login=>
            {
                if(login)
                {  
                    ws.call('fact',[5]).then((r)=>{cb(null,r);}).catch(e=>{cb(e,null);});
                }
                else console.log("Error login");
            });
    },
    fact3: (cb)=>{
        ws.login({login:'sys',password:'777'}).then(login=>
            {
                if(login)
                {  
                    ws.call('fact',[10]).then((r)=>{cb(null,r);}).catch(e=>{cb(e,null);});
                }
                else console.log("Error login");
            });
    }
},(e,r)=>
{
    if(e) console.log('e =',e);
    else console.log('r =',r);
    ws.close();
})
ws.on('open',h);