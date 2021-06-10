const { json } = require('express');
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

//alt route defintion using middlware ! 
router.get('./subId', getSubscriber, (req, res) => {
    res.json(res.getSubriber); 
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
router.patch('/:SubId', getSubsriber, async (req, res) => {
    if (req.body.name){
        res.getSubriber.name = req.body.name; 
    }
    if (req.body.subscribedToChannel){
        res.getSubriber.subscribedToChannel = req.body.subscribedToChannel; 
    }
    try {
        const updatedSub = await res.subscriber.save(); 
        res.json(updatedSub); 
        
    }catch(err){
        res.status(400).json({message: err}); 
    }
   
}); 

//Deleting a Subsriber one
router.delete('/:subId', getSubriber, async (req, res) => {
    try{
    const deletedSub = await res.subscriber.remove(); 
    res.json(deletedSub); 
    }
    catch(err){
        res.status(500).json({message: err})
    }
}); 

//middleware to get the subsriber 
async function getSubscriber (req, res, next){
    let subsriber; 
    try {
        subsriber = await Subsriber.findById(req.params.subId); 
        if (!subscriber){
            //status code where we could not find a resource 
            //in this case a subsriber 
            return res.status(404).json({message: 'can not find subsriber!'}); 
        }
    }catch(err){
        //status code 500 
        //issue with our server causing the problem 
        return res.status(500).json({message: err}); 
    }
    //creating a variable on our responce object which we can then call later
    res.subscriber = subsriber; 
    next(); 
}


module.exports = router; 