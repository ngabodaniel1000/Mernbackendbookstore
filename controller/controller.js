const User = require("../model/model");
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input data
    if (!username || !email || !password) {
      return res.status(400).send({ message: 'All fields are required' }); // Error message for missing fields
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' }); // Error message for existing user
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = new User({ username, email, password: hashedPassword }); // Use hashed password
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error registering user', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
      
    if (!username || !password) {
      return res.status(400).send({ message: 'All fields are required' }); // Error message for missing fields
    }

    // Check if the user exists
    if (!user) {
      return res.status(400).send({ message: 'Invalid username' });
    }

    // Check if the provided password matches the hashed password
    const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
    if (!isMatch) {
      return res.status(400).send({ message: 'Password incorrect' }); // Error message for invalid credentials
    }

    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.email = user.email;
    res.status(200).send({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error });
  }
};
exports.dashboard = async (req, res) => {
  try {
    if (req.session.userId) {
      res.json({ loggedIn: true,user:req.session.username,email:req.session.email});
    } else {
      res.json({ loggedIn: false });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error accessing dashboard', error });
  }
}
exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.send("Logged out successfully");
  } catch (error) {
    res.status(500).send({ message: 'Error logging out', error });
  }
}
