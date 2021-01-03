var express = require('express');
const { verify } = require('jsonwebtoken');
var router = express.Router();

function authenticateToken (req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.sendStatus(401);
    }

    console.log('token ====', token)
    console.log('secret ====', process.env.SECRET_TOKEN)

    verify(token, process.env.SECRET_TOKEN, (err, user) => {
      console.log('======================', user)
      if (err) {
        res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } catch (err) {
    console.log('Error in authenticateToken: ', err);
    next();
  }
}

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'tenant-mysql',
  user     : 'root',
  password : 'password',
  database : 'tenant-db',
  insecureAuth : true
});
connection.connect();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  await new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM customers`, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    })
  })
  .then(data => {
    console.log('data', data);
    res.json(data)}
    )
  .catch(error => res.send(error));
});

router.post('/', authenticateToken, async function(req, res, next) {
  try {
    await new Promise((resolve, reject) => {
      connection.query(`INSERT INTO customers SET ?`, req.body,(error, results, fields) => {
        if (error) {
          res.sendStatus(500);
          throw (error);
        } else {
          res.send(201);
        }
      });
    })
    .catch(error => {
      console.log('error', error);
      res.send(500);
    });
  } catch (error) {
    res.send(500);
  }

});

router.get('/:id', function(req, res, next) {
  try {
    connection.query(`SELECT * FROM customers WHERE id=?`, req.params.id, (error, results, fields) => {
      if (error) {
        throw error(error);
      } else {
        res.json(results);
      }
    })
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', authenticateToken, async function(req, res, next) {
  try {
     connection.query(`DELETE FROM customers WHERE id=?`, req.params.id, (error, results, fields) => {
       if (error) {
         throw error(error);
       }
       res.send(200);
     })
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
