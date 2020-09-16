const router = require('express').Router()
const auth = require('./auth')
const university = require('./university')

router.use('/auth', auth)
router.use('/university', university)

module.exports = router