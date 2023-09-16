const connection = require("../config/db");

class adminController {

//1.- Trae todos los datos de todos los usuarios
//localhost:4000/admin/getAllUsers

getAllUsers = (req, res) =>{
    let sql ="SELECT * FROM user "
    connection.query(sql, (error, result)=>{
        if (error){
            res.status(400).json({error});
        }
        res.status(200).json(result);
    });
};

//-------------------------------------------------
// 2.- desahibilita un usuario de manera lógica
  //localhost:4000/admin/desableUser/:userId

  desableUser = (req, res) => {

    
    console.log(req.params);

    let {id} = req.params;
    console.log(id)
     let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = "${id}"`;
     let sql2 = 'SELECT * from user'

     connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
     connection.query(sql2, (error, resultUsers) => {
       error ? res.status(400).json({ error }) : res.status(200).json(resultUsers);
    });
  };
//-------------------------------------------------
// 3.- habilita un usuario de manera lógica
  //localhost:4000/admin/enableUser/:userId

  enableUser = (req, res) => {
    console.log("********************ESTOY EN EL CONTROLER DESABLE**********");
    console.log(req.params);

    let {id} = req.params;
    console.log(id)
     let sql = `UPDATE user SET is_deleted = 0 WHERE user_id = "${id}"`;
     let sql2 = 'SELECT * from user'

     connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
     connection.query(sql2, (error, resultUsers) => {
       error ? res.status(400).json({ error }) : res.status(200).json(resultUsers);
    });
  };

// 4.- Trae todas las fotos de un usuario
//localhost:4000/admin/getAllPics
getAllPics = (req, res) => {
  
  let sql ="SELECT * FROM photo";
  connection.query(sql, (error, result) => {
    error ? res.status(400).json({error}) : res.status(200).json(result);
  })
}


//------------------------------------------------------------
//-------------------------------------------------
// 5.- desahibilita una foto de manera lógica
  //localhost:4000/admin/desablePic/:userId

  desablePic = (req, res) => {

    
    console.log(req.params);

    let {id} = req.params;
    console.log(id)
     let sql = `UPDATE photo SET is_deleted = 1 WHERE photo_id = "${id}"`;
     let sql2 = 'SELECT * from photo'

     connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
     connection.query(sql2, (error, resultUsers) => {
       error ? res.status(400).json({ error }) : res.status(200).json(resultUsers);
    });
  };
//-------------------------------------------------
// 6.- habilita una foto de manera lógica
  //localhost:4000/admin/enableUser/:userId

  enablePic = (req, res) => {
    console.log("********************ESTOY EN EL CONTROLER DESABLE**********");
    console.log(req.params);

    let {id} = req.params;
    console.log(id)
     let sql = `UPDATE photo SET is_deleted = 0 WHERE photo_id = "${id}"`;
     let sql2 = 'SELECT * from photo'

     connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
     connection.query(sql2, (error, resultUsers) => {
       error ? res.status(400).json({ error }) : res.status(200).json(resultUsers);
    });
  };




}
module.exports = new adminController();
