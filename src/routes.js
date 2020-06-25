const express = require('express')
const routes = express.Router()
const authMiddleware = require('./middlewares/auth')

const AuthController = require('./controllers/authController')
const authController = new AuthController

const ProjectController = require('./controllers/projectController')
const projectController = new ProjectController

routes.use('/projects', authMiddleware)

routes.post('/auth/register', authController.create)
routes.post('/auth/authenticate', authController.authenticate)

routes.get('/projects/', projectController.verify)

module.exports = routes
