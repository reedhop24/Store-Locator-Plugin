const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv/config');

router.use(bodyParser.json());

router.post('/deleteUser', async (req, res) => {
    try {
        const token = req.headers.token;

        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if(err) {
                return res.status(200).json(err)
            }
            User.deleteOne({id: req.body.userID, Email: req.body.email}, (err, obj) => {
                if(err) {
                    res.status(200).json({
                        status: 'error',
                        message: 'Unable to delete user.',
                        email: req.body.email,
                        userID: req.body.userID
                    });
                } else {
                    if(obj.deletedCount === 0) {
                        res.status(200).json({
                            status: 'error',
                            message: `User ${req.body.email} not found`,
                        });
                    } else {
                        res.status(200).json({
                            status: 'success',
                            message: `Succesfully deleted ${req.body.email}`
                        });
                    }
                }
            });

        });
    } catch(err) {
        res.status(200).json(err);
    }
});

module.exports = router;