const express = require('express')
const { MongoClient } = require("mongodb");
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const userRoutes = require('./routes/user')
const todosRoute = require("./routes/todos")


//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json())


//routes 
app.use( '/api' , userRoutes)
app.use("/todos", todosRoute)


//port
const port = process.env.PORT || 8080

//server start
app.listen(port,() => {
  console.log(`server is running at ${port}`);
})

// Connection URI
const uri = 'mongodb://127.0.0.1:27017/'

//DATABASE connection
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("todoData");
    console.log("Connected successfully to server");
    const userdata = database.collection("userData");


    



    
    // await userdata.insertMany([
    //   {
        
    //     name:'siddhes',
    //     surname:'kirve',
    //     phone :998750036
    //   },
    //   {
    //     name:'tanaji',
    //     surname:'kirve'
    //   }
    // ])
    // await userdata.updateOne({name:'tanaji'},{$set:{name:'siddheshkirve2'}});

 



    // create a document to be inserted
    // const doc = { username: "amsu", todos: [ { id:2, todo: "new data" } ] };
    // const result = await userdata.insertOne(doc);
    // const findResult = await userdata.findOne({
    // });
    // console.log(
    //   `${result.insertedCount} documents were inserted with the _id: ${result.insertedId} and username is ${findResult.username}`,
    // );
  } finally {
    await client.close();
  }
}
run().catch(console.dir)

