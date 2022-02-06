const mongoose = require('mongoose');
const Object_Id = mongoose.Schema.Types.ObjectId;
const reviewSchema = new  mongoose.Schema(
    {
    content:{
        type:String,
        required:true
    }, 
    user: {
             type: Object_Id,
             ref: 'User'
    },
    book: {
            type: Object_Id,
             ref: 'Book'
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
    
});


module.exports = mongoose.model("Review",reviewSchema);