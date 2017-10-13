const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const express = require('express')
const apiRoutes = express.Router()
const models = require('../schemas')

// generating a hash
models.users.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}


// checking if password is valid
models.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.local.password)
}

// create the model for users and expose it to our app
module.exports = models.methods