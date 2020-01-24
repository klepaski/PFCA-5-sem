var http = require('http');
var url = require('url');
var fs = require('fs');
let stat=require('./m07-01')('./static');
let parseString= require('xml2js').parseString;
let xmlbuilder= require('xmlbuilder');
const {parse} = require('querystring');
let mp=require('multiparty');

let writeHTTP405=(res)=>{
	res.statusCode = 405;
	res.statusMessage = 'Use another method';
	res.end('Use another method');
}
let sendingfile=(req,res)=>{
	if(req.method=='GET'){
		if(stat.isStatic('html', req.url)) stat.sendFile(req,res, {'Content-Type': 'text/html; charset=utf-8'});
		else if(stat.isStatic('css', req.url)) stat.sendFile(req,res, {'Content-Type': 'text/css; charset=utf-8'});
		else if(stat.isStatic('js', req.url)) stat.sendFile(req,res, {'Content-Type': 'text/javascript; charset=utf-8'});
		else if(stat.isStatic('txt', req.url)) stat.sendFile(req,res, {'Content-Type': 'text/plain; charset=utf-8'});
		else if(stat.isStatic('png', req.url)) stat.sendFile(req,res, {'Content-Type': 'image/png; charset=utf-8'});
		else if(stat.isStatic('docx', req.url)) stat.sendFile(req,res, {'Content-Type': 'application/msword; charset=utf-8'});
		else if(stat.isStatic('json', req.url)) stat.sendFile(req,res, {'Content-Type': 'application/json; charset=utf-8'});
		else if(stat.isStatic('xml', req.url)) stat.sendFile(req,res, {'Content-Type': 'application/xml; charset=utf-8'});
		else if(stat.isStatic('mp4', req.url)) stat.sendFile(req,res, {'Content-Type': 'video/mp4; charset=utf-8'});
		else stat.writeHTTP404(res);
		}
		else writeHTTP405(res);
}
let http_handler=(req,res)=>
{
	if(req.method=='GET'){

		//connection	--	текущий
		//connection?set=set
		if(url.parse(req.url).pathname === '/connection'){
			let q= url.parse(req.url,true).query;
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			if(q['set']!=null)
			{
				console.log(q['set']);
				server.keepAliveTimeout= +q['set'];
				res.end(server.keepAliveTimeout.toString());
			}
			else res.end(server.keepAliveTimeout.toString());
		}



		//headers
		//вывод все заголовки запроса и ответа
		else if(url.parse(req.url).pathname === '/headers'){
			res.setHeader('X-author','Julia Chistyakova');
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			let result='';
			for(key in req.headers)
			{
				result+=`${key}:${req.headers[key]}`+'\n';
			}
			res.end(result);
		}



		//parameter?x=x && y=y
		else if(url.parse(req.url).pathname === '/parameter'){
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			let q= url.parse(req.url,true).query;
			if(!isNaN(+q['x']) && !isNaN(+q['y']))
			{
			let x=+q['x'];
			let y=+q['y'];
			let result='';
			result+='x+y='+(x+y)+'\n';
			result+='x-y='+(x-y)+'\n';
			result+='x*y='+(x*y)+'\n';
			result+='x/y='+(x/y)+'\n';
			res.end(result);
			}
			else res.end("Error:Enter Numbers");
		}



		//parameter/x/y
		else if(url.parse(req.url).pathname.search('\/parameter\/[a-zA-Z1-9]+\/[a-zA-Z1-9]+$')!=(-1))
		{
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			let p = url.parse(req.url,true);
			let r =decodeURI(p.pathname).split('/');
			let x=+r[2];
			let y=+r[3];
			if(!isNaN(x) && !isNaN(y))
			{
			let result='';
			result+='x+y='+(x+y)+'\n';
			result+='x-y='+(x-y)+'\n';
			result+='x*y='+(x*y)+'\n';
			result+='x/y='+(x/y)+'\n';
			res.end(result);
			}
			else res.end(p.pathname);
		}



		//close
		else if(url.parse(req.url).pathname=== '/close')
		{
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			setTimeout(()=>{server.close()},10000);
			res.end("Server close after 10 seconds");
		}



		//socket
		else if(url.parse(req.url).pathname=== '/socket')
		{
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			res.write('Port Client:'+res.socket.remotePort+'<br\/>');
			res.write('IP Client:'+res.socket.remoteAddress+'<br\/>');
			res.write('Port Server:'+req.socket.remotePort+'<br\/>');
			res.end('Address Server'+req.socket.remoteAddress+'<br\/>');
		}



		//req-data
		else if(url.parse(req.url).pathname=== '/req-data')
		{
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			let buf='12345678';
			req.on('data',(data)=>{console.log('request.on(data) =',data.length); buf+=data;});
			req.on('end',()=>{console.log('request.on(end) =',buf.length);});
			res.write('<h2>Порционная обработка</h2><br/>');
			res.end(buf);
		}



		//resp-status?code=c&&mess=m
		//сформ ответ со статусом и сообщ
		else if(url.parse(req.url).pathname=== '/resp-status')
		{
			let q= url.parse(req.url,true).query;
			if(q['code'] != undefined && q['mess']!=undefined)
			{
				res.statusCode = +q['code'];
				res.statusMessage = q['mess'];
				res.end(q['code']+q['mess']);
			}
			else res.end('Enter parameters');
		}



		//files
		//кол-во в директории static
		else if(url.parse(req.url).pathname=== '/files')
		{
			let folder='./static';
			let n =fs.readdirSync(folder).length;
			res.setHeader('X-static-files-count',n);
			res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
			res.end('X-static-files-count:'+n);
		}


		//files/filename
		//пересылается файл из директория static
		else if(url.parse(req.url).pathname.search('\/files\/[a-zA-Z1-9]+.[a-zA-Z1-9]+$')!=(-1))
		{
			sendingfile(req,res);
		}


		//upload
		else if(url.parse(req.url).pathname=== '/upload')
		{
			let html= fs.readFileSync('08-03.html');
			res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
			res.end(html);
		}
		else res.end('Nothing on this pages');
	}



	else if(req.method=='POST'){

		//formparameter (x-www-form-urlencoded)
		if(url.parse(req.url).pathname=== '/formparameter')
		{
			let body='';
			let result='<br/>';
			req.on('data',chunk=>{body+=chunk.toString();});
			req.on('end',()=>{
				console.log(body);
				let o = parse(body);
				for(let key in o) {result+=`${key}=${o[key]}<br/>`}
				res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
				 res.end(result);}
				);
		}



		//json
		else if(url.parse(req.url).pathname=== '/json')
		{
			let result='';
			let body='';
			req.on('data',chunk=>{body+=chunk.toString();});
			req.on('end',()=>{
				console.log(body);
				let os = JSON.parse(body);
				result={
					__comment:"Ответ.Лабораторная работа 8/10",
					x_plus_y:os[0].x+os[0].y,
					Concatination_s_o:os[0].s+'.'+os[0].o.surname+","+os[0].o.name,
					Length_m:os[0].m.length
				};
				res.writeHead(200,{'Content-Type': 'application/json'});
				console.log(result);
				 res.end(JSON.stringify(result));}
				);
		}


		//xml
		else if(url.parse(req.url).pathname=== '/xml')
		{
			let sumx=0;
			let resultm='';
			let id='';
			let body='';
			req.on('data',chunk=>{body+=chunk.toString();});
			req.on('end',()=>{
				console.log(body);
				parseString(body,function(err,result)
				{
					id=result.request.$.id;
					console.log(id);
					result.request.x.map((e,i)=>{
						console.log(e.$.value);
						sumx+=(+e.$.value);
					});
					result.request.m.map((e,i)=>{
						resultm+=e.$.value;
					});
				});
				let result=xmlbuilder.create('response').att('id',id);
				result.ele('sum',{element:"x",result:sumx});
				result.ele('concat',{element:"m",result:resultm});
				res.writeHead(200,{'Content-Type': 'application/xml'});
				 res.end(result.toString());}
				);
			}


			else if(url.parse(req.url).pathname=== '/upload')
			{
				let result='';
				let form =new mp.Form({uploadDir:'./static'});
				form.on('field',(name,value)=>{
					console.log('------------field-------------');
					console.log(name,value);
					result+=`<br/>---${name}= ${value}`;
				});
				form.on('file', (name, file)=>{
					console.log('-----file ------------');
					console.log(name,file);
					result+=`<br/>---${name}= ${file.originalFilename}: ${file.path}`;
				});
				form.on('error',(err)=> {
					console.log('------err--------------');
					console.log('err =',err);
					res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
					res.write('<h1>Form/error</h1>');
					res.end()
				});
				form.on('close',()=>{
					console.log('-----------close----------');
					res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
					res.write('<h1>Form</h1>');
					res.end(result);
				})
				form.parse(req);
			}
			else res.end('Nothing on this pages');
	}
	else writeHTTP405(res);
}
var server=http.createServer(function (req, res){
			http_handler(req,res);
}).listen(5000);
//let server = http.createServer();
//server.listen(5000).on('request',http_handler);