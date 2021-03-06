const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

const User = require('../models/user')

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    } )
}

class AuthController{

    async create(req, res){

        const {email} = req.body
    
        try {
        
            if( await User.findOne({ email })){
                return res.status(400).send({error: 'User already exists'})
            }

            const user = await User.create(req.body)
            user.password = undefined

            const token = generateToken({id: user.id})

            return res.send({user, token})

        } catch (error) {
            return res.status(400).send({error: error.stack})
        }

    }

    async authenticate(req, res){
        const {email, password} = req.body

        const user = await User.findOne({email}).select('+password')

        if(!user)
            return res.status(400).send({error: 'User not found'})

        if (!(await bcrypt.compare(password, user.password)))
            return res.status(400).send({error: 'Invalid password'})

        user.password = undefined

        const token = generateToken({ id: user.id })
        
        res.send({user, token})
    }
}

module.exports = AuthController
