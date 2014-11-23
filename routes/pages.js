var express = require('express')
  router = express.Router(),
  Form = require('../models/form');

router.get('/', function(req, res) {
  Form.count({},function(err, count) {
    res.render('pages/home', {form_count: count});
  });
})

module.exports = router;
