const router = require('express').Router()
const controller = require('./controller')

router.post('/list', controller.list)
router.post('/register', controller.register)

module.exports = router