const mongoose = require('mongoose');
const Object_Id = mongoose.Schema.Types.ObjectId;

const userSchema = new  mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    token : {
        type: String
    },
    wantToReadBooks: [{ 
                type: Object_Id, 
                ref: 'Book' 
            }],



    currentlyReadingBooks: [{ 
                type: Object_Id, 
                ref: 'Book' 
            }],
    readBooks: [{ 
                type: Object_Id, 
                ref: 'Book' 
            }]
        });


module.exports = mongoose.model("User",userSchema)

