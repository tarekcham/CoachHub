const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

// Create Scheme

const ItemSchema = new Scheme({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    complete: {
        type:Boolean,
        required: false

    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Item = mongoose.model("item", ItemSchema);