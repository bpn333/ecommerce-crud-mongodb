import express from "express";
import { mongo_url } from "./config.js";
import mongoose from "mongoose";
import {Item} from "./models/item_model.js"
import cors from "cors"
const app = express();
app.use(express.json())
app.use(cors());

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(200).send('hello op')
})
//Create
app.post('/new',async (request,response)=>{
    try{
        if(!request.body.name || !request.body.price || !request.body.description){
            return response.status(400).send('please fill all the fields '+`${request.body.price}`)
        }
        const new_item = {
            name:request.body.name,
            price:request.body.price,
            description:request.body.description
        }
        const item = await Item(new_item).save();
        return response.status(201).send(item);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({ message:error.message })
    }
})
//for get method (only for testing)
/*
app.get('/new', async (request, response) => {
    try {
        const name = request.query.name;
        const price = request.query.price;
        const description = request.query.description;

        if (!name || !price || !description) {
            return response.status(400).send('Please fill all the fields');
        }

        const new_item = {
            name: name,
            price: price,
            description: description
        };
        const item = await Item(new_item);
        return response.status(201).send(item);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});
*/
//Find
app.get('/items', async(request,response)=>{
    try{
        const all_items = await Item.find({});
        return response.status(200).send({
            count:all_items.length,
            items:all_items
        });
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({ message:error.message })
    }
})
app.get('/search', async (request, response) => {
    try {
        const keyword = request.query.keyword;
        
        if (!keyword) {
            return response.status(400).send({ message: 'Please provide a search keyword' });
        }
        const query = { name: { $regex: new RegExp(keyword, 'i') } };
        
        const matchingItems = await Item.find(query);
        
        return response.status(200).send({
            count: matchingItems.length,
            items: matchingItems
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.get('/item/:id', async(request,response)=>{
    try{
        const {id} = request.params;
        const item = await Item.findOne({_id:id});
        return response.status(200).send(item);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({ message:error.message })
    }
})
app.get('/buy/:id', async(request,response)=>{
    try{
        const {id} = request.params;
        const item = await Item.findOne({_id:id});
        if(item){
            item.sold = true;
        }
        await item.save()
        return response.status(200).send(item);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({ message:error.message })
    }
})
//Update
app.put('/item/:id', async(request,response)=>{
    try{
        if(!request.body.name || !request.body.price || !request.body.description){
            return response.status(400).send('please fill all the fields')
        }
        const {id} = request.params
        const result = await Item.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).send({ message:'item not found' })
        }
        return response.status(200).send({message: 'Item Data Updated Sucessfully'});
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({ message:error.message })
    }
})
//delete
app.delete('/item/:id', async(request,response)=>{
    try{
        const {id} = request.params
        const result = await Item.findByIdAndDelete(id,request.body);
        if(!result){
            return response.status(404).send({ message:'item not found' })
        }
        return response.status(200).send({message: 'Item Data Deleted Sucessfully'});
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({ message:error.message })
    }
})


app.listen(333,()=>{
    console.log('server up')
});

mongoose.connect(mongo_url).then(()=>{
    console.log('mongo db connection sucess :')
}).catch((error)=>{
    console.log(error);
});