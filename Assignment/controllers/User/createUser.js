import User from '../../models/userSchema.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  const { username, gmail, password, profile } = req.body;

  if (!username || !gmail || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ gmail });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
  username,
  gmail: gmail.toLowerCase(),
  password: hashedPassword,
  profile: {
    country: profile?.country || '',
    Number: profile?.Number || 0,
    Street: profile?.Street || '',
    Bio: profile?.Bio || '',
  }
});


    await newUser.save();
    res.status(201).json({ message: 'User created successfully! Proceed to login.', user:newUser});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
