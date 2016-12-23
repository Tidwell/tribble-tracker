var StaticServer = require('static-server');
var server = new StaticServer({
  rootPath: './public',
  name: 'tribbles-http-server',
  port: 7431,
  cors: '*',
  followSymlink: true,
  templates: {
    notFound: 'public/404.html'
  }
});

server.start(function () {
  console.log('Server listening to', server.port);
});