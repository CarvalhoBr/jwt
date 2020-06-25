const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const router = express.Router()

router.post('/register', async(req, res) => {
    
    const {email} = req.body
    
    try {
        if( await User.findOne({ email })){
            return res.status(400).send({error: 'User already exists'})
        }

        const user = await User.create(req.body)

        user.password = undefined

        return res.send(user)
    } catch (error) {
        res.status(400).send({error: error.stack})
    }
})

router.post('/authenticate', async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email}).select('+password')

    if(!user)
        return res.status(400).send({error: 'User not found'})

    if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).send({error: 'Invalid password'})
       
    res.send({user})
})

module.exports = app => app.use('/auth', router)