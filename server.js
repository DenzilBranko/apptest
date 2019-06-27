var app = require('./app');
var port = process.env.PORT || 5000;

var server = app.listen(port,() => {
  console.log(`server is listening on port:${port}`)
})

module.exports = server