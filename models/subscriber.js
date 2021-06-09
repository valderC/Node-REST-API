const mongoose = require('mongoose'); 

const subSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    subscribeToChannel: {
        type: String, 
        required: true
    }, 
    subscribeDate: {
        type: Date, 
        required: true, 
        default: Date.now
    }
}); 

module.exports = mongoose.model('Subscriber', subSchema); 