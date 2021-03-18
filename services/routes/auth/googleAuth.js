const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('731982883373-q7fc0kc44vipv516o72sqmc9v0pdih5l.apps.googleusercontent.com');
const User = require('../../models/userModel');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv/config');
router.use(bodyParser.json());
router.post('/googleAuth', async (req, res) => {

    try {
        const {token} = req.body;
        const {CompanyID} = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '731982883373-q7fc0kc44vipv516o72sqmc9v0pdih5l.apps.googleusercontent.com'
        });
        const payload = ticket.getPayload();
        const currUserid = await User.find({id: payload.sub});
        const jwtSecret = process.env.SECRET;
        const userToken = {token: jsonwebtoken.sign({user: payload.sub}, jwtSecret)};
        
        if(!payload.email_verified) {
            // Not verifiable return email
            res.status(200).json({
                status: 'error', 
                message: 'Unverified email'
            });
        } else if(!CompanyID && currUserid.length !== 0) {
            // Returning User
            res.status(200).json({
                auth: userToken, 
                user: currUserid[0], 
                picture: {
                    image: payload.picture
                }
            });
        } else if(!CompanyID) {
            // New User No Company ID do not save customer
            res.status(200).json({user: {
                id: payload.sub,
                Email: payload.email,
                Password: 'null',
                Google: true,
                CompanyID: undefined,
                Picture: payload.picture
            }, picture: {
                image: payload.picture
            }});
        } else if(currUserid.length === 0) {
            // New User w/ Company ID save customer
            const newUser = new User({
                id: payload.sub,
                Email: payload.email,
                Password: 'null',
                Google: true,
                CompanyID: CompanyID,
                Picture: payload.picture
            });
            const savedUser = await newUser.save();
            res.status(200).json({
                auth: userToken, 
                user: savedUser, 
                picture: {
                    image: payload.picture
                }
            });
        }
    } catch(err) {
        res.json({message: err});
    }
});

module.exports = router;