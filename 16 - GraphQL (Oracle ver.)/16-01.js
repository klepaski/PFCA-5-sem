const fs=require("fs");
const http=require('http')
const {graphql, buildSchema} = require('graphql');
const {DB,resolver} = require('./16-01db.js');
const schema = buildSchema(fs.readFileSync('./16-01.gql').toString());
const oracledb = require('mssql');//('oracledb');
const dbConfig = require('./dbconfig.js');
async function init() {
    try {
      await oracledb.createPool({
        user: dbConfig.user,
        password: dbConfig.password,
        connectString: dbConfig.connectString
      });
      console.log('Connection pool started');
    } catch (err) {
      console.error('init() error: ' + err.message);
    } 
  }
  async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
      await oracledb.getPool().close(10);
      console.log('Pool closed');
      process.exit(0);
    } catch(err) {
      console.error(err.message);
      process.exit(1);
    }
  }
  process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT',  closePoolAndExit);    
let http_handler=(req,res)=>
{
    let body='';
    req.on('data',chunk=>{body+=chunk.toString();});
    req.on('end',()=>{
        let result2=JSON.parse(body);
        console.log(result2.query);
        console.log(result2.variables);
        if(result2.query)
        {
        graphql(schema,result2.query,resolver,DB,result2.variables)
        .catch((err)=>{console.log(err)})
        .then((response)=>
        {
            console.log(response);
            console.log(response.data);
            let result=response.data;
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.end(JSON.stringify(result));
        })
      }
      if(result2.mutation)
      {
        graphql(schema,result2.mutation,resolver,DB,result2.variables)
        .catch((err)=>{console.log(err)})
        .then((response)=>
        {
            console.log(response);
            console.log(response.data);
            let result=response.data;
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.end(JSON.stringify(result));
        })
      }
    });
}
init();

var server=http.createServer(function (req, res){
    http_handler(req,res);
}).listen(3000);