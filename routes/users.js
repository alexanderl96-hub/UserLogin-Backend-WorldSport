var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db/index');
const jwtTokens = require('../utils/jwt-helpers')
/* GET users listing. */
router.get('/', async function(req, res, next) {

  try{
    const users =  await db.any('SELECT * FROM useraccount');
    res.json({users: users });
  }catch(error){
    res.send({
      status: 404,
      message: error.message
    })
  }
  
});

router.get('/:id', async function(req, res, next){
  try{
     const user = await db.one("SELECT * FROM useraccount WHERE id = $1",[req.params.id]);
     res.json(user)
  }catch(error){
    res.send({
      status: 404,
      message: error.message
    })
  }
});

router.post('/login', async (req, res) => {
  try {
    let {username, password} = req.body;
    
    const user = await db.one('SELECT * FROM useraccount WHERE username = $1', [username]);
        console.log(user.username, user.password)
    if(!user){
      res.status(401).send({error: "username is not correct"});
      console.log("username is not correct")
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword){
      res.status(401).send({status: 'error', message: "Invalid password for this user."})
      return;
    }

    if(user && validPassword){
      let data = jwtTokens(user);
      data.user = user
      res.json(data);
    }

  } catch (error) {
    res.send({
      status: 'error',
      message: error.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const {username, email, image, password} = req.body;
    //  const user = await db.one('SELECT * FROM users WHERE username=$1', [username]);

    if(username.length < 4){
      throw({message: 'Username must have at least 4 characters'});
    }
    if(password.length < 6){
      throw({message: 'Username must have at least 6 characters'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const emailToLowerCase = email.toLowerCase();
   

    const user = await db.one(`INSERT INTO useraccount ( username, email, image, password) VALUES 
    ($1, $2, $3, $4) RETURNING id, username, email, image`, [username, emailToLowerCase, image, hashedPassword]);


    if(user){

      let data = jwtTokens(user);
      console.log(user)
      data.user = user
    
      res.json(data)
    }
    
     
  } catch (error) {
    console.log(error)
    res.send({
      status: 404,
      message: error.message
    })
  }

})

router.get('/authenticate', async (req, res) => {
  try {
   console.log(req.headers);

    console.log(accessToken);
    res.send({});
  } catch (error){
    res.send( 'error')
  }
})

module.exports = router;
