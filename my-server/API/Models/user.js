const mongoose = require('mongoose');

// Track the next available userId
let nextUserId = 1;

const userInfoSchema = mongoose.Schema({
    userId: { type: Number, unique: true }, // Incrementing user ID
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^\+?[1-9]\d{1,14}$/,
    },
});





// Middleware to set auto-incrementing userId before saving
userInfoSchema.pre('save', async function (next) {
    if (this.isNew && !this.userId) {
        this.userId = nextUserId++;
    }
    next();
});

// Function to reset userId to 1
async function resetUserId() {
    try {
        // Clear all documents in the collection
        await mongoose.model('UserData').deleteMany({});

        // Reset nextUserId to 1
        nextUserId = 1;
        console.log("userId has been reset to 1, and all user data has been cleared.");
    } catch (error) {
        console.error("Error resetting userId:", error);
    }
}

// Initialize nextUserId at server startup
mongoose.model('Users', userInfoSchema)
    .findOne({})
    .sort({ userId: -1 }) // Find the document with the highest userId
    .then((lastUser) => {
        if (lastUser) {
            nextUserId = lastUser.userId + 1; // Set nextUserId to the next available ID
        } else {
            nextUserId = 1; // Start from 1 if no documents are found
        }
    })
    .catch((err) => console.error('Error initializing nextUserId:', err));

// Reset userId and clear the collection when needed
//resetUserId();

const UserInfo = mongoose.model('Users', userInfoSchema, 'Users');
module.exports = UserInfo;





