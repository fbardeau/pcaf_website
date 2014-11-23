var express = require('express'),
    router = express.Router(),
    stripe = require('stripe')(process.env.WAAP_SECRET_KEY),
    Form = require('../models/form');

router.get('/donations/new', function(req, res) {
  res.render('donations/new');
});


router.post('/donations', function(req,res) {
    var errors_messages = []
    var stripeToken = req.body.stripeToken;
    //4242424242424242

    if (req.body.amount && parseInt(req.body.amount) >= 1){
      var amount = parseInt(req.body.amount) * 100;
    }

    if (amount){
      var charge = {amount: amount, currency: 'USD', card: stripeToken};

      stripe.charges.create(charge,
        function(err, charge) {
          if(err){
            console.log(err);
            errors_messages.push("Sorry we have a problem");
          }
          else{
              Form.findOneAndUpdate({email: req.cookies.email}, {donate: true}, {upsert:true}, function(err, doc){});
              console.log('Successful charge sent to Stripe!');
          }
      });

    } else{
      errors_messages.push("Invalid amount");
    }

    if(errors_messages.length){
      res.render('donations/new', {errors_messages: errors_messages});
    }else{
      res.render('donations/create');
    }
});



module.exports = router;
