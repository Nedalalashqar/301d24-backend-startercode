'use strict';
const express=require('express');
const cors=require('cors');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
app.use(express.json());
app.use(cors());
const port=process.env.PORT || 8080;
const {
    home,
    getFavoriteCoffee,
    createItemController,
    updateItemController,
    deleteItemController,
    retreiveItemsController
}=require('./controllers/coffee.controller');

mongoose.connect(`mongodb://localhost:27017/finalexam`, 
                {useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
                    console.log('connected')
                }).catch((error)=>{
                    console.log('dont connected')
                });

app.get('/',home);
app.get('/fav-list',getFavoriteCoffee);
app.get('/retreive',retreiveItemsController);
app.post('/create',createItemController);
app.put('/update/:id',updateItemController);
app.delete('/delete/:id',deleteItemController);

app.listen(port, ()=>{
    console.log('listening to port 8000');
});