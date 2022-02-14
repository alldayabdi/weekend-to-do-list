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

router.post('/', (req, res) => {
    let newTask = req.body;
    console.log(`Adding task`, newTask);
  
    let queryText = `
      INSERT INTO "tasktable" ("task")
      VALUES ($1);
      `;
    pool.query(queryText, [newTask.task])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
  });

  router.put('/:id', (req, res)=>{
    let idToUpdate = req.params.id;
    console.log(idToUpdate);
    // console.log(req.body);
  
  
  if(req.body.complete === 'Complete'){
          sqlTest = `
          UPDATE "tasktable" 
          SET "isCompleted" = true
          WHERE "id" = $1; 
          `
      
      } else {
          res.sendStatus(400);
          return ;
      }
      let sqlValues = [idToUpdate];
      pool.query(sqlTest, sqlValues)
      .then(result=>{
          res.sendStatus(200)
      }).catch(error=>{
          res.sendStatus(500);
  
      })
  
    })

    router.delete('/:id', (req,res)=>{
        let reqId = req.params.id;
        console.log('Delete ID', reqId);
        let queryText = 'DELETE FROM "tasktable" where id = $1;';
        pool.query(queryText, [reqId])
        .then((result)=>{
            console.log('task deleted');
            res.sendStatus(200);
        }).catch((error)=>{
            console.log('Error making database query', queryText, error);
        })
      })