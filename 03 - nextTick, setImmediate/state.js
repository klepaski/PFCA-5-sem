const http = require('http');

http.createServer(function (request, response) {
    response.contentType='text/html';
    response.write('<h1>norm</h1>');

    process.stdin.setEncoding('utf-8');
    process.stdin.on('readable', ()=>{

        let chunc = 'norm';
        while((chunc = process.stdin.read()) != null ) {
            if (chunc.trim() == 'exit')
                process.exit(0);
            else if (chunc.trim() == 'norm') {
                process.stdout.write('State changed ->norm \n');
                response.write('<h1>norm</h1>');
            }
            else if (chunc.trim() == 'stop') {
                process.stdout.write('State changed -> stop \n');
                response.write('<h1>stop</h1>');
            }
            else if (chunc.trim() == 'test') {
                process.stdout.write('State changed -> test \n');
                response.write('<h1>test</h1>');
            }
            else if (chunc.trim() == 'idle') {
                process.stdout.write('State changed to – idle \n');
                response.write('<h1>idle</h1>');
            }
            else process.stdout.write(chunc)
        }
    });
}).listen(5000);