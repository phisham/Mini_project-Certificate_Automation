const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('./Helpers/jwt');
const unless = require('express-unless')
const users = require('./Controllers/UserController');
const errors = require('./Helpers/ErrorHandler');
const cors = require('cors');
// middleware for authenticating token submitted with requests
auth.authenticateToken.unless = unless
// app.use(auth.authenticateToken.unless({
//     path: [
//         { url: '/users/login', methods: ['POST']},
//         { url: '/users/register', methods: ['POST']},
//         { url:'/users/upload-file',methods:['POST']},
//         { url:'/users/details',methods:['GET']}
//     ]
// }))
app.use(cors());

// app.use('./uploads', express.static('uploads'));
app.use(express.json()) // middleware for parsing application/json
app.use('/', users) 
app.use(errors.errorHandler);

mongoose.connect('mongodb+srv://test:test123@cluster0.y9j3h3i.mongodb.net/?retryWrites=true&w=majority')
.then(console.log("MongoDB connected...."));
 
// get reference to database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const port =process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log("Server started on port 3000");
})