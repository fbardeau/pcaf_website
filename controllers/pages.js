var express = require('express')
  , router = express.Router()

router.get('/', function(req, res) {
  res.render('pages/home'); 
})

module.exports = router;