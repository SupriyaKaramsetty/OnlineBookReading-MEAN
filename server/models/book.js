const mongoose = require('mongoose');
const Object_Id = mongoose.Schema.Types.ObjectId;
const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    genre: {
        type:String,
        required: true
    },
    release_year: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    cover: { 
        type: String, 
        required: true 
    },
    pdf: { 
        type: String, 
        required: true 
    },
    pageCount: { 
        type: Number, 
        required: true 
    },
    currentRating: { 
        type: Number, 
        default: 0 
    },
    reviews: [{ 
        type: Object_Id, 
        ref: 'Review' }],

    bookStatus:{
        type: String,
        default: "Add To Library"
    }
})
module.exports = mongoose.model("Book",bookSchema);







