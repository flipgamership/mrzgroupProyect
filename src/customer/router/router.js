const express = require('express');
const { RouterApp } = require('express');
const router = express.Router();

const funtionsGetApp = require('../funtions/gets/gets')
const funtionsPostApp = require('../funtions/post/post')



    //rutas get
router.get('/', funtionsGetApp.index)
router.get('/home', funtionsGetApp.home)
    // ruta de registrar usuario gets
router.get('/register', funtionsGetApp.registerUsers)
router.get('/registerTable', funtionsGetApp.registerTable)
router.get('/registerUsersEdit/:id', funtionsGetApp.registerUEdit)
router.get('/registerUsersDelate/:id', funtionsGetApp.BlockUser)
router.get('/password/:id', funtionsGetApp.passwordNew)
// rutas get de login
router.get('/login', funtionsGetApp.login);
router.get('/loginAut', funtionsGetApp.logAut)
// rutas get de status
router.get('/statusTable', funtionsGetApp.statusTable)
router.get('/AgregarStatus', funtionsGetApp.addstatus)
router.get('/delateStatus/:id', funtionsGetApp.delateStatus)
// rutas get de mercancia
router.get('/AgregarMercancia', funtionsGetApp.addMercancia)
router.get('/mercanciaTable', funtionsGetApp.mercanciaTable)
// rutas get de actualizar estatus historial
router.get('/actualizarMercancia/:id', funtionsGetApp.mercanciaUpdateHistorial)

// rutas post
// ruta de registrar usuario post
router.post('/sendRegister', funtionsPostApp.sendRegister)
router.post('/sendUpdateUser', funtionsPostApp.sendUpdateUser)

router.post('/sendPassword', funtionsPostApp.savePasssword)

// rutas post de login
router.post('/loginAuth', funtionsPostApp.loginAuth);
// rutas post de status
router.post('/statusSend', funtionsPostApp.sendAddStatus)
//rutas post de mercancía
router.post('/sendMercancia', funtionsPostApp.sendAddMercancia )
//pruebas
// router.get('/p', funtionsGetApp.p)
module.exports = router;