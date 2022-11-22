var express = require('express');
var router = express.Router();

const db = require('../db/index');

/* GET home page. */
router.get('/', async function(req, res, next) {

    try{
        const comments =  await db.any('SELECT * FROM comments')
        res.json({ comments: comments});
      }catch(error){
        res.send({
          status: 404,
          message: error.message
        })
      }
      
});

router.post('/', async (req, res) => {
  try {
    const {userId, userName, userImage, comment} = req.body;

    const userComment = await db.one(`INSERT INTO comments ( userId, userName, userImage, comment) VALUES 
    ($1, $2, $3, $4) RETURNING *`, [userId, userName, userImage, comment]);

     res.json({userComment: userComment})
     
  } catch (error) {
    res.send({
      status: 404,
      message: error.message
    })
  }
})

module.exports = router;