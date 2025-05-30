const User = require('../models/userSchema');
const bcrypt = require('bcrypt');


// Function to create a new user
// This function handles user registration by checking for existing users, hashing the password, and saving the new user to the database.
const createUser = async (req, res) => {
  const { username, gmail, password } = req.body;

  if (!username || !gmail || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ gmail });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, gmail, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully! Proceed to login' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', errmessage: err.message });
  }
};


//Login a User
const loginUser = async (req, res) => {
  const { gmail, password } = req.body;

  if (!gmail || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ gmail });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', errmessage: err.message });
  }
};

// Function to read all users
const readUser = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(200).json({ message: 'No user found!' });
        }
        res.json(user);
    } catch (err) {
        console.log(err.message);
    }
}
// Function to get one user by ID
const getOneUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(200).json({ message: 'No user found!' });
        }
        res.json(user);
    } catch (err) {
        console.log(err.message);
    }
}

// Function to update a user
const updateUser = async (req, res) => {
    const { id } = req.params;

    const { username, gmail,} = req.body;
    
    try {
        const user = await User.findByIdAndUpdate(id, { username, gmail});
        if (!user) {
            return res.status(404).json({ message: `No user with the id ${id}` });
        }
        res.json({ message: 'User updated successfully!' });
    } catch (err) {
        console.log(err.message);
    }
}


//// Function to delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: `No user with the id ${id}` });
        }
        res.json({ message: 'User deleted successfully!' });
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    createUser,
    loginUser,
    readUser,
    updateUser,
    deleteUser,
    getOneUser
};