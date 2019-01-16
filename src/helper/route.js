const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig');

const Handlebars = require('handlebars');
const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());
module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            //createReadStream pipe to res
            fs.createReadStream(filePath).pipe(res);
            //或者 虽然也是异步的。 它需要一点一点读给客户端，再存放到res中 非常慢
            // fs.readFile(filePath,(err,data)=>{
            //     res.end(data);
            // })

            //如果是个文件夹
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir=path.relative(config.root,filePath);
            const data = {
                title: path.basename(filePath),
                dir:dir?`/${dir}`:' ',
                files
            };

            res.end(template(data));

        }
    } catch (ex) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        console.log(ex);
        res.end(`${filePath} is not a directory or file`);
    }
};