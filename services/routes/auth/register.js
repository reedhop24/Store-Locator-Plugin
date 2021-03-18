const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const User = require('../../models/userModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv/config');
router.use(bodyParser.json());

router.post('/register', async (req, res) => {
    try {
        const currUser = await User.find({Email: req.body.email, Google: false});
        const hashPassword = async (password) => {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)
            return hash
        }
        const hashedPassword = await hashPassword(req.body.password);
        const jwtSecret = process.env.SECRET;

        if(currUser.length !== 0) {
            // Email already registered return error
            res.status(200).json({
                status: 'error',
                message: 'Email Already Registered'
            })
        } else {
            if(!req.body.CompanyID) {
                // No CompanyID 
                res.status(200).json({user:{
                    Email: req.body.email,
                    Password: hashedPassword,
                    Google: false,
                    CompanyID: undefined
                }})
            } else {
                // User w/ CompanyID
                const newUser = new User({
                    id: uuidv4(),
                    Email: req.body.email,
                    Password: hashedPassword,
                    Google: false,
                    CompanyID: req.body.CompanyID
                });
                const savedUser = await newUser.save();
                const userToken = {token: jsonwebtoken.sign({user: savedUser.id}, jwtSecret)}
                res.status(200).json({auth: userToken, user: savedUser});
            }
        }
    } catch(err) {
        res.status(200).json(err);
    } 
});

module.exports = router;