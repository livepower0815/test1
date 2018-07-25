var http =  require('http');
http.createServer(function(require,response){
    response.writeHead(200,{"content-Type":"text-html"});
    response.write("<h1>hello</h1>");
    response.end();
}).listen(8080);