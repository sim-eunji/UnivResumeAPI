const router = require('express').Router()
const controller = require('./controller')

router.post('/register', controller.register)
router.get('/users', controller.userlist)

module.exports = router