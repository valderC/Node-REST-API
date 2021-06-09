const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose'); 
require('dotenv').config(); 

mongoose.connect(process.env.DB_Connection, {
    useNewUrlParser: true 
}); 

const db = mongoose.connection; 
//will run if connection to db fails 
db.on('error', (error) => console.error(error)); 
//once() method runs if connection to db succeeds 
db.once('open', () => console.log('Connected to Database')); 

const port = process.env.PORT || 3000; 

app.listen(port, () => {
    console.log(`Connected to port: ${port}`); 
}); 

//middleware 

//allows our server to accept json as a body inside a post/get element etc.. 
app.use(express.json()); 

//everytime the user queries the subscribers url everything will go into the
//subscribersRouter with the path that we defined below 
const subscribersRouter = require('./routes/subscribers'); 
app.use('/subscribers', subscribersRouter); 



//routes 


