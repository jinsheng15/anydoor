const http=require('http');
const chalk=require('chalk');
const path=require('path');
const conf=require('./config/defaultConfig');
const server=http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    const filePath=path.join(conf.root.toString('utf8'),req.url);
    console.log('cwd',conf.root);
    console.log('req.url',req.url);
    res.end(filePath);

});
server.listen(conf.port,conf.hostname,()=>{
    const addr=`http//${conf.hostname}:${conf.port}`;
    console.info(`Server started at ${addr}`);
})