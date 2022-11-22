var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db/index');
const jwtTokens = require('../utils/jwt-helpers')
/* GET users listing. */
router.get('/', async (req, res, next) => {

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

router.post('/login', async(req, res) => {
  try {
    let {username, password} = req.body;
    
    const user = await db.one('SELECT * FROM users WHERE username=$1', [username]);
        
    if(!user){
      res.status(401).send({error: "username is not correct"});
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword){
      res.status(401).send({error: "Invalid password."})
      return;
    }

    if(user && validPassword){
      let data = jwtTokens(user);

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const emailToLowerCase = email.toLowerCase();
   

    const user = await db.one(`INSERT INTO useraccount ( username, email, image, password) VALUES 
    ($1, $2, $3, $4) RETURNING id, username, email, image`, [username, emailToLowerCase, image, hashedPassword]);


    if(user){

      let data = jwtTokens(user);
      res.json(data)
      console.log(data)
    }
    
     
  } catch (error) {
    res.send({
      status: 404,
      message: error.message
    })
  }
})

module.exports = router;
