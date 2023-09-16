const connection = require("../config/db.js");

class travelController {
  // 1.Crear Viaje y devuelve el contenido de la base de datos
  //localhost:4000/travels/createTravel/:user_id

  createTravel = (req, res) => {
    // const { city, country, description } = req.body;
    console.log("Este es el json parseado",JSON.parse(req.body.regTravel));
    console.log("este es el reqqqq.booooddddyyyy sin parsear",req.body);
    const user_id = req.params.user_id;
    const { city, country, description } = JSON.parse(req.body.regTravel);

    console.log("esto son las fotoooooossssss", req.files);

    let img = [""];

    if (req.files != undefined) {
      img = req.files;
      console.log("************************", img);
    }

    let sql = `INSERT INTO travel (city, country, description, user_id) VALUES ('${city}', '${country}', '${description}', ${user_id})`;
     let sqlTravel = `SELECT * FROM travel WHERE user_id = ${user_id} and is_deleted = 0`;

     connection.query(sql, (error, result) => {
       if (error) throw error;
       console.log(result);
       let travel_id = result.insertId;
       this.saveTravelImages(img, travel_id);

       connection.query(sqlTravel, (err, resultTravel) => {
         if (err) throw err;
         res.status(200).json(resultTravel);
       });
     });
  };



//--------------------------------------------------------
//Guardar imágenes de los viajes (no es una ruta, es funcion)
  saveTravelImages = (images, travel_id, next) => {
    let img = images;
    console.log("esta es la imaaaaageeeennnn", img, travel_id);
    img.forEach((img) => {
      let sql = `INSERT INTO photo (photo_name, travel_id) VALUES ('${img.filename}', ${travel_id}) `;
      connection.query(sql, (error, result) => {
        if (error) throw error;
        console.log(result);
      });
    });
  };


//--------------------------------------------------------
// 2.Borra de manera logica un viaje
//localhost:4000/travels/delTravel/:travel_id
  deleteTravel = (req, res) => {
    console.log("Estoy en el controladorrrrrr");
    const travel_id = req.params.travel_id;
    let sql = `UPDATE travel SET is_deleted = true WHERE travel_id = ${travel_id}`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };



//-------------------------------------------------------
//3.- Trae todas las fotos de un viaje
//localhost:4000/travels/getImgs/:travelid
  getPhotosTravel = (req, res) => {
    const travel_id = req.params.travel_id;
    let sql = `SELECT * FROM photo WHERE travel_id=${travel_id} AND is_deleted = 0`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };



  //------------------------------------------------------
  //4.- Borrado lógico de una imagen
  //localhost:4000/travels/delTravel/:photo_id
  delPhoto = (req, res) => {
    const photo_id = req.params.photo_id;
    let sql = `UPDATE photo SET is_deleted = true WHERE photo_id = ${photo_id}`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //-------------------------------------------------------
  //5. Modificación de los campos de un viaje
  //localhost:4000/travels/editTravel/:travel_id
  editTravel = (req, res) => {
    console.log("Edittttttttt", req.body);
    const { city, country, description } = req.body;
    const travel_id = req.params.travel_id;
    let sql = `UPDATE travel SET city='${city}', country='${country}', description = '${description}' WHERE travel_id = ${travel_id}`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //6. añade imágenes a un viaje concreto
  //localhost:4000/travels/addImgs/:travel_id
  addImgs = (req, res) => {
    // console.log(req);
    // console.log("*************",req.files);
    //  console.log("Esto es params",req.params);
    let travel_id = req.params.travel_id;
    let img = [""];

    if (req.files != undefined) {
      img = req.files;
      //  console.log('****************img********', img)
    }

    //    console.log("esta es la imaaaaageeeennnn", img, travel_id);
    img.forEach((img) => {
      let sql = `INSERT INTO photo (photo_name, travel_id) VALUES ('${img.filename}', ${travel_id}) `;
      connection.query(sql, (error, result) => {
        if (error) throw error;
        console.log(result);
      });
    });

    let sql2 = `SELECT * FROM photo WHERE travel_id=${travel_id} AND is_deleted = 0`;

    connection.query(sql2, (error, resultado2) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultado2);
    });
  };

  //7.-trae informacón de un viaje y todas sus fotos
//------------------------------------------------
getTravelPhotos = (req, res) => {
  const travel_id = req.params.travel_id;
  
 let sqltravel = `SELECT * FROM travel WHERE travel_id = ${travel_id} AND is_deleted = 0`;
 let sqlPhotos = `SELECT * FROM photo WHERE travel_id = ${travel_id} AND is_deleted = 0`;

 connection.query(sqltravel, (error, resultTravel)=>{
   if (error){
     res.status(400).json({ error });
   }
    connection.query(sqlPhotos, (error2, resultPhotos)=>{
     if(error2) {
        res.status(400).json({error2});
      }
     res.status(200).json({resultTravel, resultPhotos});
 });
 
});

}



}

module.exports = new travelController();
