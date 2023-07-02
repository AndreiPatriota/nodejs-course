const fs = require('fs');

const requestHandler = (inReq, inRes) => {
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
    return inReq.on('end', () => {
      /* runs when all the data has been gathered */
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];

      fs.writeFile('message.txt', message, (err) => {
        inRes.statusCode = 302;
        inRes.setHeader('Location', '/');
        return inRes.end();
      });
    });
  }
  inRes.setHeader('Content-Type', 'text/html');
  inRes.write('<html>');
  inRes.write('<header><title>Hello from the outside!</title></header>');
  inRes.write('<body><h1>Hello, Mom!!</h1></body>');
  inRes.write('</html>');
  inRes.end();
};

/* module.exports = {
    handler: requestHandler,
    message: 'eu gosto de mamar nos peitos da cabritinha'
}
 */

exports.handler = requestHandler;
exports.message = 'eu gosto de mamar nos peitos da cabritinha';
