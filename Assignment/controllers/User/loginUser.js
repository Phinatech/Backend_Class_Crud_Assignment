import  User from "../../models/userSchema.js"
import  bcrypt  from "bcrypt"
import jwt from "jsonwebtoken"


export const loginUser = async (req, res) => {
    const {gmail, password} = req.body
   if (!gmail || !password) {
        res.status(400).json({ message: "Please provide all fields" })
        return
    } else {
    try {
        const user = await User.findOne({ gmail })
        if (!user) {
            res.status(400).json({ message: "User not found please register first to continue" })
            return
        }

        const compared = await bcrypt.compare(password, user.password)
        if (!compared) {
            res.status(401).json({ message: "gmail or password is incorrect" })
            return
        }
         
        
        const getToken = (id) => { 
            return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "5m"})
        }
        

        const token = getToken(user._id)
        return res 
            .cookie('token', token, { httpOnly: true, sameSite: 'strict' })
            .status(200)
            .json({ message: "Login Successful proceed to make a post"})
        
    } catch (error) {
        res.status(500).json(error)
       }
    }
}