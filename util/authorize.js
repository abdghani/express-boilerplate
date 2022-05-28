const jwt = require('jsonwebtoken')
const { isUndefined, hasNoLength } = require("@app/util/check")

const authorizeUser = (req, _, next) => {
    const authorization = req.headers.authorization
    if (!isUndefined(authorization)) {
        const accessToken = authorization.split(' ')[1]
        try {
            const user = jwt.verify(accessToken, process.env.JWT_SECRET)
            if (!isUndefined(user)) req.user = user
        } catch (err) {
            throw { status: 401, message: "Invalid accesstoken" };
        }
    }
    next()

}

const authorize = (role) => {
    return (req, res, next) => {
        if (isUndefined(req.user))
            throw { status: 401, message: "Invalid access" };
        else if (!isUndefined(role) && req.user.role != role)
            throw { status: 401, message: "Invalid access" };
        next()
    }
}
module.exports = { authorize, authorizeUser };