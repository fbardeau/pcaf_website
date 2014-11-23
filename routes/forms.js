var express = require('express'),
    router = express.Router(),
    Form = require('../models/form');

router.get('/forms/new', function(req, res) {
  res.render('forms/new');
});

router.post('/forms', function(req, res) {
  var errors_messages = []

  subscribe = req.body.subscribe == 'true' ? true : false

  params = {first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, country: req.body.country, subscribe: subscribe}

  if(params['first_name'].length < 2){
    errors_messages.push("Your first name is too short")
  }

  if(params['last_name'].length < 2){
    errors_messages.push("Your last name is too short")
  }

  if(!validateEmail(params['email'])){
    errors_messages.push("Your email is invalid")
  }

  if(params['email'].length < 2){
    errors_messages.push("Please select a country")
  }

  var form = new Form(params);

  form.save(function (err) {
    if (err && err['code'] == 11000){
      errors_messages.push("Your email is already use")
    }

    if(errors_messages.length){
      res.status(400).render('forms/new',  {errors_messages: errors_messages}); 
    }else{
      res.cookie('email', params['email']);
      res.status(201).render('forms/create'); 
    }
  });

})

function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

module.exports = router;
