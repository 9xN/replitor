const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');
// const dotenv = require('dotenv');
// dotenv.config();

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);
  const pathname = reqUrl.pathname === '/' ? '/index.html' : reqUrl.pathname;
  const filePath = path.join(__dirname, 'public', pathname);

  if (req.method === 'GET') {
    if (pathname === '/favicon.ico') {
      res.writeHead(204);
      res.end();
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
        return;
      }

      res.writeHead(200, {
        'Content-Type': getContentType(filePath),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
      res.end(data);
    });
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const postData = querystring.parse(body);
      console.log(postData);
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
      res.end(`You sent: ${postData}`);
    });
  } else {
    res.writeHead(405);
    res.end('Method not allowed');
  }
});

function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.js':
      return 'text/javascript';
    case '.css':
      return 'text/css';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
      return 'image/jpg';
    case '.wav':
      return 'audio/wav';
    default:
      return 'text/html';
  }
}

server.listen(80, () => {
  console.log('\x1b[33m[Node.js]\x1b[0m \x1b[36mServer listening at PORT 80.\x1b[0m');
});
