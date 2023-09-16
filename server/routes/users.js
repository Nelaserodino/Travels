var express = require("express");
const userControllers = require("../controllers/userControllers");
var router = express.Router();
const multer = require("../middleware/multer");
const multerSingle = require("../middleware/multerSingle");
const verify = require("../middleware/verify");


//-----------------------------------------------------
//1.- createUser
//localhost:4000/users/createUser
router.post("/createUser", multer("user"), userControllers.createUser);


//-------------------------------------------------------
//2.-login
//localhost:4000/users/login
router.post("/login", userControllers.login);


//------------------------------------------------------
//3.-Trae la información de un usuario
//localhost:4000/users/oneUser/:user_id  
router.get("/oneUser/:user_id", userControllers.selectOneUser);


//------------------------------------------------------
//4.-Traer todos los usuarios
//localhost:4000/users/allUser        
router.get("/allUser", userControllers.selectAllUsers);


//-----------------------------------------------------
//5.-Editar un usuario 
//localhost:4000/users/editUser/:userId       
router.put("/editUser/:user_id", multerSingle("user"), userControllers.editUser);


//-----------------------------------------------------
//6.-Borrado lógico de un usuario
//localhost:4000/users/deleteUser/:userId       
router.delete("/deleteUser/:user_id", userControllers.deleteUser);


//----------------------------------------------------------------
//7.-Trae la información de un usuario para modificarla
//localhost:4000/users/editUser/:user_id  
router.get("/getEditUser/:user_id", userControllers.getEditOneUser);


//------------------------------------------------------
//8.- Trae todas las fotos y todos los viajes de un usuario
//localhost:4000/users/getAllPhotos/:user_id 
router.get("/getAllPhotos/:user_id", userControllers.getAllPhotos);


module.exports = router;
