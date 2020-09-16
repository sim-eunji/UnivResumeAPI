const User = require('../../../models/user')
const jwt = require('jsonwebtoken')

/**
 * POST /api/auth/register
 * {
 *  name, email, password
 * }
 */
exports.register = async (req, res) => {

  const { email, name, password } = req.body

  if(!email || !password || !name) {
    res.status(500).json({
      error: 'Insufficient parameters'
    })
    return
  }

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

/**
 * POST /api/auth/login
 * {
 *  email, password
 * }
 */
exports.login = async (req, res) => {

  const { email, password } = req.body
  const secret = req.app.get('jwt-secret')

  if(!email || !password) {
    res.status(500).json({
      error: 'Insufficient parameters'
    })
    return
  }

  try {
    const user = await User.findOne({email}).exec()
    
    if(!user) {
      res.status(404).json({
        error: 'Not Found Email'
      })
      return
    } else {
      if(user.password == password) {
        // 로그인 성공
        const token = jwt.sign(
          {
            _id: user._id,
            name: user.name
          },
          secret,
          {
            expiresIn: '7d',
            issuer: 'kingeunji',
            subject: 'userInfo'
          }
        )

        res.status(200).json({
          user,
          token
        })

      } else {
        res.status(400).json({
          error: 'Password do not match'
        })
        return 
      }
    }

  } catch(err) {
    res.status(400).json({
      error: err
    })
  }

}