const express = require('express');
const  {register,login,profile,logout} = require("../controles/user.js");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile',profile);
router.post('/logout',logout);

module.exports =  router ;
