import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String
    },
    itemList: [{
        _id: false,
        id: String,
        content: String,
        quantity: Number
    }]
});

export default mongoose.model('List', Schema);