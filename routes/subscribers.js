const express = require('express'); 
const router = express.Router(); 
const Subsriber = require('../models/subscriber'); 

//now create our RESTful routes since it's a REST api 

//Getting all subsribers
router.get('/', async (req, res) => {
    try {
    const subscribers = await Subsriber.find(); 
    res.json(subscribers); 
    }catch(err){
        res.status(500).json({message: err})}
}); 

//Getting a specific subscriber one 
router.get('/:subId', async (req, res) => {
    try{
    const uniqueSub = await Subsriber.findById(req.params.subId); 
    res.json(uniqueSub); 
    }catch(err){
        res.status(500).json({message: err})
    }
}); 

//Creating a Subsriber 
router.post('/', async (req, res) => {
    try {
    const newSub = new Subsriber({
        name: req.body.name, 
        subscribedToChannel: req.body.subscribedToChannel
    }); 
    const addedSub = await newSub.save(); 
    res.status(201).json(addedSub); 
    }catch(err){
        res.status(400).json({message: err})
    }
}); 

//Updating a Subsriber one 
router.put('/:SubId', async (req, res) => {
    try{
    const updatedSub = await Subsriber.updateOne(
        {_id: req.params.subId}, 
        {$set: {user: req.body.user}});
        res.json(updatedSub);  
    }
    catch(err){
        res.status(500).json({message: err})
    }
}); 

//Deleting a Subsriber one
router.delete('/:subId', async (req, res) => {
    try{
    const deletedSub = await Subsriber.remove({_id: req.params.subId}); 
    res.json(deletedSub); 
    }
    catch(err){
        res.status(500).json({message: err})
    }

}); 


module.exports = router; 