const User = require('../../../models/user')

/**
 * POST /api/auth/signup
 * {
 *  name, email, password
 * }
 */
exports.register = (req, res) => {

  const { email, name, password } = req.body

  const newUser = new User()
  newUser.email = email
  newUser.name = name
  newUser.password = password

  newUser.save(function(err) {
    if (err) {
      res.status(500).json({ error : err })
      return
    } 
    res.status(200).json(newUser)
  })
}

exports.userlist = (req, res) => {
  User.find(function(err, users) {
    if (err) return res.status(500).json({ error: 'database failure' })
    res.json(users);
  })
}