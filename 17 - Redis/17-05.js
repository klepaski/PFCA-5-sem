//демонстр механизм publish/subscribe

const redis=require('redis');
const sub_client=redis.createClient('//redis-12895.c90.us-east-1-3.ec2.cloud.redislabs.com:12895',
{password:'bAXlDNyISZyPBuBwUZKqd4cLManGJo7d'});
sub_client.on('subscribe',(channel,count)=>{console.log('subscribe:','channel = ',channel,'count = ',count)});
sub_client.on('message',(channel,message)=>{console.log('sub channel: '+channel+':'+message)});
sub_client.subscribe('channel-01');
setTimeout(()=>{
sub_client.unsubscribe();
sub_client.quit();
},50000);
const pub_client=redis.createClient('//redis-18441.c135.eu-central-1-1.ec2.cloud.redislabs.com:18441',
                                {password:'DTKrzYCYxnP7QZRDAo3u9qsRFCkX0ReM'});
pub_client.publish('channel-01','from pub-client message 1');
pub_client.publish('channel-01','from pub-client message 2');
setTimeout(()=>pub_client.publish('channel-01','from pub-client message 3'),10000);
setTimeout(()=>pub_client.publish('channel-01','from pub-client message 4'),20000);
setTimeout(()=>pub_client.publish('channel-01','from pub-client message 5'),30000);
setTimeout(()=>pub_client.publish('channel-01','from pub-client message 6'),40000);
setTimeout(()=>pub_client.quit(),50000);