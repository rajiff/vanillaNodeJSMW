const log = require('./logger');
const router = require('./router');

const addEmployee = require('./modules/addEmp');

router.get('/hello', (req, res) => {
  res.writeHead(200);
  res.end(`${new Date()} GET Hello world`);
})

router.get('/foo', (req, res) => {
  res.writeHead(200);
  res.end(`${new Date()} GET I am FOO`);
})

router.post('/hello', (req, res) => {
  res.writeHead(200);
  res.end(`${new Date()} POST Hello world`);
})

router.patch('/hello', (req, res) => {
  res.writeHead(200);
  res.end(`${new Date()} PATCH Hello world`);
})

router.post('/employees', addEmployee);

module.exports = function(req, res) {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // at this point, `body` has the entire request body stored in it as a string

    const contentType = req.headers['content-type'];
    if (contentType == 'application/json') {
      body = JSON.parse(body);
    }

    req['body'] = body;

    // Handle the request
    router.execute(req, res);
  });
}