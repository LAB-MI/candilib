const Express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const port = 7777;
const app = new Express();

app.use((req, res, next) => {
  if (/^((?!\/candilib\/api).)*$/.test(req.url)) { // Not API
    if (!/\.(js|html|css|png|jpg|svg|gif|map)$/.test(req.url)) { // Nor a file
      req.url = '/candilib/index.html'; // Redirect to index.html
    }
  }
  next();
});

app.use('/candilib', Express.static(path.resolve(__dirname, '../client/build/')));

app.use(proxy('/candilib/api', {
  target: 'http://localhost:8000',
  pathRewrite: {
    '^/candilib': '',
  },
}));

app.listen(port, (error) => {
  if (!error) {
    console.log(
      `Fake-server is running on port: ${process.env.PORT || port}`,
    );
  }
});
