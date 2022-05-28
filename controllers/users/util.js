const jwt = require('jsonwebtoken')

const createToken = (user, expiresIn = process.env.JWT_EXPIRATION) => {
    const payload = {
        _id: user._id,
        role: user.role,
        email: user.email,
        name: user.name
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn
    })
}

const createRefreshToken = user => {
    return jwt.sign({ userId: user._id, type: 'refresh' }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_REFRESH
    })
}

module.exports = {
    createToken,
    createRefreshToken
}
