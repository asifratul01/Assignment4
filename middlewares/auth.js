const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, 'jwtSecretKey');
    req.studentId = verified.id;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = auth;
