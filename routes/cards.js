const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const loadValue = 5.5;
/* connect to my mongodbserver limited to 500mb ;) */
MongoClient.connect('mongodb://snackuser2:snackpassw0rd@ds125821.mlab.com:25821/snacktest', (err, client) => {

  if (err) return console.log(err);
  db = client.db('snacktest');
  
    /* GET card id. */
    router.get('/find/:id', function(req, res, next) {
      db.collection('cards').findOne({'cardId':parseInt(req.params.id)}, (err, result) => {
        if (err || result == null) return console.log(err)
        
        console.log('found card!');
        res.send(result);
        })
    });
    /* load the card with 5.5 */
    router.post('/loadbalance/:id', function(req, res, next) {
      db.collection('cards').findOne({'cardId':parseInt(req.params.id)}, (err, result) => {
        if (err) return console.log(err)
		/* output of the operation is the new balance and the status */
        let new_balance = result.balance;
		let status = "not ok";
        if (result.lodge !== (new Date(Date.now())).toLocaleDateString("en-US")){
           let newValues = { $set: { balance: result.balance + loadValue, lodge: (new Date(Date.now())).toLocaleDateString("en-US") }};           
           db.collection('cards').update(result, newValues, (err, result) => {
            if (err) return console.log(err);
            status = "ok";
            /* saved to database */
            
            res.send(`{balance:${new_balance  + loadValue }, status:${status}}`);
            });

        }else{
			res.send(`{balance:${new_balance}, status:${status}}`);
		}
        })
    });
	/* withdraw the card with the amount */
    router.post('/withdraw_and_update/:id&:amount', function(req, res, next) {
		let amount = parseFloat(req.params.amount);
      db.collection('cards').findOne({'cardId':parseInt(req.params.id)}, (err, result) => {
        if (err) return console.log(err)
		/* output of the operation is the new balance and the status */
        let new_balance = result.balance;
		let status = "not ok";
		
		if (result.lodge !== (new Date(Date.now())).toLocaleDateString("en-US")){
			new_balance += loadValue;
		}		
		
		
        if (new_balance - amount >= 0){
			new_balance = new_balance - amount;
           let newValues = { $set: { balance: new_balance, lodge: (new Date(Date.now())).toLocaleDateString("en-US") }};           
           db.collection('cards').update(result, newValues, (err, result) => {
            if (err) return console.log(err);
            status = "ok";
            /* saved to database */
            
            res.send(`{balance:${new_balance}, status:${status}}`);
            });

        }else{
			res.send(`{balance:${new_balance}, status:${status}}`);
		}
        })
    });

})

module.exports = router;
