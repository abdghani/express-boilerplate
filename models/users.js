const mongoose = require('@app/util/mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose


const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
    }
)

userSchema.statics.emailExist = function (email) {
    return this.findOne({ email })
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User

