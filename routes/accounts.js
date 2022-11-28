var express = require('express');
var router = express.Router();


const authenticateToken = require('../middleware/authorization');

router.get('/',  authenticateToken, (req, res) => {

    res.json([
        {
            'number' : '4309435345', 
            'balance' : '100.00'
        },
        {
            'number' : '43234353234', 
            'balance' : '900.00'
        }
    ])
})


module.exports = router;