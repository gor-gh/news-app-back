const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const secret = 'my_secret_code';
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
userSchema.pre('save', function (next) {
    let user = this;
    user.password = crypto.createHmac('sha256', secret)
        .update(user.password)
        .digest('hex');
    next();
})


module.exports = mongoose.model("User", userSchema);