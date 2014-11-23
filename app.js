var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cookieParser = require('cookie-parser'),
  errorHandler = require('errorhandler'),
  i18n = require('i18n'),
  pages = require('./routes/pages'),
  forms = require('./routes/forms');
  donations = require('./routes/donations');
  langs = require('./routes/langs');


i18n.configure({
  locales:['en', 'ar', 'he'],
  directory: './locales',
  defaultLocale: 'en',
  cookie: 'lang'
});

app.use(cookieParser())
app.use(i18n.init);

mongoUri = process.env.MONGO_URI || 'mongodb://localhost/waaf';
mongoose.connect(mongoUri);


app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var env = process.env.NODE_ENV || 'development';

if (env == 'production') {
  app.use(errorHandler());
} else{
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}

app.use(forms);
app.use(pages);
app.use(donations);
app.use(langs);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
})

module.exports = app;