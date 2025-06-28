import User from '../../models/userSchema.js';

// Function to update a user
 export const updateUser = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id

    const { username, gmail, password } = req.body;

    if (id === userId) {
        try {
            const updatedUser = await User.findByIdAndUpdate(id, { username, gmail, password }, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: `No user with the id ${id}` });
            }
            res.json(updatedUser);
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: 'Error updating user' });
        }
        
    } else {
        return res.status(401).json({ message: "You are not authorized to edit this user" })
    }
}

export const editProfile = async (req, res) => {
    const { id } = req.params
    const reqId = req.user._id
    const { country, Number, Street, Bio } = req.body
    if (id === reqId) {
        try {
            await User.findByIdAndUpdate(id, {
                $set: {
                    'profile.country': country,
                    'profile.Number': Number,
                    'profile.Street': Street,
                    'profile.Bio': Bio
                }
            }, { new: true })
            res.status(200).json({mess: 'User updated successfully'})
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
      return res.status(401).json({ message: "You are not authorized to edit this user" })
    }
   
}