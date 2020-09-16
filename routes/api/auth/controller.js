const User = require('../../../models/user')

/**
 * POST /api/auth/signup
 * {
 *  name, email, password
 * }
 */
exports.register = async (req, res) => {

  const { email, name, password } = req.body

  try {
    const user = await User.findOne({email}).exec()
    if(user) {
      res.status(409).json({
        error: 'Dupliate Data'
      })
      return 
    }

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

  } catch(err) {
    res.status(500).json({ error : err })
  }
}

exports.userlist = (req, res) => {
  User.find(function(err, users) {
    if (err) return res.status(500).json({ error: 'database failure' })
    res.json(users);
  })
}

