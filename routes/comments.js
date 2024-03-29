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

router.get('/:id', async function(req, res, next){
  try{
     const user = await db.one("SELECT * FROM comments WHERE id = $1",[req.params.id]);
     res.json(user)
  }catch(error){
    res.send({
      status: 404,
      message: error.message
    })
  }
});

router.post('/', async (req, res) => {
  try {
    const {username, userimage, comment, memberid, date} = req.body;

    const userComment = await db.one(`INSERT INTO comments ( username, userimage, comment, memberid, date) VALUES 
    ($1, $2, $3, $4, $5) RETURNING *`, [username, userimage, comment, memberid, date]);

     res.json({userComment: userComment})
     
  } catch (error) {
    res.send({
      status: 404,
      message: error.message
    })
  }
})

router.delete('/:id', async function(req, res, next){
  try{
     const user = await db.one("DELETE  FROM comments WHERE id = $1",[req.params.id]);
     res.json(user)
     res.send({
      status: 'Success', message: 'Item ID has been deleted successfully'
    })
  }catch(error){
    res.send({
      status: 404,
      message: error.message
    })
  }
});


module.exports = router;