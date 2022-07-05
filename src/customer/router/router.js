const express = require("express");
const { RouterApp } = require("express");
const router = express.Router();

const funtionsGetApp = require("../funtions/gets/gets");
const funtionsPostApp = require("../funtions/post/post");

const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/multer/archivosUser"),
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + path.extname(file.originalname));
  },
});

const uploadImagen = multer({
  storage,
  dest: path.join(__dirname, "../../public/multer/archivosUser"),
}).single("imagen");
//rutas get
router.get("/", funtionsGetApp.index);
router.get("/home", funtionsGetApp.home);
// ruta de registrar usuario gets
router.get("/register", funtionsGetApp.registerUsers);

router.get("/registerTable", funtionsGetApp.registerTable);
router.get("/registerUsersEdit/:id", funtionsGetApp.registerUEdit);
router.get("/registerUsersDelate/:id", funtionsGetApp.BlockUser);
router.get("/password/:id", funtionsGetApp.passwordNew);
// rutas get de login
router.get("/login", funtionsGetApp.login);

router.get("/loginAut", funtionsGetApp.logAut);
// rutas get de status
router.get("/statusTable", funtionsGetApp.statusTable);
router.get("/AgregarStatus", funtionsGetApp.addstatus);
router.get("/delateStatus/:id", funtionsGetApp.delateStatus);
// rutas get de mercancia
router.get("/AgregarMercancia", funtionsGetApp.addMercancia);
router.get("/mercanciaTable", funtionsGetApp.mercanciaTable);
router.get("/delateMercancia/:id", funtionsGetApp.delateMercancia);
// rutas get de actualizar estatus historial
router.get("/actualizarMercancia/:id", funtionsGetApp.mercanciaUpdateHistorial);
router.get("/actualizarMercanciaObjeto/:id", funtionsGetApp.mercanciaUpdateObjetos);
// ruta get de estatus de fotos de mercancia
router.get("/addFotosTable/:id", funtionsGetApp.fotosHistorial);
router.get("/addFoto/:id", funtionsGetApp.foto);
router.get("/delateFoto/:id", funtionsGetApp.delateImagenes);
// ruta get de la tabla de busqueda de historiales de un dato
router.get("/historiadata/:id", funtionsGetApp.dataHistorial);
// ruta get de bloquear usuario
router.get("/registerUsersDelate/:id", funtionsGetApp.BlockUser);
// ruta get restart password
router.get("/password/:id", funtionsGetApp.passwordNew);
router.get("/passwordClient/:id", funtionsGetApp.passwordNewClient);
// ruta get clientes

//ruta get login clientes
router.get("/loginClient", funtionsGetApp.loginClient);
// ruta get register
router.get("/registerTableClient", funtionsGetApp.registerTableClient);
router.get("/registerClient", funtionsGetApp.registerUsers);
router.get("/registerUsersDelateClient/:id", funtionsGetApp.BlockUserClient);

// ruta editar usuario interno
router.get("/registerUsersEdit/:id", funtionsGetApp.registerUEdit);
// rutda editar cliente interno
router.get("/registerUsersEditClient/:id", funtionsGetApp.registerUEditClient);
// ruta get de servicios del cliente

router.get("/tableService", funtionsGetApp.mercanciaService);

// ruta get de servicios consulta usuarios


// ruta get de servicios del cliente tabla 
router.get("/tableServiceClient/:client", funtionsGetApp.mercanciaServiceClient);
// rutas post
// ruta de registrar usuario post
router.post("/sendRegister", funtionsPostApp.sendRegister);

router.post("/sendUpdateUser", funtionsPostApp.sendUpdateUser);


router.post("/sendUpdateUserClient", funtionsPostApp.sendUpdateUserClient);

router.post("/sendPassword", funtionsPostApp.savePasssword);
router.post("/sendPasswordClient", funtionsPostApp.savePassswordCleint);
// rutas post de login
router.post("/loginAuth", funtionsPostApp.loginAuth);

// rutas post de status
router.post("/statusSend", funtionsPostApp.sendAddStatus);
//rutas post de mercancía
router.post("/sendMercancia", funtionsPostApp.sendAddMercancia);
router.post("/sendUpdateMercanciaObjetos", funtionsPostApp.sendUpdateMercanciaObjeto);
// rutas post de fotos
router.post("/fotosSend/:id", uploadImagen, funtionsPostApp.SubirNuevoArchivos);
// ruta pos actualizar estatus
router.post("/statusUpdate/:id", funtionsPostApp.estatusNuevoRegister);
// ruta post actualizar
router.post("/sendPassword", funtionsPostApp.savePasssword);
//rutas post de clientes

//ruta register clientes
router.post("/sendRegisterClients", funtionsPostApp.sendRegisterClients);
//ruta login clientes
router.post("/loginAuthclientes", funtionsPostApp.loginAuthClients);

//pruebas
router.post("/pruebas", funtionsPostApp.p)
// router.get('/p', funtionsGetApp.p)
module.exports = router;
