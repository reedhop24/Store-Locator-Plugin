const express = require('express')
const app = express();
const googleLogin = require('./routes/auth/googleAuth');
const register = require('./routes/auth/register');
const mongoose = require('mongoose');
const signIn = require('./routes/auth/signin');
const newCompany = require('./routes/main/newCompany');
const getCompany = require('./routes/main/getCompany');
const getUsers = require('./routes/main/getUsers');
const deleteUser = require('./routes/main/deleteUser');
const addStore = require('./routes/main/addStore');
const cors = require('cors');

app.use(cors());
require('dotenv/config');

app.use('/', googleLogin);
app.use('/', register);
app.use('/', signIn);
app.use('/', newCompany);
app.use('/', getCompany);
app.use('/', getUsers);
app.use('/', deleteUser);
app.use('/', addStore);

mongoose.connect(process.env.DB_CONNECTION, 
    {useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Connected to db'));

module.exports = app.listen('4000', () => {
    console.log('server running on 3000')
});