const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv/config');
router.use(bodyParser.json());

router.get('/getUsers', async (req, res) => {
    try {
        const token = req.headers.token;
        const companyID = req.query.companyID;

        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if(err) {
                return res.status(200).json(err)
            } 

            const allUsers = await User.find({CompanyID: companyID});

            if(allUsers.length === 0) {
                return res.status(200).json({
                    status: 'error', 
                    message: 'Invalid CompanyID'
                });
            } else {
                res.status(200).json(allUsers);
            }
        });
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;