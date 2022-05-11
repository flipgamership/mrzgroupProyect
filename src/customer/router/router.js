const express = require('express');
const { RouterApp } = require('express');
const router = express.Router();

const funtionsGetApp = require('../funtions/gets/gets')
const funtionsPostApp = require('../funtions/post/post')



    //rutas get
    // ruta de registrar usuario gets
router.get('/register', funtionsGetApp.registerUsers)



// rutas post
// ruta de registrar usuario post
router.post('/sendRegister', funtionsPostApp.sendRegister)
module.exports = router;