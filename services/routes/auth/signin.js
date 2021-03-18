const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv/config');

router.use(bodyParser.json());
const jwtSecret = process.env.SECRET;

router.post('/signIn', async (req, res) => {
    try {
        const currUser = await User.findOne({Email: req.body.email, Google: false});
        if(currUser) {
            const verifyPass = await bcrypt.compare(req.body.password, currUser.Password);
            if(verifyPass) {
                const userToken = {token: jsonwebtoken.sign({user: currUser.id}, jwtSecret)}
                return res.status(200).json({auth: userToken, user: currUser});
            } else {
                return res.status(200).json({
                    status: 'error',
                    message: 'Invalid Password'
                });
            }
        } else {
            return res.status(200).json({
                status: 'error',
                message: 'User Not Found'
            });
        }
    } catch(err) {
        return res.status(200).json(err);
    }
});

module.exports = router;