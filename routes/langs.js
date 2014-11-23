var express = require('express')
  , router = express.Router();

router.get('/langs/:lang', function(req, res) {

	res.cookie('lang', req.params.lang);
	backUrl = req.header('Referer') || '/';

	res.redirect(backUrl);
})

module.exports = router;
