var express = require('express');
var router = express.Router();

const db = require('../db/index');

/* GET home page. */
router.get('/', async function(req, res, next) {

  try{
    const administer =  await db.any('SELECT * FROM administer')
    res.json({ administer: administer });
  }catch(error){
    res.send({
      status: 404,
      message: error.message
    })
  }
  
});
router.post('/', async (req, res) => {
  try {
    const {username, email, image, password} = req.body;

    if(!name || name.length < 4){
      throw({message: 'Username must have at least 4 characters'});
    }

    const administer = await db.one(`INSERT INTO administer ( username, email, image, password) VALUES 
    ($1, $2, $3, $4) RETURNING id, username, image`, [username, email, image, password]);

     res.json({administer: administer})
      console.log(user)
     
  } catch (error) {
    res.send({
      status: 404,
      message: error.message
    })
  }
})

module.exports = router;