const http = require('http');
const fs = require('fs');

/* 
If a request arrives, execute the function passed
to the createServer method.
*/
const server = http.createServer((inReq, inRes) => {
  const url = inReq.url;
  const method = inReq.method;

  if (url === '/') {
    inRes.write('<html>');
    inRes.write('<header><title>Hello from the outside!</title></header>');
    inRes.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>'
    );
    inRes.write('</html>');
    return inRes.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    inReq.on('data', (inChunk) => {
      /* runs everytime a new chunk of data arrives */
      console.log(inChunk);
      body.push(inChunk);
    });
    inReq.on('end', () => {
      /* runs when all the data has been gathered */
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];

      fs.writeFileSync('message.txt', message);
    });

    inRes.statusCode = 302;
    inRes.setHeader('Location', '/');
    return inRes.end();
  }
  inRes.setHeader('Content-Type', 'text/html');
  inRes.write('<html>');
  inRes.write('<header><title>Hello from the outside!</title></header>');
  inRes.write('<body><h1>Hello, Mom!!</h1></body>');
  inRes.write('</html>');
  inRes.end();
});

server.listen(3000);
