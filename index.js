const path = require('path');
const fs = require('fs');
const http = require('http');

const server  = http.createServer((req, res) =>{
    const filePath = path.join(__dirname,'public',req.url === "/" ? "index.html":req.url)
    let contentType = getContentType(filePath) || 'text.html';
    let emptyPage = path.join(__dirname,'public',"404.html")
    fs.readFile(filePath,'utf-8',(err,data) =>{
        if(err){
            if(err.code === "ENOENT"){
                fs.readFile(emptyPage, 'utf-8',(err, data) =>{
                    res.writeHead(200,{'content-Type':contentType});
                    res.end(data);
                })
            }else{
                res.writeHead(500)
                res.end("A server error has occured.");
            }
        }else{
            res.writeHead(200,{ "content-Type": contentType});
            res.end(data);
        }
    })
})

function getContentType(filePath){
    let extname = path.extname(filePath);
    if(extname === '.js'){
        return 'text/javascript';
    }
    if(extname === '.css') return 'text/css';
    if(extname === 'png') return "image.png";
}
const port  = 5500;

server.listen(port, () =>{
    console.log(`server is running at port ${port}`)
})