
const userController = require('../controllers/user.controllers')

module.exports = app=>{
    app.post('/api/users/register', userController.registerUser)
    app.post('/api/users/login', userController.loginUser)
    app.get('/api/users/logout', userController.logout)
    app.get('/api/users/getLoggedIn', userController.getLoggedUser)
}