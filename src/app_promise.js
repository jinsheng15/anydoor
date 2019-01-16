const http=require('http');
const chalk=require('chalk');
const path=require('path');
const fs=require('fs');
const conf=require('./config/defaultConfig');

const route=require('./helper/route');
const server=http.createServer((req,res)=>{
    const filePath=path.join(conf.root,req.url);

   route(req,res,filePath);

});
server.listen(9529,conf.hostname,()=>{
    const addr=`http//${conf.hostname}:9529`;
    console.info(`Server started at ${addr};`);
});