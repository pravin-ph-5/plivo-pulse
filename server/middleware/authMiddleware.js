// hah om sai ram om bhaskaraya namaha om namaha sivayaa

// hah om sai ram om bhaskaraya namaha om namaha sivayaa

import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'changeme'

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded.id
    next()
  } catch (error) {
    console.error('JWT Verification failed:', error)
    res.status(401).json({ message: 'Unauthorized: Invalid token' })
  }
}

export default authMiddleware
