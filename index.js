const express = require('express');
const app= express();
const cors=require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');


const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ph97a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
           await client.connect();
           const dataCollection=client.db('MotoHouse').collection('products');
         
           app.get('/products', async(req, res )=>{
            const  query = {};
            const cursor = dataCollection.find(query);
            const products= await cursor.toArray();
            res.send(  products);
           })
    }
    finally{

    }

}
run().catch(console.dir)


app.get('/',(req,res) => {
    res.send('run moto')
});

app.listen(port,()=>{
    console.log('run server ', port);
})