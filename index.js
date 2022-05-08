const express = require('express');
const app= express();
const port=process.env.PORT || 5000;

app.get('/', (req,res)=>{
    res.send()
});

app.get('/products', (req, res)=>{
    res.send('show my data')
})

app.listen(port, ()=>{
    console.log('listing to port ', port);
})