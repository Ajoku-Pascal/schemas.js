const User = require('./models/User');

app.post('/create-user', async (req, res) => {
  try {
    const newUser = await User.create({ username: 'Ajoku', email: 'ajokupascal@gmail.com' });
    res.send(newUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
  
});
