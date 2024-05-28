// filename : server.js
// Example using the http module
const http = require('http');

// Create an HTTP server
const server = http.createServer((req,res) => {
    // Set the response headers
    res.writeHead(200, {'Content-Type' : 'text/html'});

    // Write the response content
    res.write('<h1>Hello, node.js Http server!</h1>');
    res.end();
});

//specify the port to listen on
const port = 3000;

// start the server
server.listen(port, () => {
console.log('node.js Http server is running on port ${port}');

});