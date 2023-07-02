const fs = require('fs');

const hadleRequests = (inReq, inRes) => {
  const url = inReq.url;
  const method = inReq.method;

  if (url === '/') {
    fs.readFile('./index.html', (inErr, inData) => {
      if (inErr) {
        inRes.writeHead(500, { 'Content-Type': 'text/plain' });
        inRes.end('Internal Server Error');
      } else {
        inRes.writeHead(200, { 'Content-Type': 'text/html' });
        inRes.end(inData);
      }
    });
  } else if (url === '/users') {
    fs.readFile('./users.html', (inErr, inData) => {
      if (inErr) {
        inRes.writeHead(500, { 'Content-Type': 'text/plain' });
        inRes.end('Internal Server Error');
      } else {
        inRes.writeHead(200, { 'Content-Type': 'text/html' });
        inRes.end(inData);
      }
    });
  } else if (url === '/create-user' && method === 'POST') {
    const body = [];

    inReq.on('data', (inChunk) => {
      /* runs everytime a new chunk of data arrives */
      body.push(inChunk);
    });

    inReq.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);

      inRes.statusCode = 302;
      inRes.setHeader('Location', '/');
      inRes.end();
    });
  } else {
    inRes.writeHead(404, { 'Content-Type': 'text/plain' });
    inRes.end('Not Found');
  }
};

module.exports = {
  handler: hadleRequests,
};
