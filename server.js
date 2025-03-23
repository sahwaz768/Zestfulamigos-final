// server.js
const fs = require('fs');
const https = require('https');
const next = require('next');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = https.createServer(
    {
      key: fs.readFileSync('./certificates/localhost-key.pem'),
      cert: fs.readFileSync('./certificates/localhost.pem'),
    },
    (req, res) => {
      handle(req, res);
    }
  );

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Server running at https://localhost:3000');
  });
});
