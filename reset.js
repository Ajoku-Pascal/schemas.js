const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Inside login route, after user.lastLogin and save()
const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
res.status(200).json({ message: 'Login successful', token });
