const express = require('express');
const app= express();
const cors=require('cors');
const res=require('express/lib/response')
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ph97a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
           await client.connect();
           const dataCollection=client.db('MotoHouse').collection('products');
         
           app.get('/product', async(req, res )=>{
            const  query = {};
            const cursor = dataCollection.find(query);
            const products= await cursor.toArray();
            res.send(products);
           });

           app.get('/product/:id', async(req, res)=>{
            const id=req.params.id;
            const query={_id: ObjectId(id)}
            const products=await dataCollection.findOne(query);
            res.send(products);
            
        });
        app.post('/product', async(req, res)=>{
            const newProduct=req.body;
            const result=await dataCollection.insertOne(newProduct);
            res.send(result);
        })

        app.delete('/product/:id', async(req, res)=>{
            const id=req.params.id;
            const query={_id: ObjectId(id)}
            const result=await dataCollection.deleteOne(query);
            res.send(result);
            
        });

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