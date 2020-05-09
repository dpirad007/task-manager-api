const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength:7,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain "password"')
            }
        }
    },
    email:{
        type:String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value<0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
},{
    timestamps: true
})

//if you have doubt below block see lec 114
userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})

//lec sec12 lec 11
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to log in')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to log in')
    }

    return user
}

userSchema.methods.generateAuthToken = async function() {   //normal function since we ahve to use this
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})//{token:token}->use short hand
    await user.save()
    return token
}


//hash the plain text password before saving
userSchema.pre('save',async function(next) {
        const user = this//to access each user
    
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password,8)
        }
    
        next()//necesaary to end the function
    })

//delete user task when user is removed
userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({owner: user.id})
    next()
})

const User = mongoose.model('User', userSchema)
    

module.exports = User