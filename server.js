const cors = require('cors')
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoute = require('./routes/user')


//express app
const app = express()
app.use(cors({origin: "http://localhost:3000", credentials: false}));

//Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoute)

//CONNECT TO DB
mongoose.connect(process.env.MONG_URI)
.then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
    console.log('connected to db Atlas & listining on port', process.env.PORT)
})
})
.catch((error) => {
    console.log(error)
})



