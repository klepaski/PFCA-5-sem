var http = require('http');

let h = (r)=>{
    let rc = '';
    for (key in r.headers) rc += '<h3>'+key+':' +r.headers[key]+'</h3>';
    return rc;
}

http.createServer(function (request, responce) {
    let b='';
    request.on('data',//соб, кот прослушиваем
     str=>{b+=str; console.log('data', b);})
    
    responce.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    request.on('end', ()=> responce.end(
        '<!DOCTYPE html> <html><head></head>'+
        '<body>' +
        '<h1>Структура запроса</h1>' +
        '<h2>' + 'метод:    '   +   request.method  +'</h2>'+
        '<h2>' + 'url:      '   +   request.url  +'</h2>'+
        '<h2>' + 'версия:   '   +   request.httpVersion  +'</h2>'+
        '<h2>' + 'ЗАГОЛОВКИ:'   + '</h2>'+
        h(request)+
        '<h2>' + 'тело:    '   +   b  +'</h2>'+
        '</body>'+
        '</html>'
    )
    )
}).listen(3000);

console.log('Server running at http://localhost:3000/');