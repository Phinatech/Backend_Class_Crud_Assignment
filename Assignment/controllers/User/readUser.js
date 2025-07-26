import User from '../../models/userSchema.js';



export const getUser = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(200).json({ message: 'No users found!' });
    }

    res.status(200).json({
      message: 'Users fetched successfully',
      data: users
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

// Function to get one user by ID
export const getOneUser = async (req, res) => {
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

//getByqueryParams

export const getByqueryParams = async (req, res) => {
  const { username, gmail, year } = req.query;

  const filter = {};
  if (username) filter.username = username;
  if (gmail) filter.gmail = gmail;
  if (year) filter['profile.Number'] = parseInt(year); // optional if you store age/year in profile

  try {
    const users = await User.find(filter);

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users matched your query' });
    }

    res.status(200).json({
      message: 'User(s) found',
      data: users
    });

  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};
