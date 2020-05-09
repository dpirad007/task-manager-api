//basic server startup structure
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')//using it from user file
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT 

// //multer
// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000 //(1mb)
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('please upload a word doc'))
//         }

//         cb(undefined, true)

//         // cb(new Error('file must be a PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })


// app.post('/upload',upload.single('upload'), (req,res) => { //upload.single()->middle ware
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })




//middleware function
//next()//so that express knows were done with the middleware function and more on
// app.use((req, res, next) => {
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled')
//     }else{
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. check back soon')
// })



app.use(express.json())//to get the json data from "postman"

//router example
// const router = new express.Router()
// router.get('/test',(req,res) => {
//     res.send('this is my other router')
// })
// app.use(router)

app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
    console.log('Server is running on port '+port)
})

//bcrypt

// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'asdbg123'
//     const hashedPassword = await bcrypt.hash(password, 8)//no of rounds =8(recommended)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('asdbg123', hashedPassword)
//     console.log(isMatch)
// }

// myFunction()

//jsonwebtokens

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({_id: 'abc123'},'thisismynewcourse', {expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }
//myFunction()

// const pet = {
//     name: 'hal'
// }

// pet.toJSON = function() {
    
//     return {}
// }

// console.log(JSON.stringify(pet))

//lec 114 if you have doubt below
// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5eb50751c3f768aa48d94854')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5eb506512da37fa564f81753')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)


// }

// main()