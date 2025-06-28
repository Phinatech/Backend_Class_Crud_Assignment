import User from '../../models/userSchema.js';

export const getUser = async (req, res) => {
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
    const { name, price, year } = req.query
    const filter = {}

    if (username) filter.filterusername = name
    if (gmail) filter.gmail = price
    if (gmail) filter.year = year

    try {
        const user = await User.find(filter)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}