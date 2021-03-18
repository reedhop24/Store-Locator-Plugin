const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const Company = require('../../models/companyModel');
const { v4: uuidv4 } = require('uuid');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('731982883373-q7fc0kc44vipv516o72sqmc9v0pdih5l.apps.googleusercontent.com');
router.use(bodyParser.json());

router.post('/newCompany', async (req, res) => {
    try {
        const newCompany = new Company({
            id: uuidv4(),
            CompanyName: req.body.companyName,
            Locations: []
        });

        const saved = await newCompany.save();
        res.status(200).json(saved);
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;