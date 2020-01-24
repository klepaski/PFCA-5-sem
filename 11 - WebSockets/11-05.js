const rpcWCSS = require('rpc-websockets').Server;
let server = new rpcWCSS({port: 4000, host: 'localhost'});
server.setAuth((l)=>{return l.login=='sys' && l.password=='777'});

//-------------------------------------------------------
//Сумма
server.register('sum', (params)=>{
    let sum=0;
    for(let i=0;i<params.length;i++)
    {
        sum+=params[i];
    }
    return sum;
    }).public();

//--------------------------------------------------------
//S круга (r)   /   S прям-ка  (a,b)
server.register('square', (params)=>
{
    if(params.length==1) return params[0]*params[0];
    else return params[0]*params[1];

    }).public();

//--------------------------------------------------------
// Произведение
server.register('mul', (params)=>{
    let mul=1;
    for(let i=0;i<params.length;i++)
    {
        mul*=params[i];
    }
     return mul;
    }).public();

//--------------------------------------------------------
// n элементов посл-сти Фибоначи
server.register('fib', (params)=>{
    let mass=[];
    mass[0]=0;
    if(params[0]==1) return mass;

    mass[1]=1;
    for(let i=2;i<params[0];i++)
    {
        mass[i]=mass[i-1]+mass[i-2];
    }
    return mass;
    }).protected();

//--------------------------------------------------------
// Факторил числа n
server.register('fact', (params)=>{
    let fact=1;
    if(params[0]==0) return 1;
    
    for(let i=1;i<=params[0];i++)
    {
       fact*=i;
    }
    return fact;
    }).protected();
        