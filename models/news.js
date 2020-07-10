const mongoose = require('mongoose');
const { Schema } = mongoose;

const newsSchema = new Schema({
    sourceUrl: {
        type: String
    },
    imgUrl: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("News", newsSchema);