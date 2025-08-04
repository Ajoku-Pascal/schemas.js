// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = { id: user._id }; // You can include more info if needed
  const secret = process.env.JWT_SECRET || 'default_secret'; // Use env variable in production
  const options = { expiresIn: '7d' }; // Valid for 7 days

  return jwt.sign(payload, secret, options);
};

module.exports = generateToken;
