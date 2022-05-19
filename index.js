const http = require ('http');
const { url } = require('inspector');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req , res) =>{

    let filename = path.join(process.cwd() , `web\\${req.url}`);
    let stat;
    
   try{ 
      stat = fs.lstatSync(filename)

   } catch(err){
       res.writeHead(404 , {'content-type' : 'text/html'});
       res.write('not found');
       return res.end();

   }
   let requrl1 = req.url;
   let ext =path.extname(requrl1);
   let jot =ext.slice(1,ext.length);
   

   if(stat.isFile()){
    fs.readFile(filename, (err , data) =>{
        
        res.writeHead(200 , {'content-type': `text/${jot}`})
        res.write(data)
        res.end();

    });
    return;
   } else if(stat.isDirectory()){
       console.log( + '/index.html')
       let requrl2 =req.url;
       if(requrl2.substr (-1) != '/' && requrl2.length >1)
       requrl2 += '/';
       
      
    res.writeHead(302 , { 'location' : requrl2 + 'index.html'})
    res.end();
   } 
    
     
      });

server.listen (5000 )
