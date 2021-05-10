var express = require('express')
var router = express.Router()


router.post('/create' , (req, res) => {
    var todo = new Todo(req.body);
     todo.save().then( todo => {
     res.status(200).json({'message': 'Todo successfully added '});
     })
     .catch(err => {
      res.status(400).send("Error when saving to database");
     });
  });

  module.exports = router;