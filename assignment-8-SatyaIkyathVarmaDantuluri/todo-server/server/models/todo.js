import mongoose from 'mongoose';

//Entering schema for the collections in mongoDB
const todoSchema = new mongoose.Schema({

    title:{
        type: String,
        required : "Title is required"
    },
    description:{
        type:String,
        //Mandatory fields
        required : true
    },
    createdDate:{
        type: Date,
        // date is default 
        default: Date.now,
        // to not allow users to modify the content
        unmodifiable: true

    },
    lastModifiedDate:{
        type: Date,
        // date is default 
        default: Date.now,
        // to not allow users to modify the content
        unmodifiable: true
    }

},{
    versionKey: false
}
);

// sets the virtual id
todoSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

//sets the JSON format
todoSchema.set('toJSON', {
    virtuals: true
})

//exports the model
export default mongoose.model('Todo',todoSchema);
