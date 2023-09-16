var express = require("express");
const multer = require("../middleware/multer");
const travelControllers = require("../controllers/travelControllers");
var router = express.Router();

//1.- createTravel
//localhost:4000/travels/createTravel/:user_id
router.post("/createTravel/:user_id", multer("travel"), travelControllers.createTravel);


//--------------------------------------------------
//2.- borrado lógico de un travel
//localhost:4000/travels/delTravel/:travel_id
router.put("/delTravel/:travel_id", travelControllers.deleteTravel);


//------------------------------------------------------------------
//3.trae las fotos de un viaje
//localhost:400/travels/getImgs/:travelid
router.get("/getImgs/:travel_id", travelControllers.getPhotosTravel);


//----------------------------------------------------
//4.- borrado lógico de una imagen
//localhost:4000/travels/delPhoto/:photo_id
router.put("/delPhoto/:photo_id", travelControllers.delPhoto);

//----------------------------------------------------
//5- Edit Travel
//localhost:4000/travels/editTravel/:travel_id
router.put("/editTravel/:travel_id", travelControllers.editTravel);

//----------------------------------------
//6- Añade imágenes a un viaje en concreto
//localhost:4000/travels/addImgs/:travel_id
router.put("/addImgs/:travel_id", multer("travel") , travelControllers.addImgs);

//7- trae información de un viaje y todas sus fotos
//localhost:4000/travels/getTravelPhotos/:travel_id
router.get("/getTravelPhotos/:travel_id", travelControllers.getTravelPhotos);
module.exports = router;

module.exports = router;