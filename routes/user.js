const express = require('express')
const router = express.Router()
const userController = require('@app/controllers/users/resolvers')
const userSchema = require('@app/controllers/users/validate')
const validate = require('@app/util/joi')
const { authorize } = require('@app/util/authorize')

/* GET home page. */
router.get('/', userController.userGet)
router.post('/', validate(userSchema.userAdd), userController.saveUser)

router.post('/login', validate(userSchema.userLogin), userController.loginUser)
router.get('/current', authorize('admin'), userController.currentUser)

module.exports = router
