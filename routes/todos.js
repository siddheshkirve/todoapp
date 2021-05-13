var express = require('express')
var router = express.Router()
const { MongoClient } = require("mongodb");
const {v4: uuidv4} = require("uuid")

let client;

const getClient = () => {
    
        const uri = 'mongodb://127.0.0.1:27017/'
    
    //DATABASE connection
    return new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
}

router.post('/:username' , async (req, res) => {
    try {
        /**
         * First check if todo is not an empty string.
         * If todo is empty string, throw error
         * Else add todo to database
         */
        console.log(req.params);
        console.log(req.body);
        if(!req.body.todo) {
            throw "Todo must not be empty."
        }
        
        const dbClient = getClient();
await dbClient.connect();
    const database = dbClient.db("todoDB");
    console.log("Connected successfully to server");
    const TODO = database.collection("todo");
    await TODO.updateOne({username: req.params.username}, {$push: {todos: {id: uuidv4(), todo: req.body.todo}}}, {upsert: true});
    res.json({ok: true});
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error
        })
    }
});
router.get("/:username", async (req, res) => {
    try {
      let client = getClient();
      await client.connect();
      const db = client.db("todoDB");
      console.log("Connected successfully to server");
      const TODO = db.collection("todo");
      res.json({
        ok: true,
        userTodo: await TODO.find({ username: req.params.username }).toArray(),
      });
    } catch (error) {
      console.log(error);
      res.json({
        ok: false,
        error,
      });
    }
  });


module.exports = router;