const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const Company = require('../../models/companyModel');
const jwt = require('jsonwebtoken');
require('dotenv/config');

router.use(bodyParser.json());

router.post('/addStore', async (req, res) => {
    try {
        const token = req.headers.token;
    
        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if(err) {
                return res.status(200).json(err);
            } 

            Company.updateOne({id: req.query.companyID}, 
                {$set:
                    {
                        Locations: req.body.newLocations
                    }
                }, (err, updated) => {
                    if(err) {
                        res.status(200).json(err)
                    } else {
                        res.status(200).json({
                            updatedLocations: req.body.newLocations
                        });
                    }
                });
        });
    } catch(err) {
        res.status(200).json({error: err});
    }
});

module.exports = router;