'use strict';
const axios=require('axios');
const {coffeeModel,Coffee}=require('../models/coffee.model');

// Endpoint for testing
const home=(req,res)=>{
// provide your logic here
}
// Call the coffee api here and return the results
function retreiveItemsController(req,res){
    // provide your logic here
    axios.get('https://coffeepedias.herokuapp.com/coffee-list').then(response=>{
        const result=response.data.map(item=>{
            return new Coffee(item)
        })
        res.send(result)
    }).catch(err=>console.log('OOPS'))
};
// Get favorite coffee from MongoDB
function getFavoriteCoffee(req,res){
    // provide your logic here
    coffeeModel.find({},(error,data)=>{
        res.send(data)
    })

}
// Create new fav coffee endpoint
function createItemController(req,res){
    // provide logic here
    const{img,title,description,ingredients}=req.body;
    coffeeModel.find({title:title},(error,data)=>{
        if(data.length > 0){
            console.log('this also')
        }else{
            let newCoffee =new coffeeModel({
                img:img,
                title:title,
                description:description,
                ingredients :ingredients,
            })
            newCoffee.save();
        }
    })
};

// update coffee from MongoDB
function updateItemController(req,res){
    // provide logic here
    const{id}=req.params;
    const{img,title,description,ingredients}=req.body;
    coffeeModel.findOne({_id:id},(error,item)=>{
        item.img=img;
        item.title=title;
        item.description=description;
        item.ingredients=ingredients;
        item.save().then(()=>{
            coffeeModel.find({},(error,item)=>{
                res.send(item)
            })
        })
    })
};

// delete coffee from MongoDB
function deleteItemController(req,res){
    // provide your logic here
    const {idx}=req.params;
    coffeeModel.remove({_id:idx},(error,data)=>{
        coffeeModel.find({},(error,data) =>{
            res.send(data)
        })
        
    })
};

module.exports={
    home,
    getFavoriteCoffee,
    createItemController,
    updateItemController,
    deleteItemController,
    retreiveItemsController
};