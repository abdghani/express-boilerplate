const userModel = require('@app/models/users')
const bcrypt = require('bcryptjs')
const { isNull } = require('@app/util/check')
const { createToken } = require('@app/controllers/users/util')

const userGet = async (_, res) => {
  const users = await userModel.find()
  res.send(users)
}

const saveUser = async (req, res, next) => {
  const { email, name, password, role } = req.body

  try {
    const hash = bcrypt.hashSync(password, 10)
    const foundUser = await userModel.emailExist(email)

    if (!isNull(foundUser)) throw { status: 400, message: 'User alrteady exists' }

    // adding new user
    const user = userModel({ email, role, name, password: hash })
    await user.save()

    res.send({ success: 'user added successfully' })
    next()
  } catch (err) {
    next(err)
  }
}

const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const foundUser = await userModel.findOne({ email })
    if (isNull(foundUser)) throw { status: 400, message: 'User not found' }

    // adding new user
    const comparePassword = foundUser.comparePassword(password)
    if (!comparePassword) throw { status: 401, message: 'Invalid password' }

    const accessToken = createToken(foundUser)

    res.send({ accessToken })
    next()
  } catch (err) {
    next(err)
  }
}

const currentUser = async (req, res, next) => {
  try {
    const foundUser = await userModel.findOne({ email: req.user.email }, { _id: 0, password: 0 })
    res.send(foundUser)
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  userGet,
  saveUser,
  loginUser,
  currentUser
}
