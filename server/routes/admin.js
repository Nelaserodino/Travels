var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminControllers");

//1.- trae los datos de todos los usuarios
//------------------------------------------
router.get("/getAllUsers", adminController.getAllUsers);

//2.- deshabilita un usuario
//--------------------------------------------
router.put("/desableUser/:id", adminController.desableUser);

//3.- habilita un usuario
//--------------------------------------------
router.put("/enableUser/:id", adminController.enableUser);

//4.- trae todas las fotos
//---------------------------
router.get("/getAllPics", adminController.getAllPics);


//5.- deshabilita un usuario
//--------------------------------------------
router.put("/desablePic/:id", adminController.desablePic);


//6.- habilita un usuario
//--------------------------------------------
router.put("/enablePic/:id", adminController.enablePic);



module.exports = router;
