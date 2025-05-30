const router = require('express')
const {createUser,readUser,updateUser,deleteUser,getOneUser, loginUser} = require('../controllers/userController');

const Router = router()

    //Create a new User 
    Router.post('/users/register', createUser)
    //Login a user
    Router.post('/users/login', loginUser)

    //Get all users
    Router.get('/users', readUser)
    //Get one user by ID
    Router.get('/users/:id/', getOneUser)

    //update a user
    Router.patch('/users/update/:id', updateUser)
    
    //delete a user
    Router.delete('/user/:id', deleteUser)





module.exports = Router;

