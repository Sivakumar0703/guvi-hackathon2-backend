const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type:String,
        required:true
    },
    currentbooking: [],
    quantity : {
        type : String,
        default : "1"
    },
    description: {
        type:String,
        required:true
    },

    createdOn: {
        type: Date,
        default: Date.now()
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('products', productSchema);