const http = require('http');
const routes = require('./routes');

/* 
If a request arrives, execute the function passed
to the createServer method.
*/
const server = http.createServer(routes.handler);
console.log(routes.message);

routes.message = 'gluglu eiaieir';
console.log(routes.message);

server.listen(3000);
