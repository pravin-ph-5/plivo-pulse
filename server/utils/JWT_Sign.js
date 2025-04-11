// hah om sai ram om bhaskarayaa namaha om namaha sivayaa 

import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'changeme'

const jwtSign = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export default jwtSign
