const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please provide name'],
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required:[true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'
        ],
        unique: true
    },
    password:{
        type: String,
        required:[true, 'Please provide password'],
        minlength: 6,
    },

})
// Using the pre hook => checkout the documentation of mongoose
// Before generating UserSchema, it will execute the code below and will continue with the implemented logic in the controller (controllers/auth.js)
// We do that in order to simplify the controller's logic and render it easier to read
// We do not use an arrow function ( ()=> {} ), but the classic function ( async function ) in order to have access to "this" keyword 
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model('User',UserSchema)