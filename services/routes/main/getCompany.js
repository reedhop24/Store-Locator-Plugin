const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const Company = require('../../models/companyModel');
const User = require('../../models/userModel');
const { v4: uuidv4 } = require('uuid');
const { request } = require('../auth/signin');
const jwt = require('jsonwebtoken');
require('dotenv/config');
router.use(bodyParser.json());

router.get('/getCompany', async (req, res) => {
    try {
        const token = req.headers.token;
        const email = req.query.email

        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if(err) {
                return res.status(200).json(err)
            } 

            const currUser = await User.findOne({id: decoded.user, Email: email});
            if(!currUser) {
                return res.status(200).json({
                    status: 'error',
                    message: 'Invalid Email'
                })
            }

            const currCompany = await Company.findOne({id: req.query.companyID});
            if(!currCompany) {
                return res.status(200).json({
                    status: 'error', 
                    message: 'Invalid CompanyID'
                })
            }
            return res.status(200).json({user: currUser, currCompany})
        });
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;