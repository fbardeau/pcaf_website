var express = require('express')
  , app = express();

app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(require('./controllers'));

app.listen((process.env.port || 3000), function() {
  console.log('Listening on port ' + (process.env.port || 3000));
})

module.exports = app;