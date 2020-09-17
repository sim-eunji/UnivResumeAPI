const University = require('../../../models/university')

exports.list = (req, res) => {
  University.find(function(err, univ) {
    if (err) return res.status(500).json({ error: 'database failure' })
    res.json(univ)
  })
}

exports.register = (req, res) => {
  const { name, startDate, endDate } = req.body

  if(!name || !startDate || !endDate) {
    res.status(500).json({
      error: 'Insufficient parameters'
    })
    return
  }

  try {
    const univ = new University()
    univ.university_name = name
    univ.start_date = startDate
    univ.end_date = endDate

    univ.save(function(err) {
      if (err) {
        res.status(500).json({ error : err })
        return
      } 
      res.status(200).json(univ)
    })

  } catch(err) {
    res.status(500).json({
      error: 'Exception'
    })
    return
  }

}

