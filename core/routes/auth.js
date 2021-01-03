require('dotenv').config()
var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

router.post('/', async function(req, res, next) {
  try {
    const { SECRET_TOKEN } = process.env;
    const { username } = req;
    const user = { name: username }
  
    const ACCESS_TOKEN = jwt.sign(user, SECRET_TOKEN);
    res.json({ accessToken: ACCESS_TOKEN });   
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
