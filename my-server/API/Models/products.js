const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true }, // use required filed to mendetory that filed
    price: { type: String, required: true },
    description: { type: String },
    productImage: { type: String, required: true }
}, { timestamps: true });// This adds createdAt and updatedAt automatically

module.exports = mongoose.model('Product', productSchema)