const http=require('http');
const chalk=require('chalk');
const path=require('path');
const fs=require('fs');
const conf=require('./config/defaultConfig');
const server=http.createServer((req,res)=>{
    //判断是否是个文件夹还是文件
    const filePath=path.join(conf.root.toString('utf8'),req.url);
    fs.stat(filePath,(err,stats)=>{
        if(err){
            res.statusCode=404;
            res.setHeader('Content-Type','text/plain');
            res.end('${filePath} is not a directory or file');
            return
        }
        if(stats.isFile()){
            res.statusCode=200;
            res.setHeader('Content-Type','text/plain');
            //读取文件 一点点流到res
            fs.createReadStream(filePath).pipe(res);
            //或者 虽然也是异步的。 它需要一点一点读给客户端，再存放到res中 非常慢
            // fs.readFile(filePath,(err,data)=>{
            //     res.end(data);
            // })

            //如果是个文件夹
        }else if(stats.isDirectory()){
            fs.readdir(filePath,(err,files)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','text/plain');
                console.log('This is a directory');
                res.end(files.join(','));
            });

        }
    });


});
server.listen(9528,conf.hostname,()=>{
    const addr=`http//${conf.hostname}:9528`;
    console.info(`Server started at ${addr};`);
});