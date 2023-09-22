const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

//the passport-local-mongoose add the username and the password
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User' , userSchema);

module.exports = User;
