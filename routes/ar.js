var express = require('express');
var router = express.Router();
var path = require('path');

/* GET ar camera page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/views/ar.html'));
});


module.exports = router;
