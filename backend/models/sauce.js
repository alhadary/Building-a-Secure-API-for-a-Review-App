const mongoose = require('mongoose');

const sauseSchema = mongoose.Schema({
    name: { type: String, require: true },
    manufacturer: { type: String, require: true },
    description: { type: String, require: true },
    heat: { type: Number, require: false },
    likes: { type: Number, require: false },
    dislikes: { type: Number, require: false },
    imageUrl: { type: String, require: true },
    mainPepper: { type: String, require: true },
    usersLiked: { type: [], require: false },
    usersDisliked: { type: [], require: false },
    userId: { type: String, require: true },
});
module.exports = mongoose.model('Sauce', sauseSchema);