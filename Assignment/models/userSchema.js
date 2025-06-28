import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    gmail: {
        type: String,
        required: true,
        unique: true,
        toLowerCase: true,
      
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    AltimatAdmin: {
        type: Boolean,
        default: false
    },
    profile: {
        country: {
            type: String,
            required: true,
        },
        Number: {
            type: Number,
            required: true
        },
        Street: {
            type: String,
            required: true
        },
        Bio: {
            type: String,
            required: true
        } 
}}, 
{ timestamps: true });

const User = mongoose.model('User', userSchema);
export default User; // Exporting the User model for use in other parts of the application


