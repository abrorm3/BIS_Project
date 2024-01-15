const mongoose = require('mongoose');

const boothSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    purposeType: {
        type: String,
        required: true,
        enum: ['coffee-shop', 'security', 'market']
    },
    dimensions: {
        width: {
            type: Number,
            required: true
        },
        depth: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    },
    doorType: {
        type: String,
        required: true
    },
    foundation: {
        type: String,
        required: true
    },
    roof: {
        type: String,
        required: true
    },
    insulation: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    facade: {
        type: String,
        required: true
    },
    electricity: {
        type: String,
        default: false
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
});

const Booth = mongoose.model('Booth', boothSchema);

module.exports = Booth;
