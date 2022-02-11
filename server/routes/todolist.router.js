const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM tasktable';
    pool.query(queryText)
      .then((result) => {
          res.send(result.rows);
      })
      .catch((err) => {
          console.log('Error making query', queryText, err);
          res.sendStatus(500);
      });
});

module.exports = router;