const router = require('express').Router()
const controller = require('./controller')

router.post('/register', controller.register)
router.get('/users', controller.userlist)
router.post('/login', controller.login)

module.exports = router