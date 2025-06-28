import User from '../../models/userSchema.js';
 export const deleteUser = async (req, res) => {
    const { id } = req.params
    const {_id, admin} = req.user
    if (id === _id || admin === true) {
        try {
            await User.findByIdAndDelete(id)
           
           res.status(200).json({mess: 'User deleted successfully'})
       } catch (error) {
           res.status(500).json(error)
       }
    } else {
      return res.status(401).json({ message: "You are not authorized to delete this user" })
    }
   
}