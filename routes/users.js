var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.json([{
        id: 1,
        username: "Test1"
    }, {
        id: 2,
        username: "Test2"
    }]);
});

module.exports = router;
